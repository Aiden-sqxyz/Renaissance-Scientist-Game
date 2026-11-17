export const LABELS = { money: 'Money', research: 'Research', reputation: 'Reputation', safety: 'Safety' };
export const DESCRIPTIONS = { money: 'Savings, income, and the cost of your work.', research: 'The progress and quality of your investigations.', reputation: 'Scholarly credibility and professional support.', safety: 'Your health and freedom to continue working.' };
export const INTRO = 'Italy, 1587. You are a young natural philosopher—a scientist of your time—with little money and questions about how the world works.\n\nUniversities teach ideas inherited from ancient authorities. New observations challenge them, but evidence alone will not secure your future. You need an income, influential supporters, and the freedom to keep working.\n\nAcross six decisions, build your career in Galileo’s world. How much will you risk for a discovery?';
export const CHAPTERS = [
  {
    date: 'c. 1587', year: '1587', roman: 'I', title: 'Making a Living', place: 'Tuscany',
    text: 'Your experiments on motion need time and equipment, but rent is due. Scholars often support themselves by teaching mathematics or making instruments for navigation and trade. Either could pay your bills—while taking time away from research.',
    prompt: 'What will you do?',
    choices: [
      ['Teach wealthy students', 'Earn steady money, but put your experiments aside.', 'Money +2'],
      ['Make instruments for merchants', 'Earn money while developing practical skills.', 'Money +1 · Research +1'],
      ['Spend your savings on research', 'Follow your questions while you can afford to.', 'Money −1 · Research +2']
    ],
    outcomes: [
      ['A living from numbers', 'Your pupils learn geometry, and their families pay on time. Your notebook stays closed a little longer.'],
      ['Knowledge put to work', 'A merchant buys your instrument. Building it has also given you ideas for your next experiment.'],
      ['The first pages fill', 'Uninterrupted experiments bring progress. By candlelight, you check your results—and count your remaining coins.']
    ],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1592', year: '1592', roman: 'II', title: 'A Place at the University', place: 'An opportunity arrives',
    text: 'A university needs a mathematics teacher. The position offers regular pay, scholarly contacts, and students who might assist your research. But recommendations matter as much as ability. Applying will cost money, and another scholar could take the position.',
    prompt: 'Where will you put your hopes?',
    choices: [
      ['Apply for the university position', 'Seek recommendations and take your chance.', '60%: Money +2, Reputation +1|40%: Money −1'],
      ['Keep tutoring and researching', 'Divide your days between income and experiments.', 'Money +1 · Research +1'],
      ['Stay independent', 'Keep control of your time and pay your own way.', 'Money −1 · Research +2']
    ],
    outcomes: [
      ['An appointment secured', 'Your supporters’ letters make a difference. The university offers you the position, a salary, and a more respected name.'],
      ['A modest rhythm', 'Lessons pay the bills. Your experiments move slowly, squeezed into the hours between pupils.'],
      ['Freedom at a price', 'No teaching timetable interrupts your experiments. No salary replenishes your savings, either.']
    ],
    failure: ['The chair goes to someone else', 'The position goes to someone else. Your application expenses are gone, and you still need a living.'],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1609', year: '1609', roman: 'III', title: 'A New View of the Sky', place: 'The workshop',
    text: 'News arrives of a Dutch instrument that makes distant objects appear closer. What might it reveal in the night sky? Poor lenses distort the view and invite doubt. Better equipment could strengthen your observations—if you can afford it.',
    prompt: 'How will you equip yourself?',
    choices: [
      ['Buy high-quality lenses', 'Pay heavily for clearer observations.', 'Money −2 · Research +2'],
      ['Build your own telescope', 'Save money, but risk disappointing results.', 'Money −1 · Research +1|50% chance: additional Research +1'],
      ['Keep your existing equipment', 'Work carefully within its limits.', 'Research +1']
    ],
    outcomes: [
      ['A clearer view', 'Distant details come into focus. Your observations improve, but the purchase leaves a large gap in your purse.'],
      ['The lenses finally agree', 'After days of grinding and adjustment, the image sharpens. Your homemade telescope reveals more than you expected.'],
      ['Patience with imperfect tools', 'Repeated measurements reveal something useful. You make progress, though some questions remain beyond your instruments.']
    ],
    failure: ['A useful, imperfect instrument', 'The telescope works, but distortion remains. You gain useful observations without the breakthrough you hoped for.'],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1610', year: '1610', roman: 'IV', title: 'Someone Powerful Is Listening', place: 'Outside the palace',
    text: 'Wealthy patrons fund instruments, offer positions, and open doors. In return, they expect service, prestige, or a flattering dedication. A powerful court could transform your career. A local supporter offers less, but seems easier to win over.',
    prompt: 'Whose support will you seek?',
    choices: [
      ['Approach a powerful court', 'Aim for generous funding and influential connections.', '65%: Money +2, Reputation +2|35%: Reputation −1'],
      ['Accept a local patron’s offer', 'Choose modest, dependable support.', 'Money +1 · Reputation +1'],
      ['Fund the work yourself', 'Keep your independence and carry the expense.', 'Money −1 · Research +2']
    ],
    outcomes: [
      ['A name welcomed at court', 'Your presentation impresses the right people. Funding arrives, and scholars who ignored your letters begin answering them.'],
      ['A dependable supporter', 'Your patron offers money and introductions. It is no grand appointment, but you can keep working.'],
      ['No dedication owed', 'You owe nobody a flattering dedication. The experiments advance at your own expense.']
    ],
    failure: ['The court turns away', 'Your presentation wins no support. Word of the rejection spreads, weakening your standing.'],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1616', year: '1616', roman: 'V', title: 'Evidence Becomes Dangerous', place: 'The debate widens',
    text: 'Your observations challenge accepted ideas about the heavens. Scholars dispute what they prove, while religious authorities restrict support for a moving Earth. Speaking publicly could win allies—or attract people with the power to stop your work.',
    prompt: 'How will you share your findings?',
    choices: [
      ['Defend them publicly', 'Put your name behind the argument despite the danger.', 'Reputation +2 · Safety −2'],
      ['Write to trusted scholars', 'Let a smaller circle examine the evidence.', 'Research +1 · Reputation +1'],
      ['Keep investigating', 'Strengthen your research before entering the debate.', 'Research +2']
    ],
    outcomes: [
      ['Your argument enters the square', 'Your argument wins attention and supporters. It also draws scrutiny that threatens your freedom to continue.'],
      ['A quieter exchange', 'Letters bring questions, corrections, and encouragement. Your evidence grows stronger, and more colleagues trust your work.'],
      ['Another night of questions', 'You return to the instruments. Your findings improve, while the public debate continues without you.']
    ],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1632–1633', year: '1633', roman: 'VI', title: 'The Final Manuscript', place: 'Your study',
    text: 'Years of work fill your manuscript. In Galileo’s Italy, publishing arguments about the heavens can bring official scrutiny. Your wording, supporters, and choice of readers may determine how far your ideas travel—and whether you remain free to work.',
    prompt: 'How will you send it into the world?',
    choices: [
      ['Publish a bold argument', 'Reach a wide audience and face the scrutiny.', 'Reputation +2 · Safety −2'],
      ['Revise carefully and seek approval', 'Negotiate how your ideas appear in print.', 'Reputation +1 · Safety +1'],
      ['Send copies to trusted scholars', 'Pay for a smaller, familiar readership.', 'Money −1 · Research +1 · Reputation +1']
    ],
    outcomes: [
      ['Into print, and into danger', 'Your book brings your argument to a wider audience. The attention also increases the danger surrounding your work.'],
      ['Every word considered', 'You revise disputed passages and secure support for publication. The compromises give your work some breathing room.'],
      ['The manuscript travels by hand', 'Copies travel between trusted readers. Their responses strengthen your work and reputation, though copying costs you money.']
    ],
    insight: '', note: '', sources: []
  }
];
export function responsiveLine(game) {
  const { turn, stats: s, history: h } = game;
  if (turn === 0) return 'For now, you have three measures of money and a name few people know.';
  if (s.money <= 1) return 'Your funds are nearly exhausted. One more loss of money will end your career.';
  if (s.safety <= 1) return 'Your position is fragile. One more loss of safety will end your career.';
  if (turn === 1 && h[0]?.choice === 0) return 'The income from your wealthy pupils gives you room to consider a larger ambition.';
  if (turn === 2 && h[1]?.choice === 0 && h[1]?.success) return 'Your university appointment has given you an income—and colleagues who will scrutinize your claims.';
  if (turn === 3 && h[2]?.choice === 1) return 'The telescope you built has become part of the story you can present to a patron.';
  if (turn === 4 && h[3]?.choice === 0 && h[3]?.success) return 'A court now knows your name. That attention may bring support, but also expectations.';
  if (turn === 5 && h[4]?.choice === 0) return 'You have already defended these ideas in public. Readers will recognize the argument—and its author.';
  if (s.research >= 4) return 'Your investigations have substance. The challenge is to secure the conditions that let them matter.';
  return 'Each earlier decision has shaped the resources and support you can draw upon now.';
}
const EVENT_TEXT = {
  money: {
    setback: ['A household bill comes due before a pupil pays.', 'Travel and correspondence cost more than you expected.', 'A lens breaks during delivery; the replacement is yours to pay for.', 'Preparing your presentation creates an unexpected expense.', 'A late payment leaves your household short of funds.', 'Preparing the final copies costs more than the agreed price.'],
    opportunity: ['A new pupil pays for mathematics lessons in advance.', 'An extra course of private lessons brings a welcome fee.', 'A merchant pays for advice on a practical instrument.', 'A supporter sends a small additional gift.', 'A former pupil commissions mathematical work.', 'A reader pays for copies and leaves something for your work.']
  },
  research: {
    setback: ['A measurement cannot be reproduced; part of the work must begin again.', 'Damp damages a set of notes before you can copy them.', 'An unnoticed lens defect undermines a series of observations.', 'A correspondent identifies an error in your calculations.', 'A careful check reveals a gap in a key argument.', 'An inconsistency forces you to withdraw part of the manuscript.'],
    opportunity: ['A colleague suggests a useful way to compare your measurements.', 'A scholar sends a mathematical result that advances your investigation.', 'A clear night reveals a detail your earlier observations missed.', 'A correspondent independently checks one of your results.', 'A trusted colleague helps resolve a stubborn contradiction.', 'A reader’s correction makes your final argument stronger.']
  },
  reputation: {
    setback: ['A respected tutor dismisses your work as impractical.', 'A rival questions your qualifications in a letter.', 'A skeptical scholar doubts the reliability of your observations.', 'An influential visitor repeats an unflattering judgment of your work.', 'A public criticism weakens confidence in your interpretation.', 'An influential reader dismisses the manuscript.'],
    opportunity: ['A pupil recommends you to another learned household.', 'A respected mathematician praises your work to colleagues.', 'Another observer confirms a result and credits your care.', 'A well-connected scholar introduces your work to new readers.', 'A correspondent publicly acknowledges the quality of your evidence.', 'A respected scholar recommends your manuscript to colleagues.']
  },
  safety: {
    setback: ['An illness interrupts your work and weakens your health.', 'A fever confines you to your room for several weeks.', 'An illness makes sustained observation difficult.', 'Exhausting travel leaves you unwell.', 'A formal complaint places your activities under greater scrutiny.', 'An official inquiry restricts your freedom to work.'],
    opportunity: ['Rest and help from your household restore some of your health.', 'A period of recovery allows you to return to your work.', 'Assistance with observations gives you time to recover your strength.', 'A friend offers secure lodging during an unsettled period.', 'A trusted intermediary helps ease immediate scrutiny of your work.', 'A supporter negotiates some breathing room for your remaining work.']
  }
};
export function eventText(entry) {
  const e = entry.event;
  if (e.kind === 'none') return 'No further event disturbs this chapter. For now, your circumstances hold.';
  if (e.kind === 'skipped') return 'Your career ended with this choice. No further event was drawn.';
  return EVENT_TEXT[e.stat][e.kind][entry.turn];
}
export function outcomeText(entry) {
  const chapter = CHAPTERS[entry.turn];
  return entry.success === false && chapter.failure ? chapter.failure : chapter.outcomes[entry.choice];
}
export const ENDINGS = {
  success: { number: 'I', title: 'Exceptional Success', subtitle: 'Against the odds, your work finds its place.', theme: 'gold' },
  unrecognized: { number: 'II', title: 'Discovery Without Recognition', subtitle: 'The work matters. The world has not yet noticed.', theme: 'gold' },
  stable: { number: 'III', title: 'A Stable Career', subtitle: 'You have earned a living—and a place among your peers.', theme: 'gold' },
  unfinished: { number: 'IV', title: 'Unfinished Ambition', subtitle: 'Your questions have outlived the means to answer them.', theme: 'gold' },
  ruin: { number: 'V', title: 'Professional Ruin', subtitle: 'The conditions for continuing have fallen away.', theme: 'red' }
};
export function reflection(game) {
  const s = game.stats;
  const opening = {
    success: 'Your discoveries win recognition, and you still have the money and freedom to continue. Years of work, useful connections, and fortunate circumstances have come together. Few scholars reach this position.',
    unrecognized: 'Your notebooks contain valuable discoveries, but wider recognition never arrives. Some readers overlook your work; others remain unconvinced. You have advanced knowledge, even if your name remains unfamiliar.',
    stable: 'You have an income, professional respect, and room to keep working. The great breakthrough remains beyond reach, but you have built a lasting place in a precarious profession.',
    unfinished: 'You can still work, but your ambitions remain unfinished. Too much time went into finding money, support, or an audience. Your manuscript ends with questions you have yet to answer.',
    ruin: s.money === 0 ? 'Your money runs out. Rent, equipment, and daily expenses leave you unable to continue this career. Whatever your discoveries might have become, the next bill cannot wait.' : 'Illness or restrictions leave you unable to continue. Your unfinished work remains on the desk. Neither talent nor ambition can restore the conditions you need to pursue it.'
  }[game.ending];
  return `${opening}\n\nYou needed more than good ideas: time, money, reliable instruments, people willing to listen, and the freedom to work. Which did you protect—and what did it cost you?`;
}
