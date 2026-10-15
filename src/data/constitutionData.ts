import { ConstitutionArticle, ConstitutionPart } from '../types/legal';

export const CONSTITUTION_PARTS: ConstitutionPart[] = [
  { id: 'part-1', partNumber: 'Part I', title: 'The Union and its Territory', articleRange: 'Articles 1–4' },
  { id: 'part-2', partNumber: 'Part II', title: 'Citizenship', articleRange: 'Articles 5–11' },
  { id: 'part-3', partNumber: 'Part III', title: 'Fundamental Rights', articleRange: 'Articles 12–35' },
  { id: 'part-4', partNumber: 'Part IV', title: 'Directive Principles', articleRange: 'Articles 36–51' },
  { id: 'part-4a', partNumber: 'Part IV A', title: 'Fundamental Duties', articleRange: 'Article 51A' },
  { id: 'part-5', partNumber: 'Part V', title: 'The Union', articleRange: 'Articles 52–151' },
  { id: 'part-6', partNumber: 'Part VI', title: 'The States', articleRange: 'Articles 152–237' },
  { id: 'part-7', partNumber: 'Part VII', title: 'The High Courts', articleRange: 'Articles 214–231' },
  { id: 'part-8', partNumber: 'Part VIII', title: 'The Union Territories', articleRange: 'Articles 239–242' },
  { id: 'part-9', partNumber: 'Part IX', title: 'The Panchayats', articleRange: 'Articles 243–243O' }
];

