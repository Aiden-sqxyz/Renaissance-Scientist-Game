import { KEYS, INITIAL, RULES, apply, ruined, recognitionChance, newGame, choose, advance, validSave } from './engine.js';
import { LABELS, DESCRIPTIONS, INTRO, CHAPTERS, responsiveLine, eventText, outcomeText, ENDINGS, reflection } from './content.js';
import { SOURCES } from './history.js';
import { mark, icon, heavens } from './art.js';
import { MODEL } from './model-results.js';
import { authorsGuide } from './guide.js';

const root = document.getElementById('renaissance-app');
const STORAGE = 'renaissance-scientist-v1';
let game = null;
let page = 'intro';
let storageWorks = true;
let dialogFocus = null;
try { const saved = JSON.parse(localStorage.getItem(STORAGE)); if (validSave(saved)) game = saved; } catch { storageWorks = false; }
const percent = n => `${(n*100).toFixed(2)}%`;
const delta = n => n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : '0';
const button = (action,label,extra='') => `<button type="button" class="rs-primary" data-action="${action}" ${extra}>${label}<span class="arrow" aria-hidden="true">→</span></button>`;
const linkButton = (action,label) => `<button type="button" class="rs-text-button" data-action="${action}">${label}</button>`;
function persist() { try { localStorage.setItem(STORAGE,JSON.stringify(game)); storageWorks = true; } catch { storageWorks = false; } }
function statBlock(stats, detailed=false) {
  return `<div class="rs-stats" aria-label="Career statistics">${KEYS.map(k=>`<div class="rs-stat ${(k==='money'||k==='safety')&&stats[k]<=1?'low':''}"><div class="rs-stat-heading">${icon(k)}${LABELS[k]}</div><div class="rs-stat-value">${stats[k]}<small>/ 5</small></div><div class="rs-pips" aria-hidden="true">${Array.from({length:5},(_,i)=>`<i class="${i<stats[k]?'on':''}"></i>`).join('')}</div>${detailed?`<p class="rs-stat-description">${DESCRIPTIONS[k]}</p>`:''}</div>`).join('')}</div>`;
}
function sidebar() {
  return `<aside class="rs-side"><span class="rs-label">The state of your affairs</span><h2>Your career ledger</h2>${statBlock(game.stats,true)}<p class="rs-side-note"><strong>Protect Money and Safety.</strong><br>Either reaching zero ends your career immediately.</p><p class="rs-side-note">To seek exceptional success:<br>Research ≥4 · Reputation ≥4<br>Then face the recognition check.</p><p class="rs-save-status">${storageWorks?'Progress saved in this browser.':'Saving is unavailable here. Keep this page open to continue.'}</p></aside>`;
}
function timeline() {
  return `<ol class="rs-timeline" aria-label="Six chapters of your career">${CHAPTERS.map((c,i)=>`<li class="${i<game.turn?'done':i===game.turn?'current':''}" ${i===game.turn?'aria-current="step"':''}><span class="rs-dot" aria-hidden="true"></span><span class="rs-sr">Chapter ${i+1}: </span>${c.year}</li>`).join('')}</ol>`;
}
const CHAPTER_ART = ['lens-workshop','university','spyglass','patron','debate','print-shop'];
function chapterArt(turn) { const name=CHAPTER_ART[turn]; const alt={ 'lens-workshop':'An illustrated Renaissance lens and instrument workshop', observatory:'An illustrated scholar observing the night sky', 'print-shop':'An illustrated Renaissance printing workshop', university:'An illustrated Italian university cloister', spyglass:'An illustrated workshop assembling an early spyglass', patron:'An illustrated patronage scene at an Italian court', debate:'An illustrated scholarly debate in a candlelit library' }[name]; return `<figure class="rs-chapter-art"><img src="${ART[name]}" width="1400" height="788" alt="${alt}" loading="eager"></figure>`; }
function intro() {
  return `<section class="rs-hero"><div class="rs-hero-copy"><div class="rs-label">Italy · 1587—1633</div><h1 data-focus tabindex="-1">Renaissance<br><span>Scientist.</span></h1><p class="rs-subtitle">Survival Against the Odds</p><p class="rs-tagline">Knowledge has a price.<br>Discovery is only the beginning.</p><p class="rs-intro">${INTRO.replaceAll('\n\n','<br><br>')}</p><div class="rs-actions">${game?button('resume',game.screen==='ending'?'Read your chronicle':'Continue your career')+linkButton('restart','Begin a new career'):button('start','Begin your career')}</div><p class="rs-playtime">6 decisions &nbsp;·&nbsp; 5–10 minutes &nbsp;·&nbsp; 5 possible endings</p></div><div class="rs-hero-art"><img class="rs-hero-image" src="${ART['pisa-cover']}" width="1400" height="788" alt="Illustrated Renaissance scholar overlooking Pisa, with its Leaning Tower beside the cathedral"><div class="rs-plate-label">An imagined night in Renaissance Pisa</div></div></section><section class="rs-ledger"><div><span class="rs-label">Your first page</span><h2>Great questions.<br>Limited means.</h2></div>${statBlock(INITIAL,true)}</section><div class="rs-open-note"><p><strong>Keep Money and Safety above zero.</strong> Build Research and Reputation to at least 4, then hope your work gains wider recognition. A good strategy helps. Nothing guarantees success.</p>${linkButton('rules','Read the rules ↗')}</div>`;
}
function warning(choice) {
  const rule=RULES[game.turn][choice];
  const outcomes=rule.chance == null ? [rule] : [rule.success,rule.failure];
  const loss=outcomes.map(e=>ruined(apply(game.stats,e)));
  if(loss.every(Boolean))return 'This choice will end your career with your current stats.';
  if(loss.some(Boolean))return 'An unsuccessful attempt will end your career with your current stats.';
  return '';
}
function decision() {
  const c=CHAPTERS[game.turn];
  return `${timeline()}<div class="rs-play-layout"><section class="rs-paper"><div class="rs-chapter-meta"><span class="rs-label">Chapter ${c.roman} · Decision ${game.turn+1} of 6</span><span class="rs-label">${c.date}</span></div><h1 data-focus tabindex="-1">${c.title}</h1><p class="rs-location">${c.place}</p>${chapterArt(game.turn)}<p class="rs-situation">${c.text}</p><p class="rs-responsive">${responsiveLine(game)}</p><h2 class="rs-prompt">${c.prompt}</h2><div class="rs-choices">${c.choices.map((o,i)=>`<button type="button" class="rs-choice" data-action="choose" data-choice="${i}"><span class="rs-choice-letter" aria-hidden="true">${'ABC'[i]}</span><span><span class="rs-choice-title">${o[0]}</span><span class="rs-choice-desc">${o[1]}</span><span class="rs-effects">${o[2].split('|').map(t=>`<span class="rs-effect-line">${t}</span>`).join('')}</span>${warning(i)?`<span class="rs-warning">${warning(i)}</span>`:''}</span><span class="rs-choice-arrow" aria-hidden="true">→</span></button>`).join('')}</div><p class="rs-random-rule">After your choice: 60% no event · 25% setback · 15% opportunity.<br>All stats stay between 0 and 5; excess points are discarded.</p></section>${sidebar()}</div>`;
}
function effectSummary(before,after,effects) {
  return Object.entries(effects).map(([k,n])=>`${LABELS[k]} ${delta(n)}${after[k]-before[k]!==n?` (${delta(after[k]-before[k])} applied; ${n>0?'maximum 5':'minimum 0'})`:''}`).join(' · ');
}
function sourceLinks(ids) {
  return `<div class="rs-source-links">${ids.map(id=>{const s=SOURCES.find(v=>v.id===id);return `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.author}: ${s.title} ↗</a>`;}).join('')}</div>`;
}
function historicalNote(c) {
  return `<section class="rs-history"><span class="rs-label">From the historical record</span><h2>Behind the dilemma</h2><p>${c.insight}</p><details><summary>Read the deeper historical note</summary><p>${c.note}</p>${sourceLinks(c.sources)}</details></section>`;
}
function outcome() {
  const e=game.history.at(-1), c=CHAPTERS[game.turn], [title,text]=outcomeText(e), f=e.event;
  const fateTitle={none:'A quiet chapter',setback:'An unexpected setback',opportunity:'An unexpected opportunity',skipped:'The career has ended'}[f.kind];
  return `${timeline()}<div class="rs-play-layout"><section class="rs-paper"><div class="rs-chapter-meta"><span class="rs-label">Chapter ${c.roman} · The consequence</span><span class="rs-label">${c.date}</span></div><h1 data-focus tabindex="-1">${title}</h1>${chapterArt(game.turn)}<p class="rs-outcome-lead">${text}</p><p class="rs-quiet"><strong>Your choice:</strong> ${c.choices[e.choice][0]}<br>${effectSummary(e.before,e.afterChoice,e.effects)}${e.success===null?'':` · ${e.turn===2?'Extra advance':'Attempt'} ${e.success?'succeeded':'did not succeed'}`}</p><div class="rs-fate ${f.kind}"><span class="rs-label">${f.kind==='skipped'?'Immediate ending':'The turn of fortune'}</span><h2>${fateTitle}</h2><p>${eventText(e)}</p>${f.stat?`<p><strong>${effectSummary(e.afterChoice,e.after,{[f.stat]:f.amount})}</strong></p>`:''}</div><div class="rs-label">Your ledger · Before → After</div><div class="rs-changes">${KEYS.map(k=>{const d=e.after[k]-e.before[k];return `<div><span class="rs-change-label">${LABELS[k]}</span><span class="rs-change-value ${d>0?'rs-positive':d<0?'rs-negative':''}">${e.before[k]} → ${e.after[k]}<em>(${delta(d)})</em></span></div>`;}).join('')}</div>${game.ending==='ruin'?`<p class="rs-danger-message">${game.stats.money===0?'Money has reached zero. ':''}${game.stats.safety===0?'Safety has reached zero. ':''}Your career ends here.</p>`:''}${historicalNote(c)}<div class="rs-outcome-cta">${button('continue',game.ending?'Discover your ending':'Continue the chronicle')}<small>${game.ending?'The last page of this career.':`Next: ${CHAPTERS[game.turn+1].date}`}</small></div></section>${sidebar()}</div>`;
}
function recognitionText() {
  const r=game.history.at(-1)?.recognition;
  if (!r) return 'The career ended before a final recognition check could take place.';
  if (!r.chance) return 'The recognition check was not reached. Research and Reputation must both be at least 4, with Money and Safety above zero.';
  return `You qualified for a ${Math.round(r.chance*100)}% recognition check at Reputation ${game.stats.reputation}. ${r.passed?'The check passed: your work gained exceptional recognition.':'The check did not pass. Your research remains substantial, even without exceptional recognition.'}`;
}
function ending() {
  const end=ENDINGS[game.ending];
  return `<section class="rs-ending"><div class="rs-ending-head"><div class="rs-seal ${end.theme}" aria-hidden="true">${end.number}</div><span class="rs-label">The final page · Ending ${end.number} of V</span><h1 data-focus tabindex="-1">${end.title}</h1><p class="rs-subtitle">${end.subtitle}</p></div>${statBlock(game.stats)}<article class="rs-paper rs-ending-paper"><span class="rs-label">Your life in natural philosophy</span><h2>A record of what it took</h2><p class="rs-reflection">${reflection(game).replaceAll('\n\n','<br><br>')}</p><div class="rs-checks">${[['money',1],['research',4],['reputation',4],['safety',1]].map(([k,n])=>`<span class="${game.stats[k]>=n?'met':'unmet'}">${game.stats[k]>=n?'✓':'×'} ${LABELS[k]} ${game.stats[k]} / required ${n}</span>`).join('')}</div><p class="rs-recognition"><strong>The final recognition check</strong><br>${recognitionText()}<br>These odds are game rules, not historical measurements.</p><h2>Your career, chapter by chapter</h2><ol class="rs-journal">${game.history.map(e=>{const c=CHAPTERS[e.turn];return `<li><span class="rs-journal-date">${c.year}<br>${c.roman}</span><div><h3>${c.choices[e.choice][0]}</h3><p>${outcomeText(e)[0]}. ${effectSummary(e.before,e.afterChoice,e.effects)}.</p>${e.event.kind!=='none'?`<p>${eventText(e)}${e.event.stat?` ${effectSummary(e.afterChoice,e.after,{[e.event.stat]:e.event.amount})}.`:''}</p>`:''}</div></li>`;}).join('')}</ol></article><div class="rs-actions rs-ending-actions">${button('start','Play again')}${linkButton('sources','Explore the historical context')}</div></section>`;
}
function rules() {
  return `<span class="rs-label">Before the first decision</span><h2 id="rs-dialog-title">The rules of a fragile career</h2><p>You play a fictional natural philosopher in Italy. Make <strong>six decisions</strong>, each with <strong>three options</strong>. Read the consequences before choosing. An outcome page explains what happened, then lets you continue.</p><div class="rs-rule-stats">${KEYS.map(k=>`<p><strong>${LABELS[k]} · starts at ${INITIAL[k]}/5</strong><br>${DESCRIPTIONS[k]}</p>`).join('')}</div><h3>Survive, investigate, be heard</h3><ul><li>All stats stay between <strong>0 and 5</strong>. Gains above 5 are discarded.</li><li><strong>Money or Safety reaching 0 ends the career immediately.</strong> You cannot be rescued by a later opportunity.</li><li>After each surviving choice: <strong>60% no event, 25% setback, 15% opportunity</strong>. An event changes one equally likely stat by 1. Choice-specific risks are separate.</li><li>Exceptional Success requires <strong>Research ≥4, Reputation ≥4, Money ≥1, Safety ≥1</strong>, then a final recognition check: <strong>15% at Reputation 4</strong> or <strong>25% at Reputation 5</strong>.</li></ul><h3>Five ways the chronicle can end</h3><ol><li><strong>Exceptional Success:</strong> meet all thresholds and pass recognition.</li><li><strong>Discovery Without Recognition:</strong> survive with Research ≥4, without full victory.</li><li><strong>A Stable Career:</strong> survive with Research below 4, Money ≥3, and Reputation ≥2.</li><li><strong>Unfinished Ambition:</strong> survive without meeting those conditions.</li><li><strong>Professional Ruin:</strong> Money or Safety reaches 0 at any stage; this takes priority.</li></ol><p>Your career is saved in this browser when storage is available. Reloading keeps resolved outcomes. You can start a new career at any time.</p><p class="rs-quiet">The statistics, random incidents, and probabilities are fictional game abstractions. They do not measure historical people or societies.</p>`;
}
function sources() {
  return `<span class="rs-label">History & interpretation</span><h2 id="rs-dialog-title">Behind the chronicle</h2><p>This is a fictional career inspired primarily by Galileo Galilei, set in Renaissance and early modern Italy. Dates locate the dilemmas; the offers, incidents, and endings are invented. Other natural philosophers worked in different conditions.</p><p>The historical novel <em>The Star-Gazer</em> by Zsolt de Harsányi is a literary inspiration, not a factual authority. Historical notes were checked against the museum, university, and scholarly sources below. All narrative prose and visual drawings were created for this game.</p><p>Scientific disputes involved evidence, instruments, competing theories, professional interests, and institutional authority. The game does not treat all disagreement as religious persecution. Seeking approval is never a historical guarantee of safety.</p><ol class="rs-bibliography">${SOURCES.map(s=>`<li>${s.author}. <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title} ↗</a><small>${s.publication}</small></li>`).join('')}</ol><details><summary>Read the six historical notes</summary>${CHAPTERS.map(c=>`<section><h3>${c.year} · ${c.title}</h3><p>${c.insight}</p><p>${c.note}</p>${sourceLinks(c.sources)}</section>`).join('')}</details><details><summary>How difficult is the game? Model & testing</summary><p>The specified probabilities have been preserved. The 5–10% target describes an aspiration for ordinary players; no human playtest has established that rate.</p><table class="rs-model-table"><thead><tr><th>Simulated policy</th><th>Full victory</th></tr></thead><tbody>${MODEL.rows.map(r=>`<tr><td>${r.label}</td><td>${percent(r.simulated)}</td></tr>`).join('')}</tbody></table><p>${MODEL.runs.toLocaleString('en-US')} simulated careers per policy, seeded for reproducibility. Uniform random means each option is chosen equally; an optimized policy uses the current stats to maximize full victory. Neither represents measured human behavior.</p><p>Exact probability enumeration gives <strong>${percent(MODEL.randomExact)}</strong> for uniformly random choices and <strong>${percent(MODEL.optimalExact)}</strong> for the optimized policy. All 729 fixed six-choice sequences and every reachable stat/choice transition were also checked.</p><p>At zero Money or Safety, play stops before any further random event. Points are capped after the choice and again after an event. Recognition is drawn once, after the last event, only if all thresholds are met.</p></details>`;
}
function openDialog(kind) {
  dialogFocus=document.activeElement;
  const dialog=root.querySelector('#rs-dialog');
  const body=kind==='rules'?rules():kind==='sources'?sources():kind==='guide'?authorsGuide():`<span class="rs-label">A fresh first page</span><h2 id="rs-dialog-title">Begin again?</h2><p>This will replace the career saved in this browser. Your new career begins with the original stats and fresh chance outcomes.</p><div class="rs-actions">${button('confirm-restart','Begin a new career')}${linkButton('close-dialog','Keep this career')}</div>`;
  dialog.innerHTML=`<button type="button" class="rs-dialog-close" data-action="close-dialog" aria-label="Close dialog">×</button>${body}`;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop=0;
}
function closeDialog() { root.querySelector('#rs-dialog').close(); }
function render(focus=true) {
  const main=root.querySelector('#rs-main');
  main.innerHTML=page==='intro'?intro():game.screen==='decision'?decision():game.screen==='outcome'?outcome():ending();
  main.classList.remove('rs-main');void main.offsetWidth;main.classList.add('rs-main');
  root.querySelector('#rs-restart').hidden=!game||page==='intro';
  if(focus){main.querySelector('[data-focus]')?.focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:'instant'});}
  root.querySelector('#rs-announcer').textContent=page==='intro'?'Introduction':game.screen==='decision'?`Decision ${game.turn+1} of 6. ${CHAPTERS[game.turn].title}.`:game.screen==='outcome'?`${outcomeText(game.history.at(-1))[0]}. ${KEYS.map(k=>`${LABELS[k]} ${game.stats[k]} of 5`).join('. ')}.`:ENDINGS[game.ending].title;
}
function begin() { game=newGame();page='play';persist();render(); }
root.innerHTML=`<a class="rs-skip" href="#rs-main">Skip to game</a><div class="rs-wrap"><header class="rs-header"><button type="button" class="rs-brand" data-action="home" aria-label="Renaissance Scientist introduction">${mark()}<span>The natural philosopher’s<br>chronicle</span></button><nav class="rs-nav" aria-label="Game information"><button type="button" data-action="rules">How to play</button><button type="button" data-action="sources">Sources & context</button><button type="button" data-action="guide">Author’s Guide</button></nav></header><main id="rs-main" class="rs-main"></main><footer class="rs-footer"><span>Created by Aiden Wu · <a href="mailto:aidenwu1114@gmail.com">aidenwu1114@gmail.com</a><br>A fictional life. Historically grounded dilemmas.</span><span>Original artwork · Version 2.1 ${linkButton('restart','Restart career').replace('class="rs-text-button"','id="rs-restart" class="rs-text-button" hidden')}</span></footer></div><div id="rs-announcer" class="rs-sr" role="status" aria-live="polite" aria-atomic="true"></div><dialog id="rs-dialog" class="rs-dialog" aria-labelledby="rs-dialog-title"></dialog>`;
root.addEventListener('click',event=>{
  const el=event.target.closest('[data-action]'); if(!el||!root.contains(el))return;
  const action=el.dataset.action;
  if(action==='start')begin();
  else if(action==='confirm-restart'){closeDialog();begin();}
  else if(action==='resume'){page='play';render();}
  else if(action==='home'){page='intro';render();}
  else if(action==='choose'&&page==='play'&&game.screen==='decision'){game=choose(game,Number(el.dataset.choice));persist();render();}
  else if(action==='continue'&&game.screen==='outcome'){game=advance(game);persist();render();}
  else if(action==='close-dialog')closeDialog();
  else if(['rules','sources','guide','restart'].includes(action))openDialog(action);
});
root.querySelector('#rs-dialog').addEventListener('close',()=>{if(dialogFocus?.isConnected)dialogFocus.focus({preventScroll:true});});
render(false);
