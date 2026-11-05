export const LABELS = { money: 'Money', research: 'Research', reputation: 'Reputation', safety: 'Safety' };
export const DESCRIPTIONS = { money: 'Savings, income, and the cost of your work.', research: 'The progress and quality of your investigations.', reputation: 'Scholarly credibility and professional support.', safety: 'Your health and freedom to continue working.' };
export const INTRO = 'Italy, 1587. New instruments are changing what people can see, but a discovery alone does not make a career. As a fictional natural philosopher, you must pay your bills, earn the trust of scholars, and find room for ideas that unsettle established knowledge. Across six moments inspired by Galileo’s world, your choices—and circumstances beyond your control—will shape what you can achieve. Protect your livelihood. Follow your questions. Decide what you are willing to risk.';
export const CHAPTERS = [
  {
    date: 'c. 1587', year: '1587', roman: 'I', title: 'The Struggling Scholar', place: 'A rented room in Tuscany',
    text: 'Your notebook is full of questions about motion. Your purse is almost empty. A merchant wants instruments, a wealthy family needs a mathematics tutor, and your own unfinished experiments wait on the table. There is no salary for curiosity. Before you can change anyone’s understanding of the world, you must decide how to live in it.',
    prompt: 'How will you begin your career?',
    choices: [
      ['Teach mathematics to wealthy students', 'A reliable income, purchased with hours away from your own questions.', 'Money +2'],
      ['Build practical instruments for merchants', 'Turn mathematical ideas into useful tools and learn as you work.', 'Money +1 · Research +1'],
      ['Spend savings on independent research', 'Give the experiments your full attention. The bills will have to wait.', 'Money −1 · Research +2']
    ],
    outcomes: [
      ['A living from numbers', 'Your pupils learn geometry while their families settle your fees. You have secured breathing room, though the questions in your notebook must wait.'],
      ['Knowledge put to work', 'An instrument leaves your workbench and earns its price. The difficult work of making it has sharpened your understanding as well.'],
      ['The first pages fill', 'Days of uninterrupted experiments bring real progress. You turn the final page with satisfaction, then count the coins you have left.']
    ],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1592', year: '1592', roman: 'II', title: 'The University Opportunity', place: 'Letters from the university',
    text: 'A university appointment promises regular pay and a place among learned colleagues. But appointments depend on recommendations as well as ability, and another scholar may be preferred. Your private work remains an alternative: less prestigious, perhaps, but immediately within reach. You prepare your papers and consider how much uncertainty you can afford.',
    prompt: 'Where will you place your hopes?',
    choices: [
      ['Apply for a prestigious university position', 'Ask influential scholars to support your application.', '60%: Money +2, Reputation +1|40%: Money −1'],
      ['Continue private tutoring alongside research', 'Keep dependable pupils and reserve some hours for investigation.', 'Money +1 · Research +1'],
      ['Remain completely independent', 'Keep control of your work and pay its costs yourself.', 'Money −1 · Research +2']
    ],
    outcomes: [
      ['An appointment secured', 'Your recommendations carry weight. The university offers a position, and a regular income brings new standing among your peers.'],
      ['A modest rhythm', 'Lessons keep the household afloat. Between pupils, you return to the experiments: slow progress, but progress you can sustain.'],
      ['Freedom at a price', 'You decline to organize your questions around an institution’s timetable. Your research advances while your remaining savings diminish.']
    ],
    failure: ['The chair goes to someone else', 'A polite letter closes the opportunity. Preparing the application has cost money, and the position you hoped for belongs to another scholar.'],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1609', year: '1609', roman: 'III', title: 'The Price of Precision', place: 'At the instrument maker’s bench',
    text: 'News arrives of a device that makes distant objects appear nearer. Turned toward the sky, such an instrument might reveal things no accepted book describes. But uneven lenses can produce misleading images. Better equipment costs money; making it yourself requires skill and patience. Your next claim will be only as convincing as the observations behind it.',
    prompt: 'How will you improve your observations?',
    choices: [
      ['Purchase high-quality lenses and apparatus', 'Pay for better materials and begin observing with confidence.', 'Money −2 · Research +2'],
      ['Build and improve a telescope', 'Shape and test the instrument yourself; precision is uncertain.', 'Money −1 · Research +1|50% chance: additional Research +1'],
      ['Continue using existing equipment', 'Ask what your present instruments can reliably show.', 'Research +1']
    ],
    outcomes: [
      ['A clearer view', 'The improved apparatus makes careful comparisons possible. Better observations fill your notebook, though the purchase has taken a substantial part of your funds.'],
      ['The lenses finally agree', 'After repeated adjustments, the image becomes clearer. Your work on the instrument yields both useful observations and an unexpected extra advance.'],
      ['Patience with imperfect tools', 'You repeat measurements with the equipment you already have. Its limits remain, but careful work still produces a useful result.']
    ],
    failure: ['A useful, imperfect instrument', 'Your telescope works, though the image is less precise than you hoped. The work still improves your research; the extra breakthrough eludes you.'],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1610', year: '1610', roman: 'IV', title: 'The Wealthy Patron', place: 'Beyond the palace doors',
    text: 'A discovery needs readers, instruments need payment, and letters of introduction open doors that evidence alone cannot. A great court might support your work and carry your name across Italy. A local patron offers less, with more certainty. Accepting support means entering a relationship of expectations and obligation. You must decide whose attention to seek.',
    prompt: 'Whose support will you pursue?',
    choices: [
      ['Seek a prestigious court patron', 'Present your work where a powerful endorsement could change everything.', '65%: Money +2, Reputation +2|35%: Reputation −1'],
      ['Accept modest support from a local patron', 'Choose a smaller circle and a dependable arrangement.', 'Money +1 · Reputation +1'],
      ['Reject patronage and finance research yourself', 'Preserve your independence with another claim on your savings.', 'Money −1 · Research +2']
    ],
    outcomes: [
      ['A name welcomed at court', 'Your presentation wins an influential supporter. Funds arrive, and people who once overlooked your letters begin to answer.'],
      ['A dependable supporter', 'Your patron cannot command an entire court, but provides useful funds and introductions. A modest arrangement gives your work room to continue.'],
      ['No dedication owed', 'You keep control of your investigations and owe no patron a flattering dedication. The research advances at your own expense.']
    ],
    failure: ['The court turns away', 'Your appeal fails to impress the right people. The public disappointment costs you standing, even though your observations remain unchanged.'],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1616', year: '1616', roman: 'V', title: 'The Dangerous Discovery', place: 'A widening circle of debate',
    text: 'Your observations trouble familiar accounts of the heavens. Some scholars question the instruments; others dispute what the evidence proves. Arguments about a moving Earth now also confront official religious restrictions. You have reasons to keep investigating, but the way you present those reasons matters. A public defense could win supporters while putting your freedom at risk.',
    prompt: 'How will you communicate the evidence?',
    choices: [
      ['Publicly defend controversial findings', 'Bring the dispute into the open and accept the personal risk.', 'Reputation +2 · Safety −2'],
      ['Share evidence privately with trusted scholars', 'Let a small circle examine and discuss your observations.', 'Research +1 · Reputation +1'],
      ['Investigate further before publishing', 'Strengthen the work while postponing a public claim.', 'Research +2']
    ],
    outcomes: [
      ['Your argument enters the square', 'Your defense brings new attention and supporters. It also draws scrutiny that makes continuing your work more precarious.'],
      ['A quieter exchange', 'Trusted correspondents question, check, and develop your evidence. Their confidence in your work grows alongside the investigation itself.'],
      ['Another night of questions', 'You postpone the public argument and return to the evidence. The findings become stronger, even as the wider world remains unaware.']
    ],
    insight: '', note: '', sources: []
  },
  {
    date: 'c. 1632–1633', year: '1633', roman: 'VI', title: 'The Final Manuscript', place: 'The last pages of a life’s work',
    text: 'Years of investigation now lie gathered in a manuscript. The wording of an argument, the people who approve it, and the readers who receive it may shape its fate as much as the observations inside. You can write boldly, revise with care, or trust a small circle to carry the work forward. There is time for one final decision.',
    prompt: 'How will your work leave this room?',
    choices: [
      ['Publish a bold, controversial treatise', 'Seek a public audience despite the danger of official scrutiny.', 'Reputation +2 · Safety −2'],
      ['Carefully revise the manuscript and seek approval', 'Negotiate the wording and the conditions of publication.', 'Reputation +1 · Safety +1'],
      ['Circulate it among trusted scholars', 'Pay to prepare copies for readers you know.', 'Money −1 · Research +1 · Reputation +1']
    ],
    outcomes: [
      ['Into print, and into danger', 'The treatise gives your ideas a louder public voice. That attention carries a personal cost you can no longer set aside.'],
      ['Every word considered', 'Your careful revision earns professional confidence and, within this fictional career, some protection. The work reaches its final form through negotiation.'],
      ['The manuscript travels by hand', 'Copies leave for trusted readers. Their exchange strengthens the investigation and your standing, though preparing the manuscripts costs money.']
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
  const s = game.stats, h = game.history;
  const opening = {
    success: 'Your investigations have substance, your name carries weight, and you still possess the means and freedom to work. Wider recognition arrives—a rare convergence of achievement and circumstance.',
    unrecognized: 'Your investigations produced substantial work, but exceptional public recognition did not follow. The value of an observation and the visibility of its author have proved to be different things.',
    stable: 'You finish with a viable livelihood and a measure of professional respect. Your investigations remain below the game’s discovery threshold, but maintaining a career was itself an achievement.',
    unfinished: 'You remain able to work, but the six chapters close before your investigations and professional position can come together. Your unfinished pages record ambition as well as limits.',
    ruin: s.money === 0 && s.safety === 0 ? 'Both your funds and your freedom or health have reached their limits. The career ends here, before another opportunity can change its course.' : s.money === 0 ? 'Your money has run out. Whatever remains in your notebook, you no longer have the resources to sustain this career. An unanswered question cannot pay the next bill.' : 'Your health or freedom to work has reached its limit. The career ends, even if your money and unfinished investigations might otherwise have supported another chapter.'
  }[game.ending];
  const patron = h[3]?.choice;
  const personal = patron === 0 ? (h[3].success ? 'A successful appeal to court brought both resources and standing; connections helped carry your work.' : 'Your unsuccessful appeal to court showed how much professional support depended on other people’s judgment.') : patron === 1 ? 'The modest patronage you accepted provided a dependable foundation, even without the influence of a great court.' : patron === 2 ? 'You chose to finance your own research, preserving independence while carrying the financial burden yourself.' : 'Your early decisions determined how much time and money you could devote to the questions that drew you here.';
  const events = h.filter(e => ['setback','opportunity'].includes(e.event.kind));
  const luck = events.length ? `${events.length} unexpected ${events.length === 1 ? 'event altered' : 'events altered'} your circumstances along the way. Neither careful planning nor ambition could remove that uncertainty.` : 'No unexpected event altered this run. Even so, the trade-offs within your decisions set real limits on what was possible.';
  return `${opening} ${personal} ${luck} This fictional career is not Galileo’s biography. Its lesson is about the conditions of inquiry: reliable instruments, income, credibility, support, and freedom. Intelligence alone could not guarantee that all of them would last, even for a gifted and unusually determined scholar.`;
}