export const CONSTITUTION_ARTICLES: ConstitutionArticle[] = [
  {
    articleNumber: '14',
    title: 'Equality before law',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    simpleExplanation:
      'Article 14 guarantees that every person within India—whether an Indian citizen or a foreign national—is equal in the eyes of the law. The government and police cannot arbitrarily treat one individual as superior or another as inferior. All laws must be applied fairly without unreasonable discrimination.',
    keyPrinciples: [
      'Applies to both citizens and non-citizens.',
      'Prohibits class legislation and arbitrary state action.',
      'Permits reasonable classification if founded on intelligible differentia and rational nexus.'
    ],
    historicalContext:
      'Drafted by the Constituent Assembly drawing inspiration from the concept of Rule of Law in the British Constitution and the Equal Protection clause of the 14th Amendment of the US Constitution.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['15', '16', '19', '21']
  },
  {
    articleNumber: '15',
    title: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      '(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.\n(2) No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to—\n(a) access to shops, public restaurants, hotels and places of public entertainment; or\n(b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public.',
    simpleExplanation:
      'No government authority or public facility may turn away or discriminate against any citizen solely because of their religion, caste, gender, race, or where they were born. The State may, however, make special affirmative provisions for women, children, and socially and educationally backward classes.',
    keyPrinciples: [
      'Protects against state discrimination and public social boycotts.',
      'Enables affirmative action and welfare measures for women and children.',
      'Secures equal access to public places.'
    ],
    historicalContext:
      'Designed to eradicate centuries-old caste segregation and historical gender discrimination across public utilities in India.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['14', '16', '17']
  },
  {
    articleNumber: '19',
    title: 'Protection of certain rights regarding freedom of speech, etc.',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      '(1) All citizens shall have the right—\n(a) to freedom of speech and expression;\n(b) to assemble peaceably and without arms;\n(c) to form associations or unions or co-operative societies;\n(d) to move freely throughout the territory of India;\n(e) to reside and settle in any part of the territory of India; and\n(g) to practise any profession, or to carry on any occupation, trade or business.',
    simpleExplanation:
      'Article 19 gives Indian citizens the core democratic freedoms: speech, peaceful protest without arms, forming groups/unions, free movement across India, residing anywhere in India, and practicing any lawful trade. These rights are subject to reasonable restrictions in the interest of national sovereignty, security, public order, decency, or morality.',
    keyPrinciples: [
      'Six fundamental democratic freedoms.',
      'Applies exclusively to Indian citizens.',
      'Subject to reasonable restrictions under clauses (2) to (6).'
    ],
    historicalContext:
      'Framed to ensure free democratic expression and mobility, contrasting sharply with colonial restrictions on press and assembly.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['20', '21', '22']
  },
  {
    articleNumber: '20',
    title: 'Protection in respect of conviction for offences',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      '(1) No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence.\n(2) No person shall be prosecuted and punished for the same offence more than once.\n(3) No person accused of any offence shall be compelled to be a witness against himself.',
    simpleExplanation:
      'Provides three crucial safeguards for anyone accused of a crime:\n1. Protection against retrospective criminal laws (ex-post facto laws).\n2. Protection against double jeopardy (cannot be punished twice for the exact same offence).\n3. Protection against self-incrimination (cannot be forced to confess or testify against oneself).',
    keyPrinciples: [
      'Inviolable even during a National Emergency under Article 359.',
      'Guarantees fair trial and police restraint from coercive confessions.',
      'Applies to citizens and non-citizens alike.'
    ],
    historicalContext:
      'Reinforced by the 44th Constitutional Amendment (1978) to ensure Articles 20 and 21 can never be suspended during an emergency.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['21', '22']
  },
  {
    articleNumber: '21',
    title: 'Protection of life and personal liberty',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    simpleExplanation:
      'Considered the heart and soul of the Constitution, Article 21 guarantees that nobody can take away your life or bodily freedom unless following a fair, just, and reasonable legal procedure. The Supreme Court has expanded this to include the right to privacy (Puttaswamy judgment), clean air and water, medical care, livelihood, dignity, and speedy trial.',
    keyPrinciples: [
      'Cannot be suspended under any circumstances, even during emergency.',
      'Includes right to privacy, dignified life, and free legal aid.',
      'Applies universally to all human beings within India.'
    ],
    historicalContext:
      'Transformed through landmark judgments including Maneka Gandhi (1978) and K.S. Puttaswamy (2017 Right to Privacy).',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['14', '19', '21A', '22', '32']
  },
  {
    articleNumber: '21A',
    title: 'Right to education',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
    simpleExplanation:
      'Every child between 6 and 14 years in India has an enforceable fundamental right to free schooling. The government is legally required to ensure school availability and attendance.',
    keyPrinciples: [
      'Targeted for children between 6 to 14 years.',
      'Enacted through the 86th Constitutional Amendment Act, 2002.',
      'Operationalized by the Right of Children to Free and Compulsory Education Act (RTE), 2009.'
    ],
    historicalContext:
      'Inserted by the 86th Amendment Act in 2002 to turn the Directive Principle of Article 45 into an enforceable fundamental right.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['21', '45', '51A']
  },
  {
    articleNumber: '22',
    title: 'Protection against arrest and detention in certain cases',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      '(1) No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice.\n(2) Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate.',
    simpleExplanation:
      'If police arrest you, you must be informed why you are being arrested, you have the right to consult a lawyer of your choice, and you MUST be presented before a Judicial Magistrate within 24 hours. Police cannot keep anyone in illegal lockup.',
    keyPrinciples: [
      'Mandatory 24-hour magistrate production rule.',
      'Right to legal representation and legal advice.',
      'D.K. Basu arrest guidelines originate directly from this constitutional foundation.'
    ],
    historicalContext:
      'Enacted to protect against arbitrary police detention and colonial-era executive arrests.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['20', '21', '32']
  },
  {
    articleNumber: '32',
    title: 'Remedies for enforcement of rights conferred by this Part',
    part: 'Part III',
    partTitle: 'Fundamental Rights',
    originalText:
      '(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.\n(2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part.',
    simpleExplanation:
      'Described by Dr. B.R. Ambedkar as the "heart and very soul" of the Constitution, Article 32 gives you direct access to the Supreme Court of India if any of your Fundamental Rights are infringed. The Court can issue 5 types of constitutional writs to strike down state oppression.',
    keyPrinciples: [
      'Writs: Habeas Corpus (release illegal detainee), Mandamus (compel public duty), Prohibition (halt lower court excess), Quo Warranto (challenge illegal public office holder), Certiorari (quash unlawful orders).',
      'The right to approach the Supreme Court is itself a Fundamental Right.'
    ],
    historicalContext:
      'Dr. B.R. Ambedkar famously remarked: "If I was asked to name any particular Article in this Constitution as the most important... I could not refer to any other Article except this one."',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['226', '14', '21']
  },
  {
    articleNumber: '39A',
    title: 'Equal justice and free legal aid',
    part: 'Part IV',
    partTitle: 'Directive Principles',
    originalText:
      'The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.',
    simpleExplanation:
      'Directs the State to ensure justice is accessible to all, not just the wealthy. It is the constitutional foundation for free legal aid in India, giving birth to the National Legal Services Authority (NALSA) and Lok Adalats.',
    keyPrinciples: [
      'State duty to provide free legal assistance to underprivileged citizens.',
      'Direct statutory mandate behind the Legal Services Authorities Act, 1987 (NALSA / DLSA).',
      'Ensures no citizen is denied justice solely due to poverty.'
    ],
    historicalContext:
      'Added by the 42nd Constitutional Amendment in 1976 under the influence of Justices V.R. Krishna Iyer and P.N. Bhagwati.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['14', '21', '32']
  },
  {
    articleNumber: '51A',
    title: 'Fundamental duties',
    part: 'Part IV A',
    partTitle: 'Fundamental Duties',
    originalText:
      'It shall be the duty of every citizen of India—\n(a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem;\n(b) to cherish and follow the noble ideals which inspired our national struggle for freedom;\n(c) to uphold and protect the sovereignty, unity and integrity of India;\n(e) to promote harmony and the spirit of common brotherhood;\n(g) to protect and improve the natural environment including forests, lakes, rivers and wild life;\n(h) to develop the scientific temper, humanism and the spirit of inquiry and reform;\n(k) who is a parent or guardian to provide opportunities for education to his child between the age of six and fourteen years.',
    simpleExplanation:
      'Sets out the moral and civic obligations of Indian citizens toward the nation, including respecting the National Flag, promoting communal brotherhood, protecting the environment, developing a scientific temper, and ensuring children attend school.',
    keyPrinciples: [
      '11 Fundamental Duties in total.',
      'Duty (k) added by 86th Amendment to complement Article 21A (Right to Education).',
      'Acts as a constant civic reminder alongside Fundamental Rights.'
    ],
    historicalContext:
      'Recommended by the Swaran Singh Committee and inserted into the Constitution by the 42nd Amendment in 1976.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['21A', '48A']
  },
  {
    articleNumber: '226',
    title: 'Power of High Courts to issue certain writs',
    part: 'Part VI',
    partTitle: 'The High Courts',
    originalText:
      '(1) Notwithstanding anything in article 32, every High Court shall have power, throughout the territories in relation to which it exercises jurisdiction, to issue to any person or authority, including in appropriate cases, any Government, within those territories directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, or any of them, for the enforcement of any of the rights conferred by Part III and for any other purpose.',
    simpleExplanation:
      'Empowers High Courts across Indian states to issue constitutional writs. Importantly, the High Court’s power under Article 226 is even broader than the Supreme Court’s under Article 32, because High Courts can issue writs for Fundamental Rights AND "for any other legal purpose" (such as administrative overreach or statutory violations).',
    keyPrinciples: [
      'Wider scope than Article 32 (enforces Fundamental Rights + ordinary legal rights).',
      'Discretionary extraordinary jurisdiction.',
      'Primary forum for citizen redressal against state or municipal excesses.'
    ],
    historicalContext:
      'Framed to provide immediate, accessible constitutional remedies within each State before citizens need to travel to the Supreme Court in New Delhi.',
    officialSourceUrl: 'https://legislative.gov.in/constitution-of-india/',
    relatedArticles: ['32', '227', '21']
  }
];
