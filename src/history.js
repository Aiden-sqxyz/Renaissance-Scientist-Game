import { CHAPTERS } from './content.js';
export const SOURCES = [
  { id: 'miller', author: 'David Marshall Miller', title: 'Galileo Galilei', publication: 'Stanford Encyclopedia of Philosophy, revised 2025', url: 'https://plato.stanford.edu/entries/galileo/' },
  { id: 'family', author: 'Mark Covington and Amit Mistry', title: 'The Status of Women in Galileo’s Time', publication: 'The Galileo Project, Rice University', url: 'https://galileo.library.rice.edu/fam/status_women.html' },
  { id: 'life', author: 'Museo Galileo', title: 'Life: Chronology of the Main Events of Galileo’s Biography', publication: 'Institute and Museum of the History of Science, Florence', url: 'https://www.museogalileo.it/en/galileo/life.html' },
  { id: 'telescope', author: 'Albert Van Helden', title: 'The Telescope', publication: 'The Galileo Project, Rice University, 1995', url: 'https://galileo.library.rice.edu/sci/instruments/telescope.html' },
  { id: 'medici', author: 'Albert Van Helden', title: 'The Medici Family', publication: 'The Galileo Project, Rice University, 1995', url: 'https://galileo.library.rice.edu/gal/medici.html' },
  { id: 'venus', author: 'Museo Galileo', title: 'Phases of Venus', publication: 'Online catalogue, In-depth', url: 'https://catalogue.museogalileo.it/indepth/PhasesVenus.html' },
  { id: 'orders', author: 'Maurice A. Finocchiaro', title: 'Galileo’s First Confrontation with the Inquisition (1616): Four Orders and Three Issues', publication: 'Galilaeana 13 (2016): 29–60. University of Nevada, Las Vegas repository', url: 'https://oasis.library.unlv.edu/philosophy_fac_articles/40/' },
  { id: 'trial', author: 'Museo Galileo', title: 'Galileo’s Trial', publication: 'Online catalogue, historical account', url: 'https://catalogue.museogalileo.it/multimedia/GalileosTrialBis.html' }
];
const notes = [
  {
    insight: 'Galileo combined mathematical study with paid teaching and practical work. Family obligations, including a sister’s dowry, strained his finances. Intellectual ambition still depended on finding enough money to keep working.',
    note: 'Galileo’s early career did not come with a secure research salary. After leaving university, he taught mathematics privately and cultivated relationships with established scholars. Financial pressure continued after he became a professor: his responsibilities included supporting relatives and paying a sister’s dowry. He supplemented academic earnings through private pupils and practical mathematical work. These were not simply distractions from science; they helped sustain it. Your opening dilemma compresses several pressures from his career into one fictional moment. It does not claim that Galileo faced these exact three offers in 1587.',
    sources: ['miller','family']
  },
  {
    insight: 'Galileo taught mathematics at Pisa from 1589, then moved to Padua in 1592. University employment offered income and a place to work, but appointments also depended on recommendations, negotiation, and relationships.',
    note: 'Galileo secured his Pisan mathematics position in 1589, with support from influential scholars. Dissatisfied with its conditions, he pursued a position at Padua, in the Venetian Republic, and received the appointment in September 1592. He remained there until 1610, combining teaching with productive investigations. A university post could provide continuity and professional connections, but it did not remove the need to earn additional income. Nor did every application succeed: Galileo had previously sought a position at Bologna unsuccessfully. The game’s application probability represents uncertainty for a fictional scholar, not a measured historical hiring rate.',
    sources: ['life','miller']
  },
  {
    insight: 'Galileo did not invent the telescope. He improved a device first demonstrated in the Netherlands, turning craftsmanship into an astronomical advantage. Early lenses and narrow fields of view made observing—and checking someone else’s observations—difficult.',
    note: 'News of the Dutch spyglass reached Italy in 1609. Galileo built increasingly powerful versions and used them to investigate the Moon, Jupiter, and the crowded appearance of the Milky Way. Producing a useful instrument required more than placing two lenses in a tube: glass quality, lens shape, alignment, and aperture affected what an observer could see. Other scholars initially struggled to verify his discoveries because their telescopes were less capable. His advantage was practical as well as intellectual. This decision simplifies that work into a trade-off between money, patient improvement, and the limits of existing equipment.',
    sources: ['telescope']
  },
  {
    insight: 'In 1610 Galileo named Jupiter’s newly observed moons for the Medici family and dedicated his astronomical publication to Cosimo II. Court patronage could turn a discovery into salary, status, and influential support.',
    note: 'Galileo had already tutored the young Cosimo de’ Medici before seeking a court position. When his telescopic observations attracted attention in 1610, he dedicated Sidereus Nuncius to Cosimo II and associated Jupiter’s moons with the ruling family. He then moved to Florence as the grand duke’s mathematician and philosopher. Discoveries could therefore serve several purposes at once: arguments about nature, demonstrations of skill, and gifts that enhanced a patron’s prestige. This was a relationship to cultivate, not simply a grant application. Your fictional patron’s response represents that dependence without recreating Galileo’s negotiations.',
    sources: ['medici','life']
  },
  {
    insight: 'In 1616 Galileo was warned against defending Copernicanism, and Copernicus’s book was suspended pending correction. The conflict involved scriptural authority and institutional power, but also genuine disputes about what astronomical observations established.',
    note: 'Copernicanism placed Earth in motion around the Sun. Galileo’s observations challenged familiar cosmology, but they did not by themselves settle every competing explanation. Venus’s phases, for example, contradicted the traditional Ptolemaic arrangement while remaining compatible with Tycho Brahe’s system, in which Earth stayed still. In 1616 Cardinal Bellarmine warned Galileo over his defense of Copernicanism. Historians continue to debate the precise force and documentation of the orders issued. The game compresses these complicated circumstances into a communication dilemma. Its Safety penalty is a fictional rule, not a claim that every scientific disagreement led to punishment.',
    sources: ['venus','orders','trial']
  },
  {
    insight: 'Galileo’s Dialogue appeared in 1632. In 1633 the Roman Inquisition condemned him, required him to recant, and imposed confinement. His scientific reputation and powerful connections did not guarantee freedom to publish and debate.',
    note: 'The Dialogue compared the Ptolemaic and Copernican world systems through a conversation among fictional speakers. It appeared in 1632, but authorities subsequently prohibited it and summoned Galileo to Rome. His trial culminated in June 1633 in condemnation and a forced recantation; his imprisonment became house arrest. The case cannot be reduced to one reckless sentence or a simple choice between truth and caution. Earlier restrictions, the book’s interpretation, and authority over acceptable argument all mattered. Your final manuscript is an invented parallel. Seeking approval is a game strategy, not a historical guarantee of protection.',
    sources: ['trial','miller']
  }
];
CHAPTERS.forEach((c,i) => Object.assign(c, notes[i]));
