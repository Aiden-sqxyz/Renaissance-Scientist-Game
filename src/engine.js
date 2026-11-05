// Pure, dependency-free game rules. History and presentation live separately.
export const KEYS = ['money', 'research', 'reputation', 'safety'];
export const INITIAL = Object.freeze({ money: 3, research: 0, reputation: 1, safety: 3 });
export const RULES = [
  [{ money: 2 }, { money: 1, research: 1 }, { money: -1, research: 2 }],
  [{ chance: .6, success: { money: 2, reputation: 1 }, failure: { money: -1 } }, { money: 1, research: 1 }, { money: -1, research: 2 }],
  [{ money: -2, research: 2 }, { chance: .5, success: { money: -1, research: 2 }, failure: { money: -1, research: 1 } }, { research: 1 }],
  [{ chance: .65, success: { money: 2, reputation: 2 }, failure: { reputation: -1 } }, { money: 1, reputation: 1 }, { money: -1, research: 2 }],
  [{ reputation: 2, safety: -2 }, { research: 1, reputation: 1 }, { research: 2 }],
  [{ reputation: 2, safety: -2 }, { reputation: 1, safety: 1 }, { money: -1, research: 1, reputation: 1 }]
];
export const clamp = n => Math.max(0, Math.min(5, n));
export const apply = (stats, effects) => Object.fromEntries(KEYS.map(k => [k, clamp(stats[k] + (effects[k] || 0))]));
export const ruined = stats => stats.money === 0 || stats.safety === 0;
export const eligible = s => !ruined(s) && s.research >= 4 && s.reputation >= 4;
export const recognitionChance = s => eligible(s) ? (s.reputation === 5 ? .25 : .15) : 0;
export function classify(s, recognized = false) {
  if (ruined(s)) return 'ruin';
  if (eligible(s) && recognized) return 'success';
  if (s.research >= 4) return 'unrecognized';
  if (s.money >= 3 && s.reputation >= 2) return 'stable';
  return 'unfinished';
}
export function newGame() { return { version: 1, screen: 'decision', turn: 0, stats: { ...INITIAL }, history: [], ending: null }; }
export function resolveTurn(stats, turn, choice, rng = Math.random) {
  if (ruined(stats)) throw new Error('A ruined career cannot continue.');
  const rule = RULES[turn]?.[choice];
  if (!rule) throw new Error('Invalid decision or choice.');
  const success = rule.chance == null ? null : rng() < rule.chance;
  const effects = rule.chance == null ? rule : rule[success ? 'success' : 'failure'];
  const afterChoice = apply(stats, effects);
  // Zero is terminal immediately. An opportunity cannot resurrect a ruined career.
  let event = { kind: 'skipped', stat: null, amount: 0 };
  let after = afterChoice;
  if (!ruined(afterChoice)) {
    const roll = rng();
    const kind = roll < .6 ? 'none' : roll < .85 ? 'setback' : 'opportunity';
    const stat = kind === 'none' ? null : KEYS[Math.floor(rng() * 4)];
    const amount = kind === 'setback' ? -1 : kind === 'opportunity' ? 1 : 0;
    event = { kind, stat, amount };
    if (stat) after = apply(afterChoice, { [stat]: amount });
  }
  let recognition = null;
  let ending = null;
  if (ruined(after)) ending = classify(after);
  else if (turn === 5) {
    const chance = recognitionChance(after);
    recognition = { chance, passed: chance > 0 ? rng() < chance : false };
    ending = classify(after, recognition.passed);
  }
  return { turn, choice, before: { ...stats }, effects, success, afterChoice, event, after, recognition, ending };
}
export function choose(game, choice, rng = Math.random) {
  if (game.screen !== 'decision' || game.ending) return game;
  const entry = resolveTurn(game.stats, game.turn, choice, rng);
  return { ...game, screen: 'outcome', stats: entry.after, history: [...game.history, entry], ending: entry.ending };
}
export function advance(game) {
  if (game.screen !== 'outcome') return game;
  if (game.ending) return { ...game, screen: 'ending' };
  return { ...game, screen: 'decision', turn: game.turn + 1 };
}
export function validSave(game) {
  const statsOK = s => s && KEYS.every(k => Number.isInteger(s[k]) && s[k] >= 0 && s[k] <= 5);
  if (!game || game.version !== 1 || !['decision', 'outcome', 'ending'].includes(game.screen) || !Number.isInteger(game.turn) || game.turn < 0 || game.turn > 5 || !statsOK(game.stats) || !Array.isArray(game.history)) return false;
  if (game.history.length !== game.turn + (game.screen === 'decision' ? 0 : 1)) return false;
  if (!game.history.every((h,i) => h.turn === i && Number.isInteger(h.choice) && h.choice >= 0 && h.choice < 3 && statsOK(h.before) && statsOK(h.afterChoice) && statsOK(h.after) && h.effects && h.event && ['none','setback','opportunity','skipped'].includes(h.event.kind) && (h.event.stat === null || KEYS.includes(h.event.stat)))) return false;
  if (game.ending != null && !['success','unrecognized','stable','unfinished','ruin'].includes(game.ending)) return false;
  if (game.screen === 'ending' && !game.ending) return false;
  if (game.screen === 'decision' && (game.ending || ruined(game.stats))) return false;
  return true;
}
// Enumerate every probabilistic transition (no recognition draw) for exact modeling.
export function transitions(stats, turn, choice) {
  const rule = RULES[turn][choice];
  const choices = rule.chance == null ? [{ p: 1, effect: rule }] : [{ p: rule.chance, effect: rule.success }, { p: 1-rule.chance, effect: rule.failure }];
  return choices.flatMap(c => {
    const s = apply(stats, c.effect);
    if (ruined(s)) return [{ p: c.p, stats: s }];
    return [{ p: c.p*.6, stats:s }, ...KEYS.flatMap(k => [
      { p:c.p*.25/4, stats:apply(s,{[k]:-1}) },
      { p:c.p*.15/4, stats:apply(s,{[k]:1}) }
    ])];
  });
}
