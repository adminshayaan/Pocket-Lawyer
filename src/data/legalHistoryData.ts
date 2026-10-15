import { LegalHistoryEvent } from '../types/legal';

export const LEGAL_HISTORY_EVENTS: LegalHistoryEvent[] = [
  {
    id: 'making-of-constitution',
    year: '1946–1950',
    era: 'Constitutional Foundation',
    title: 'The Making of the Constitution of India',
    summary:
      'The Constituent Assembly, chaired by Dr. Rajendra Prasad with Dr. B.R. Ambedkar as Chairman of the Drafting Committee, deliberated for 2 years, 11 months, and 18 days to craft the world’s longest written constitution.',
    significance:
      'Replaced colonial laws with a democratic, sovereign republic guaranteeing fundamental rights, universal adult suffrage, and equality before the law.',
    keyActsOrMilestones: [
      'Constituent Assembly first met on December 9, 1946.',
      'Adopted on November 26, 1949 (celebrated as Constitution Day).',
      'Came into full legal effect on January 26, 1950 (Republic Day).'
    ],
    sourceReference: 'Constituent Assembly Debates (Official Records), Parliament of India'
  },
  {
    id: 'kesavananda-bharati',
    year: '1973',
    era: 'Judicial Landmark',
    title: 'Kesavananda Bharati & The Basic Structure Doctrine',
    summary:
      'A historic 13-judge bench of the Supreme Court ruled by a 7-6 majority that while Parliament has wide powers to amend the Constitution under Article 368, it cannot alter or destroy its "Basic Structure".',
    significance:
      'Guaranteed that fundamental democratic principles—such as judicial review, rule of law, federalism, and secularism—cannot be abolished by any parliamentary majority.',
    keyActsOrMilestones: [
      'Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225.',
      'Established the ultimate supremacy of constitutional values over transient legislative majorities.'
    ],
    sourceReference: 'Supreme Court of India Official Judgments Archive'
  },
  {
    id: 'pil-and-legal-aid',
    year: '1976–1980s',
    era: 'Access to Justice',
    title: 'Rise of Public Interest Litigation (PIL) and Free Legal Aid',
    summary:
      'Under the visionary leadership of Justices V.R. Krishna Iyer and P.N. Bhagwati, the Supreme Court relaxed the rigid rule of locus standi, permitting any citizen or organization to approach the court on behalf of oppressed or marginalized persons.',
    significance:
      'Democratized justice in India. Article 39A was introduced via the 42nd Amendment, directly resulting in the Legal Services Authorities Act, 1987 (NALSA).',
    keyActsOrMilestones: [
      'Introduction of Article 39A (Free Legal Aid) in 1976.',
      'Hussainara Khatoon case (1979) releasing thousands of undertrials.',
      'Enactment of Legal Services Authorities Act, 1987.'
    ],
    sourceReference: 'National Legal Services Authority (NALSA) Historical Overview'
  },
  {
    id: 'it-act-2000',
    year: '2000',
    era: 'Digital Era',
    title: 'The Information Technology Act & Dawn of Cyber Jurisprudence',
    summary:
      'India enacted the Information Technology Act, 2000, based on the UNCITRAL Model Law on Electronic Commerce, providing statutory recognition to electronic transactions, digital records, and electronic signatures.',
    significance:
      'Established the framework for cybersecurity, intermediary liability, and digital offenses, amended in 2008 to address cyber terrorism and privacy breaches.',
    keyActsOrMilestones: [
      'Information Technology Act, 2000 (Act No. 21 of 2000).',
      'Establishment of Cyber Appellate Tribunal.',
      'Creation of the Indian Computer Emergency Response Team (CERT-In).'
    ],
    sourceReference: 'Ministry of Electronics and Information Technology (MeitY)'
  },
  {
    id: 'child-protection-statutes',
    year: '2012–2015',
    era: 'Human Rights',
    title: 'Modern Child Protection Jurisprudence (POCSO & JJ Act)',
    summary:
      'India enacted the landmark Protection of Children from Sexual Offences (POCSO) Act, 2012, followed by the overhauled Juvenile Justice (Care and Protection of Children) Act, 2015.',
    significance:
      'Created child-friendly legal systems, mandatory reporting, special courts, and reinforced reformative rehabilitation while strictly protecting child victim identities.',
    keyActsOrMilestones: [
      'POCSO Act, 2012: Gender-neutral protection from sexual assault.',
      'Juvenile Justice Act, 2015: Distinction between petty, serious, and heinous offences.'
    ],
    sourceReference: 'Ministry of Women and Child Development'
  },
  {
    id: 'right-to-privacy',
    year: '2017',
    era: 'Constitutional Landmark',
    title: 'Puttaswamy Judgment: The Fundamental Right to Privacy',
    summary:
      'A unanimous 9-judge bench of the Supreme Court held that the Right to Privacy is an intrinsic and protected part of the Right to Life and Personal Liberty under Article 21.',
    significance:
      'Set the foundation for modern data protection jurisprudence, personal bodily autonomy, and led directly to the Digital Personal Data Protection (DPDP) Act, 2023.',
    keyActsOrMilestones: [
      'Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1.',
      'Overruled outdated precedents in M.P. Sharma (1954) and Kharak Singh (1962).'
    ],
    sourceReference: 'Supreme Court of India (Nine-Judge Bench Judgment)'
  },
  {
    id: 'criminal-law-transition',
    year: '2023–2024',
    era: 'Historic Reform',
    title: 'The Great Criminal Law Transition (BNS, BNSS, BSA)',
    summary:
      'On July 1, 2024, India replaced three colonial-era criminal statutes dating back over 160 years—the Indian Penal Code, 1860, the Code of Criminal Procedure, 1973, and the Indian Evidence Act, 1872—with modern, citizen-centric legislation.',
    significance:
      'Introduced electronic summons, forensic mandates, Zero FIR across all police stations, audio-video recording during searches, and community service for petty offences.',
    keyActsOrMilestones: [
      'Bharatiya Nyaya Sanhita, 2023 (replaces Indian Penal Code).',
      'Bharatiya Nagarik Suraksha Sanhita, 2023 (replaces CrPC).',
      'Bharatiya Sakshya Adhiniyam, 2023 (replaces Indian Evidence Act).'
    ],
    sourceReference: 'Ministry of Home Affairs, Gazette of India Notification, July 1, 2024'
  }
];
