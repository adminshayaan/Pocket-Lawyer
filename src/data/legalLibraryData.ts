import { LegalCategory } from '../types/legal';

export const LEGAL_CATEGORIES: LegalCategory[] = [
  {
    id: 'criminal-law',
    name: 'Criminal Law',
    shortDescription: 'Theft, assault, fraud, offences under Bharatiya Nyaya Sanhita (BNS) 2023, and procedure under BNSS.',
    iconName: 'ShieldAlert',
    isPriority: true,
    topics: [
      {
        id: 'theft-property-offences',
        categoryId: 'criminal-law',
        title: 'Theft and Related Property Offences',
        summary: 'Dishonest taking of movable property without consent, extortion, and robbery under the Bharatiya Nyaya Sanhita, 2023.',
        plainLanguageExplanation:
          'Under Indian law, theft occurs when someone intends to take any movable property dishonestly out of someone else’s possession without consent. From July 1, 2024, the Bharatiya Nyaya Sanhita (BNS), 2023 governs offences previously covered under Section 378/379 of the Indian Penal Code. Community service has also been introduced as a punishment for petty theft under certain circumstances.',
        whenRelevant: [
          'When someone steals personal belongings, cash, electronics, or vehicles.',
          'When stolen property is found in someone else’s possession.',
          'When an individual is accused of taking or withholding property unlawfully.'
        ],
        applicableSections: [
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 303',
            description: 'Defines and punishes theft. Imprisonment up to 3 years, or fine, or both. For petty theft of value less than ₹5,000 where stolen property is returned, community service may be ordered for first-time offenders.',
            penaltyOrRemedy: 'Imprisonment up to 3 years or fine, or community service for petty first offence.'
          },
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 305',
            description: 'Theft in a dwelling house, building, or vessel used as human dwelling.',
            penaltyOrRemedy: 'Imprisonment up to 7 years and fine.'
          },
          {
            act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
            section: 'Section 173',
            description: 'Information in cognizable cases (First Information Report - FIR). Mandates registration of FIR including Zero FIR regardless of territorial jurisdiction.',
            penaltyOrRemedy: 'Right to obtain free copy of FIR immediately.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can I lodge an FIR at any police station if my phone is stolen?',
            answer: 'Yes. Under Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, any police station must register a Zero FIR if an offence is disclosed, and transfer it to the jurisdictional police station.'
          },
          {
            question: 'What is the old IPC equivalent for theft?',
            answer: 'Sections 378 and 379 of the Indian Penal Code, 1860. For offences committed on or after July 1, 2024, BNS Section 303 applies.'
          }
        ],
        suggestedNextSteps: [
          'File an e-FIR or visit the nearest police station immediately.',
          'Collect proof of ownership (invoices, IMEI numbers, purchase receipts).',
          'Ensure you receive an acknowledgment or stamped copy of the FIR without paying any fee.'
        ],
        officialSources: [
          {
            title: 'Bharatiya Nyaya Sanhita, 2023 - Official Gazette Notification',
            actName: 'Bharatiya Nyaya Sanhita, 2023',
            sectionOrArticle: 'Section 303, Section 305',
            excerpt: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person’s consent, moves that property in order to such taking, is said to commit theft.',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-07-01'
          }
        ],
        relatedTopicIds: ['cheating-and-fraud', 'police-interaction-rights']
      },
      {
        id: 'assault-criminal-intimidation',
        categoryId: 'criminal-law',
        title: 'Assault and Criminal Intimidation',
        summary: 'Physical gestures causing apprehension of force, hurt, and threats to person, reputation, or property.',
        plainLanguageExplanation:
          'Assault under Indian law is an act or gesture creating a reasonable apprehension that criminal force is about to be used against a person. Criminal intimidation involves threatening someone with injury to their person, reputation, or property with an intent to cause alarm or force them to do or omit an act.',
        whenRelevant: [
          'When someone threatens you with violence, bodily harm, or damage to property.',
          'When an altercation involves threats or aggressive physical gestures.',
          'When someone uses intimidating language to coerce a financial or personal decision.'
        ],
        applicableSections: [
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 130 - 132',
            description: 'Assault or criminal force otherwise than on grave provocation.',
            penaltyOrRemedy: 'Imprisonment up to 3 months or fine, or both.'
          },
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 351',
            description: 'Criminal Intimidation. Threatening another with injury to their person, reputation or property.',
            penaltyOrRemedy: 'Imprisonment up to 2 years, or with fine, or both. If threat is of death/grievous hurt, up to 7 years.'
          },
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 115',
            description: 'Voluntarily causing hurt. Punishment includes imprisonment up to 1 year, or fine up to ₹10,000, or both.',
            penaltyOrRemedy: 'Imprisonment up to 1 year or fine.'
          }
        ],
        commonQuestions: [
          {
            question: 'Is a verbal threat alone considered a crime?',
            answer: 'Yes, if the threat causes alarm and was intended to coerce or intimidate the victim, it can constitute Criminal Intimidation under Section 351 of BNS 2023.'
          }
        ],
        suggestedNextSteps: [
          'Preserve all communications (call recordings, WhatsApp messages, emails, CCTV footage).',
          'In case of physical contact or injury, undergo medical examination at a government hospital to obtain a Medico-Legal Certificate (MLC).',
          'Lodge a formal complaint or seek police protection if there is imminent danger.'
        ],
        officialSources: [
          {
            title: 'Bharatiya Nyaya Sanhita, 2023',
            actName: 'BNS 2023',
            sectionOrArticle: 'Section 115, 351',
            excerpt: 'Whoever threatens another with any injury to his person, reputation or property, or to the person or reputation of any one in whom that person is interested...',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-07-01'
          }
        ],
        relatedTopicIds: ['theft-property-offences', 'police-interaction-rights']
      },
      {
        id: 'cheating-and-fraud',
        categoryId: 'criminal-law',
        title: 'Cheating and Fraud',
        summary: 'Deception leading to dishonest delivery of property or intentional inducement causing damage.',
        plainLanguageExplanation:
          'Cheating involves deceiving someone fraudulently or dishonestly to induce them to deliver property or consent to the retention of property. Section 318 of BNS, 2023 replaces the classical Section 415/420 of the IPC.',
        whenRelevant: [
          'When fake investment schemes or Ponzi plans take money under false promises.',
          'When someone sells mortgaged or non-existent property.',
          'When false identity or dishonest promises are made to induce financial transactions.'
        ],
        applicableSections: [
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 318',
            description: 'Cheating and dishonestly inducing delivery of property (replaces IPC 420).',
            penaltyOrRemedy: 'Imprisonment up to 7 years and fine.'
          },
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 319',
            description: 'Cheating by personation (pretending to be someone else or another entity).',
            penaltyOrRemedy: 'Imprisonment up to 5 years, or with fine, or both.'
          }
        ],
        commonQuestions: [
          {
            question: 'What is the difference between a breach of contract and criminal cheating?',
            answer: 'Mere failure to fulfill a promise is civil breach. Cheating requires proving fraudulent or dishonest intention right from the inception of the transaction.'
          }
        ],
        suggestedNextSteps: [
          'Gather transaction records, bank statements, contracts, and written communications.',
          'Issue a formal legal notice seeking resolution before lodging an FIR.',
          'File a complaint under BNS Section 318 with the economic offences wing or local police station.'
        ],
        officialSources: [
          {
            title: 'Bharatiya Nyaya Sanhita, 2023',
            actName: 'BNS 2023',
            sectionOrArticle: 'Section 318, 319',
            excerpt: 'Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property...',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-07-01'
          }
        ],
        relatedTopicIds: ['online-financial-fraud', 'theft-property-offences']
      }
    ]
  },
  {
    id: 'cyber-law',
    name: 'Cyber Law',
    shortDescription: 'Online financial scams, digital identity theft, hacking, cyberstalking, and the IT Act 2000.',
    iconName: 'Laptop',
    isPriority: true,
    topics: [
      {
        id: 'online-financial-fraud',
        categoryId: 'cyber-law',
        title: 'Online Financial Fraud',
        summary: 'UPI scams, phishing, unauthorized debit/credit card charges, and fraudulent payment gateways.',
        plainLanguageExplanation:
          'Online financial fraud occurs when perpetrators use deception, malicious links, fake customer care numbers, OTP theft, or remote desktop apps to siphon funds. Both the Information Technology Act, 2000 and the Bharatiya Nyaya Sanhita, 2023 apply. The Government of India operates the National Cyber Crime Reporting Portal (cybercrime.gov.in) and the 1930 emergency financial helpline.',
        whenRelevant: [
          'When unauthorized transactions occur via UPI, NetBanking, or Credit/Debit Cards.',
          'When tricked into entering a UPI PIN on a "receive money" request.',
          'When victim of investment scam groups on WhatsApp or Telegram.'
        ],
        applicableSections: [
          {
            act: 'Information Technology Act, 2000',
            section: 'Section 66D',
            description: 'Punishment for cheating by personation by using computer resource.',
            penaltyOrRemedy: 'Imprisonment up to 3 years and fine up to ₹1,00,000.'
          },
          {
            act: 'Information Technology Act, 2000',
            section: 'Section 43 & 66',
            description: 'Penalty and compensation for damage to computer system, unauthorized data download, hacking.',
            penaltyOrRemedy: 'Civil compensation up to ₹1 crore plus criminal penalty up to 3 years.'
          },
          {
            act: 'RBI Master Directions on Customer Protection',
            section: 'Zero Liability Policy',
            description: 'Customer has zero liability if fraud is notified within 3 working days of unauthorized electronic banking transaction.',
            penaltyOrRemedy: 'Full bank refund within 10 days of notification.'
          }
        ],
        commonQuestions: [
          {
            question: 'What is the "Golden Hour" in cyber financial fraud?',
            answer: 'Calling the 1930 helpline within 2 to 3 hours allows the Citizen Financial Cyber Fraud Reporting System to freeze the fraudulent funds before the scammer withdraws them at an ATM.'
          },
          {
            question: 'Will my bank compensate me if I was tricked into sharing an OTP?',
            answer: 'Under RBI guidelines, if the customer shared the OTP, liability is with the customer until reported. However, once reported, all subsequent transactions are the bank’s responsibility.'
          }
        ],
        suggestedNextSteps: [
          'Immediately call 1930 (Citizen Financial Cyber Fraud Helpline).',
          'Block cards and freeze digital banking access via netbanking or official bank helpline.',
          'Lodge a complaint on cybercrime.gov.in and download the acknowledgment number.'
        ],
        officialSources: [
          {
            title: 'National Cyber Crime Reporting Portal (MHA)',
            actName: 'IT Act, 2000 & MHA Guidelines',
            sectionOrArticle: 'Section 66D',
            excerpt: 'Whoever, by means for any communication device or computer resource cheats by personating, shall be punished...',
            url: 'https://cybercrime.gov.in',
            verified: true,
            lastReviewed: '2024-05-10'
          }
        ],
        relatedTopicIds: ['identity-theft-impersonation', 'cheating-and-fraud']
      },
      {
        id: 'identity-theft-impersonation',
        categoryId: 'cyber-law',
        title: 'Identity Theft and Online Impersonation',
        summary: 'Fraudulent creation of fake social media profiles, stealing digital signatures, passwords, and Aadhaar/PAN misrepresentation.',
        plainLanguageExplanation:
          'Identity theft happens when an attacker fraudulently uses someone else’s electronic signature, password, photograph, or biometric identity to impersonate them or commit fraud.',
        whenRelevant: [
          'When fake Instagram, LinkedIn, or Facebook accounts impersonate you.',
          'When someone uses your PAN or Aadhaar card to obtain loans or SIM cards without your authorization.'
        ],
        applicableSections: [
          {
            act: 'Information Technology Act, 2000',
            section: 'Section 66C',
            description: 'Punishment for identity theft. Using electronic signature, password or other unique identification feature of another person.',
            penaltyOrRemedy: 'Imprisonment up to 3 years and fine up to ₹1,00,000.'
          }
        ],
        commonQuestions: [
          {
            question: 'How do I take down a fake social media profile?',
            answer: 'Report it directly to the platform using their impersonation form. If non-responsive within 24-36 hours, file a complaint on cybercrime.gov.in and escalate to the Grievance Redressal Officer.'
          }
        ],
        suggestedNextSteps: [
          'Take screenshots and record the exact URL / profile handle before it changes.',
          'Submit a formal complaint to the intermediary platform Grievance Officer.',
          'Report on cybercrime.gov.in under Section 66C of the IT Act.'
        ],
        officialSources: [
          {
            title: 'Information Technology Act, 2000',
            actName: 'IT Act, 2000',
            sectionOrArticle: 'Section 66C',
            excerpt: 'Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person...',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-01-15'
          }
        ],
        relatedTopicIds: ['online-financial-fraud', 'cyberstalking-harassment']
      },
      {
        id: 'cyberstalking-harassment',
        categoryId: 'cyber-law',
        title: 'Cyberstalking, Harassment and Abusive Conduct',
        summary: 'Persistent unwanted online tracking, vulgar messages, blackmail, and unauthorized sharing of intimate pictures.',
        plainLanguageExplanation:
          'Cyberstalking involves repeatedly monitoring or contacting someone online despite disinterest, creating distress or fear. Circulating explicit media without consent or threatening defamation is severely penalized under both the IT Act and Bharatiya Nyaya Sanhita.',
        whenRelevant: [
          'When an individual sends threatening, obscene, or continuous unsolicited messages.',
          'When intimate media is threatened to be posted online (revenge porn / sextortion).'
        ],
        applicableSections: [
          {
            act: 'Bharatiya Nyaya Sanhita, 2023',
            section: 'Section 78',
            description: 'Stalking (including electronic monitoring of email, internet, or electronic communication).',
            penaltyOrRemedy: 'Imprisonment up to 3 years for first conviction; up to 5 years for repeat conviction.'
          },
          {
            act: 'Information Technology Act, 2000',
            section: 'Section 66E',
            description: 'Violation of privacy by intentionally capturing or transmitting images of private area without consent.',
            penaltyOrRemedy: 'Imprisonment up to 3 years or fine up to ₹2,00,000.'
          },
          {
            act: 'Information Technology Act, 2000',
            section: 'Section 67 & 67A',
            description: 'Publishing or transmitting obscene or sexually explicit material in electronic form.',
            penaltyOrRemedy: 'Imprisonment up to 5 years and fine up to ₹10,00,000 for first conviction.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can women report cyber harassment anonymously?',
            answer: 'Yes, on cybercrime.gov.in, complaints under "Crime Against Women and Children" can be filed anonymously or with confidential status.'
          }
        ],
        suggestedNextSteps: [
          'Do NOT delete chats, emails, or call logs; preserve complete headers and timestamps.',
          'File an urgent report on cybercrime.gov.in.',
          'Use national emergency helpline 112 or Women Helpline 1091 if there is threat to physical safety.'
        ],
        officialSources: [
          {
            title: 'Information Technology Act, 2000',
            actName: 'IT Act, 2000',
            sectionOrArticle: 'Section 66E, 67A',
            excerpt: 'Whoever intentionally or knowingly captures, publishes or transmits the image of a private area of any person without his or her consent...',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-03-20'
          }
        ],
        relatedTopicIds: ['identity-theft-impersonation', 'theft-property-offences']
      }
    ]
  },
  {
    id: 'juvenile-child-protection',
    name: 'Juvenile & Child Protection',
    shortDescription: 'Children in conflict with law, care & protection, POCSO Act 2012, and Juvenile Justice Act 2015.',
    iconName: 'UserCheck',
    isPriority: true,
    topics: [
      {
        id: 'children-conflict-with-law',
        categoryId: 'juvenile-child-protection',
        title: 'Children in Conflict with the Law',
        summary: 'Procedures when a minor (below 18) is alleged to have committed an offence under the JJ Act, 2015.',
        plainLanguageExplanation:
          'Indian law treats juveniles (persons below 18 years) with reformatory rather than punitive measures. No child in conflict with law may be placed in a police lockup or ordinary prison. The Juvenile Justice Board (JJB) handles all inquiries, and the child must be produced before the Board within 24 hours. The identity of the child is protected by law.',
        whenRelevant: [
          'When a person below 18 years is accused of an offence.',
          'When police apprehend a minor without a Special Juvenile Police Officer (SJPO).'
        ],
        applicableSections: [
          {
            act: 'Juvenile Justice (Care and Protection of Children) Act, 2015',
            section: 'Section 10 & 12',
            description: 'Apprehension and bail of child alleged to be in conflict with law. Mandatory bail unless release brings child into association with known criminals.',
            penaltyOrRemedy: 'Cannot be kept in police lockup or jail; must be placed in an Observation Home.'
          },
          {
            act: 'Juvenile Justice Act, 2015',
            section: 'Section 74',
            description: 'Prohibition on disclosure of identity of children in conflict with law or victims in media or public records.',
            penaltyOrRemedy: 'Imprisonment up to 6 months or fine up to ₹2,00,000 for disclosing identity.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can a minor be tried as an adult in India?',
            answer: 'Under Section 15 of the JJ Act, 2015, if a child between 16 and 18 commits a heinous offence (punishable with 7+ years), the JJB conducts a preliminary assessment regarding mental and physical capacity before deciding whether to transfer the case to Children’s Court.'
          }
        ],
        suggestedNextSteps: [
          'Verify birth certificate or school matriculation certificate to establish age.',
          'Contact the District Legal Services Authority (DLSA) for a free legal-aid child counsel.',
          'Ensure only plain-clothed Special Juvenile Police Officers handle the child.'
        ],
        officialSources: [
          {
            title: 'Juvenile Justice Act, 2015',
            actName: 'JJ Act, 2015',
            sectionOrArticle: 'Section 10, 12, 74',
            excerpt: 'In no case, a child alleged to be in conflict with law shall be placed in a police lockup or lodged in a jail.',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-02-14'
          }
        ],
        relatedTopicIds: ['child-sexual-offences-pocso', 'children-need-of-care']
      },
      {
        id: 'child-sexual-offences-pocso',
        categoryId: 'juvenile-child-protection',
        title: 'Child Protection from Sexual Offences (POCSO)',
        summary: 'Stringent protections against penetrative and non-penetrative sexual assault, harassment, and mandatory reporting.',
        plainLanguageExplanation:
          'The Protection of Children from Sexual Offences (POCSO) Act, 2012 provides gender-neutral, child-friendly mechanisms for investigating and trying sexual offences against individuals under 18. Mandatory reporting applies to every citizen, doctor, teacher, or hospital having knowledge of such offences.',
        whenRelevant: [
          'Any sexual contact, assault, harassment, or exploitation involving a person under 18 years of age.'
        ],
        applicableSections: [
          {
            act: 'Protection of Children from Sexual Offences Act, 2012',
            section: 'Section 3 - 6',
            description: 'Penetrative and aggravated penetrative sexual assault.',
            penaltyOrRemedy: 'Rigorous imprisonment for 20 years up to life imprisonment or death.'
          },
          {
            act: 'Protection of Children from Sexual Offences Act, 2012',
            section: 'Section 19',
            description: 'Mandatory reporting of offences. Failure to report by any person or institution is punishable.',
            penaltyOrRemedy: 'Imprisonment up to 6 months or fine or both.'
          }
        ],
        commonQuestions: [
          {
            question: 'Is parental consent an excuse for child marriage or non-reporting under POCSO?',
            answer: 'No. The Supreme Court has affirmed that child sexual relations cannot be legitimized by marriage or parental consent; POCSO overrides personal laws.'
          }
        ],
        suggestedNextSteps: [
          'Call Childline at 1098 or Emergency 112 immediately.',
          'Ensure the child is supported by a child psychologist or registered counselor.',
          'No FIR or media report may reveal the child’s name, school, address, or picture.'
        ],
        officialSources: [
          {
            title: 'POCSO Act, 2012 - Ministry of Women and Child Development',
            actName: 'POCSO Act, 2012',
            sectionOrArticle: 'Section 19, Section 33',
            excerpt: 'Any person who has apprehension that an offence under this Act has been committed shall provide information to Special Juvenile Police Unit...',
            url: 'https://wcd.nic.in',
            verified: true,
            lastReviewed: '2024-03-01'
          }
        ],
        relatedTopicIds: ['children-conflict-with-law']
      }
    ]
  },
  {
    id: 'constitutional-law',
    name: 'Constitutional Law',
    shortDescription: 'Fundamental Rights, Directive Principles, Fundamental Duties, and Writs under Article 32 & 226.',
    iconName: 'BookOpen',
    topics: [
      {
        id: 'fundamental-rights-remedies',
        categoryId: 'constitutional-law',
        title: 'Fundamental Rights and Constitutional Remedies',
        summary: 'Enforcement of rights to equality, freedom, personal liberty, and writ petitions in High Courts and Supreme Court.',
        plainLanguageExplanation:
          'Part III of the Constitution guarantees basic human rights against State violation. Article 32 (Supreme Court) and Article 226 (High Courts) empower citizens to file Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari writs.',
        whenRelevant: [
          'Illegal police detention without production before Magistrate within 24 hours.',
          'Arbitrary discrimination or cancellation of government licenses/benefits.'
        ],
        applicableSections: [
          {
            act: 'Constitution of India',
            section: 'Article 21',
            description: 'Protection of life and personal liberty except according to procedure established by law.',
            penaltyOrRemedy: 'Inviolable fundamental right.'
          },
          {
            act: 'Constitution of India',
            section: 'Article 32',
            description: 'Right to move Supreme Court for enforcement of Part III rights.',
            penaltyOrRemedy: 'Issuance of constitutional writs.'
          }
        ],
        commonQuestions: [
          {
            question: 'What is a Habeas Corpus petition?',
            answer: 'A Latin term meaning "produce the body". It is filed to direct police or authorities to bring an illegally detained person before the court immediately.'
          }
        ],
        suggestedNextSteps: [
          'Engage an advocate to draft a Writ Petition under Article 226 before the state High Court or Article 32 before the Supreme Court.',
          'Approach Legal Services Authority if unable to afford counsel.'
        ],
        officialSources: [
          {
            title: 'Constitution of India - Legislative Department',
            actName: 'Constitution of India',
            sectionOrArticle: 'Article 21, 32',
            excerpt: 'The Supreme Court shall have power to issue directions or orders or writs...',
            url: 'https://legislative.gov.in/constitution-of-india/',
            verified: true,
            lastReviewed: '2024-01-01'
          }
        ],
        relatedTopicIds: ['police-interaction-rights']
      }
    ]
  },
  {
    id: 'traffic-motor-vehicle',
    name: 'Traffic & Motor Vehicle Law',
    shortDescription: 'Driving licence requirements, e-challans, DigiLocker validity, and roadside rights with traffic police.',
    iconName: 'Car',
    topics: [
      {
        id: 'traffic-police-document-rights',
        categoryId: 'traffic-motor-vehicle',
        title: 'Driving Licence & Vehicle Document Requirements',
        summary: 'What traffic police can ask for, electronic document validity via DigiLocker / mParivahan, and challan rules.',
        plainLanguageExplanation:
          'Under Section 130 of the Motor Vehicles Act, 1988, a driver must produce their driving licence, registration certificate (RC), insurance, and PUC certificate upon demand by a police officer in uniform. Rule 139 of the Central Motor Vehicles Rules explicitly validates electronic copies presented via DigiLocker or mParivahan apps as equivalent to physical originals.',
        whenRelevant: [
          'When stopped by traffic police at a checkpoint.',
          'When an officer insists on physical documents despite having verified digital copies on DigiLocker.'
        ],
        applicableSections: [
          {
            act: 'Motor Vehicles Act, 1988 (as amended 2019)',
            section: 'Section 130',
            description: 'Duty to produce licence and certificate of registration.',
            penaltyOrRemedy: 'Requirement to present documents upon demand by uniform officer.'
          },
          {
            act: 'Central Motor Vehicles Rules, 1989',
            section: 'Rule 139',
            description: 'Production of driving licence and certificate of registration in electronic form on DigiLocker / mParivahan.',
            penaltyOrRemedy: 'Police cannot reject valid DigiLocker documents.'
          },
          {
            act: 'Motor Vehicles Act, 1988',
            section: 'Section 177 & 179',
            description: 'General penalty for offences and disobedience of police directions.',
            penaltyOrRemedy: 'Official e-challan with prescribed state fines.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can a traffic constable confiscate your car key or physically assault you?',
            answer: 'No. Taking keys out of ignition or using physical violence is unlawful. Only officers of the rank of Sub-Inspector or above can issue challans above prescribed limits.'
          },
          {
            question: 'Is a DigiLocker copy legally valid if the officer demands the physical card?',
            answer: 'Yes. Ministry of Road Transport and Highways (MoRTH) notifications clarify that electronic documents on DigiLocker/mParivahan carry statutory validity under Rule 139 of CMVR.'
          }
        ],
        suggestedNextSteps: [
          'Keep DigiLocker setup with your driving licence, RC, insurance, and PUC synced.',
          'Ask for the officer’s name and badge number politely if there is a dispute.',
          'Pay challans only through the official parivahan.gov.in e-challan gateway.'
        ],
        officialSources: [
          {
            title: 'MoRTH Notification - Digital Documents Acceptance',
            actName: 'Motor Vehicles Act, 1988 & CMVR Rule 139',
            sectionOrArticle: 'Section 130, Rule 139',
            excerpt: 'Electronic documents maintained in DigiLocker or mParivahan shall be treated at par with original physical documents.',
            url: 'https://morth.nic.in',
            verified: true,
            lastReviewed: '2023-11-15'
          }
        ],
        relatedTopicIds: ['police-interaction-rights']
      }
    ]
  },
  {
    id: 'womens-rights',
    name: "Women's Rights",
    shortDescription: 'Protection of Women from Domestic Violence Act 2005, POSH Act 2013, and zero FIR provisions.',
    iconName: 'HeartHandshake',
    topics: [
      {
        id: 'domestic-violence-protection',
        categoryId: 'womens-rights',
        title: 'Domestic Violence Protections (PWDVA 2005)',
        summary: 'Civil remedies, protection orders, right to reside in shared household, and monetary relief.',
        plainLanguageExplanation:
          'The Protection of Women from Domestic Violence Act, 2005 provides prompt civil remedies for women facing physical, sexual, emotional, verbal, or economic abuse within a shared household. The Magistrate can pass residence orders, maintenance orders, and protection orders.',
        whenRelevant: [
          'Abuse by husband or relatives in a domestic relationship.',
          'Threat of unlawful eviction from matrimonial or shared home.'
        ],
        applicableSections: [
          {
            act: 'Protection of Women from Domestic Violence Act, 2005',
            section: 'Section 12, 18, 19',
            description: 'Application to Magistrate for protection orders, residence orders prohibiting eviction.',
            penaltyOrRemedy: 'Breach of protection order is a non-bailable criminal offence under Section 31.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can a woman be evicted from her matrimonial home during a dispute?',
            answer: 'No. Section 19 provides the right to reside in the shared household regardless of whether she holds legal title.'
          }
        ],
        suggestedNextSteps: [
          'Contact the Protection Officer of your district or Women Helpline 181.',
          'File an application under Section 12 before the Judicial Magistrate.'
        ],
        officialSources: [
          {
            title: 'PWDVA, 2005 - Official Text',
            actName: 'PWDVA 2005',
            sectionOrArticle: 'Section 12, 18',
            excerpt: 'An aggrieved person or a Protection Officer may present an application to the Magistrate seeking one or more reliefs under this Act.',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-01-01'
          }
        ],
        relatedTopicIds: ['fundamental-rights-remedies']
      }
    ]
  },
  {
    id: 'consumer-rights',
    name: 'Consumer Rights',
    shortDescription: 'Defective products, deficiency in services, misleading ads, and e-Daakhil filing under CPA 2019.',
    iconName: 'ShoppingBag',
    topics: [
      {
        id: 'defective-products-deficiency',
        categoryId: 'consumer-rights',
        title: 'Defective Products and Deficiency in Service',
        summary: 'Remedies for substandard goods, e-commerce refund failures, and complaints before Consumer Commissions.',
        plainLanguageExplanation:
          'The Consumer Protection Act, 2019 protects consumers against unfair trade practices, misleading advertisements, and deficiencies in goods or services. Complaints can be filed online via the e-Daakhil portal (edaakhil.nic.in).',
        whenRelevant: [
          'When an e-commerce platform refuses return or refund for a damaged or wrong product.',
          'When an airline, hotel, or telecom provider fails to provide promised service.'
        ],
        applicableSections: [
          {
            act: 'Consumer Protection Act, 2019',
            section: 'Section 35',
            description: 'Manner in which complaint shall be made to District Commission.',
            penaltyOrRemedy: 'Refund of price, compensation for harassment, replacement of goods.'
          }
        ],
        commonQuestions: [
          {
            question: 'Do I need an advocate to file a consumer complaint?',
            answer: 'No. Any consumer can draft and submit their own complaint in simple language on edaakhil.nic.in without paying heavy legal fees.'
          }
        ],
        suggestedNextSteps: [
          'Send a formal grievance notice via email to the company customer care.',
          'File an online complaint on National Consumer Helpline (consumerhelpline.gov.in / 1915).',
          'Lodge a formal case on edaakhil.nic.in if unaddressed.'
        ],
        officialSources: [
          {
            title: 'Consumer Protection Act, 2019',
            actName: 'CPA 2019',
            sectionOrArticle: 'Section 35',
            excerpt: 'A complaint, in relation to any goods sold or delivered or agreed to be sold or delivered or any service provided...',
            url: 'https://consumeraffairs.nic.in',
            verified: true,
            lastReviewed: '2024-02-01'
          }
        ],
        relatedTopicIds: ['online-financial-fraud']
      }
    ]
  },
  {
    id: 'human-rights-police',
    name: 'Human Rights & Police Procedures',
    shortDescription: 'Rights during arrest, D.K. Basu guidelines, bail rights, and Zero FIR provisions under BNSS 2023.',
    iconName: 'Scale',
    topics: [
      {
        id: 'police-interaction-rights',
        categoryId: 'human-rights-police',
        title: 'Rights During Police Interactions and Arrest',
        summary: 'Constitutional and statutory rights during questioning, detention, search, and production before Magistrate.',
        plainLanguageExplanation:
          'Under Indian law and Supreme Court rulings (D.K. Basu guidelines), any person detained or arrested has concrete rights: right to know grounds of arrest, right to meet an advocate, right to notify a family member, right to medical examination, and mandatory production before a Magistrate within 24 hours.',
        whenRelevant: [
          'When summoned to a police station or placed under arrest.',
          'When police conduct a search or seize electronic devices.'
        ],
        applicableSections: [
          {
            act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
            section: 'Section 35',
            description: 'Prior notice of appearance before police officer for offences punishable with imprisonment up to 7 years (formerly CrPC 41A). Arrest cannot be made routinely.',
            penaltyOrRemedy: 'Arrest requires written recorded reasons.'
          },
          {
            act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
            section: 'Section 47 & 53',
            description: 'Right of arrested person to have friend/relative informed and mandatory medical examination.',
            penaltyOrRemedy: 'Statutory mandate on arresting officer.'
          },
          {
            act: 'Constitution of India',
            section: 'Article 22(2)',
            description: 'Arrested person must be produced before nearest magistrate within 24 hours excluding travel time.',
            penaltyOrRemedy: 'Detention beyond 24 hours without magistrate order is unconstitutional.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can police arrest a woman at night?',
            answer: 'Under Section 43(5) of the BNSS 2023, save in exceptional circumstances and with prior permission of a Judicial Magistrate, no woman shall be arrested after sunset and before sunrise.'
          }
        ],
        suggestedNextSteps: [
          'Ask for the formal Notice of Appearance under Section 35 BNSS if not an arrest.',
          'Exercise right to inform a family member or advocate immediately.',
          'Insist on recording all injuries in the arrest memo and medical examination report.'
        ],
        officialSources: [
          {
            title: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
            actName: 'BNSS 2023',
            sectionOrArticle: 'Section 35, 47, 53',
            excerpt: 'The police officer shall, within twenty-four hours of such arrest, provide information of such arrest to the person nominated...',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-07-01'
          }
        ],
        relatedTopicIds: ['fundamental-rights-remedies', 'traffic-police-document-rights']
      }
    ]
  },
  {
    id: 'property-tenancy',
    name: 'Property & Tenancy',
    shortDescription: 'Rental agreements, security deposit disputes, eviction procedures, and model tenancy rules.',
    iconName: 'Home',
    topics: [
      {
        id: 'rental-agreements-disputes',
        categoryId: 'property-tenancy',
        title: 'Rental Agreements & Tenancy Disputes',
        summary: 'Security deposit withholding, eviction notice periods, and landlord-tenant rights.',
        plainLanguageExplanation:
          'Tenancy in India is governed by State Rent Control Acts, the Transfer of Property Act, 1882, and the Model Tenancy Act. Landlords cannot evict tenants without due process of law or arbitrarily withhold security deposits.',
        whenRelevant: [
          'When landlord refuses to refund security deposit after vacating.',
          'When arbitrary rent hikes or sudden lockouts occur without notice.'
        ],
        applicableSections: [
          {
            act: 'Transfer of Property Act, 1882',
            section: 'Section 106',
            description: 'Duration of certain leases in absence of written contract; requirement of notice in writing.',
            penaltyOrRemedy: 'Notice period required before tenancy termination.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can a landlord cut off water or electricity to force a tenant out?',
            answer: 'No. Cutting off essential services is an illegal act under all State Rent Control laws and can be challenged before Rent Authority or police.'
          }
        ],
        suggestedNextSteps: [
          'Always execute a registered rental agreement with clear exit clauses.',
          'Send a written legal demand notice for unrefunded deposit.',
          'Approach the Rent Authority / Court having jurisdiction.'
        ],
        officialSources: [
          {
            title: 'Transfer of Property Act, 1882',
            actName: 'Transfer of Property Act',
            sectionOrArticle: 'Section 106',
            excerpt: 'A lease of immovable property for agricultural or manufacturing purposes shall be deemed to be a lease from year to year...',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2023-10-01'
          }
        ],
        relatedTopicIds: ['cheating-and-fraud']
      }
    ]
  },
  {
    id: 'family-law',
    name: 'Family Law',
    shortDescription: 'Marriage registration, divorce grounds, child custody, and maintenance provisions.',
    iconName: 'Users',
    topics: [
      {
        id: 'maintenance-family-disputes',
        categoryId: 'family-law',
        title: 'Maintenance and Support Rights',
        summary: 'Right of wives, children, and elderly parents to financial support and maintenance.',
        plainLanguageExplanation:
          'Under Section 144 of BNSS 2023 (formerly Section 125 CrPC), any person having sufficient means who neglects or refuses to maintain their wife, minor child, or parents unable to maintain themselves can be ordered to pay monthly maintenance.',
        whenRelevant: [
          'Separation or desertion without financial support.',
          'Neglect of elderly parents unable to sustain themselves.'
        ],
        applicableSections: [
          {
            act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
            section: 'Section 144',
            description: 'Order for maintenance of wives, children and parents (formerly CrPC 125).',
            penaltyOrRemedy: 'Court ordered monthly allowance; warrant of arrest for default.'
          }
        ],
        commonQuestions: [
          {
            question: 'Is maintenance available during the pendency of a court case?',
            answer: 'Yes. Interim maintenance can be granted by the Family Court to cover daily expenses and legal costs during the proceedings.'
          }
        ],
        suggestedNextSteps: [
          'File an application under Section 144 BNSS before the Family Court / Judicial Magistrate.',
          'Submit income affidavit following the Supreme Court judgment in Rajnesh v. Neha.'
        ],
        officialSources: [
          {
            title: 'BNSS 2023 - Section 144 Maintenance',
            actName: 'BNSS 2023',
            sectionOrArticle: 'Section 144',
            excerpt: 'If any person having sufficient means neglects or refuses to maintain his wife, unable to maintain herself...',
            url: 'https://www.indiacode.nic.in',
            verified: true,
            lastReviewed: '2024-07-01'
          }
        ],
        relatedTopicIds: ['domestic-violence-protection']
      }
    ]
  },
  {
    id: 'employment-labour',
    name: 'Employment & Labour Law',
    shortDescription: 'Salary non-payment, wrongful termination, gratuity, and Industrial Relations Code.',
    iconName: 'Briefcase',
    topics: [
      {
        id: 'wage-salary-disputes',
        categoryId: 'employment-labour',
        title: 'Wage Disputes and Wrongful Termination',
        summary: 'Legal remedies when employers withhold earned salaries, F&F settlement, or terminate illegally.',
        plainLanguageExplanation:
          'Under the Payment of Wages Act and the Code on Wages, employers cannot withhold earned wages or make unauthorized deductions. Full and Final (F&F) settlement must be cleared within prescribed statutory timelines following resignation or termination.',
        whenRelevant: [
          'When an employer refuses to pay salary for worked notice period.',
          'When full and final settlement is delayed beyond 30 days.'
        ],
        applicableSections: [
          {
            act: 'Code on Wages, 2019 / Payment of Wages Act',
            section: 'Section 15 & 18',
            description: 'Time limit for payment of wages and permissible deductions.',
            penaltyOrRemedy: 'Labour commissioner claim with penalty up to 10 times unpaid amount.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can a company hold my experience letter or relieving letter for disputes?',
            answer: 'Withholding relieving letter and salary without valid clause violates fair employment principles and can be challenged before the Labour Officer.'
          }
        ],
        suggestedNextSteps: [
          'Send a formal demand email to HR and payroll team with proof of attendance.',
          'Issue a formal legal notice through an advocate if not resolved within 15 days.',
          'File a complaint before the jurisdictional Labour Commissioner.'
        ],
        officialSources: [
          {
            title: 'Ministry of Labour and Employment Portal',
            actName: 'Code on Wages, 2019',
            sectionOrArticle: 'Section 15',
            excerpt: 'Wages shall be paid within the specified period after the close of wage period...',
            url: 'https://labour.gov.in',
            verified: true,
            lastReviewed: '2023-12-01'
          }
        ],
        relatedTopicIds: ['defective-products-deficiency']
      }
    ]
  },
  {
    id: 'financial-banking',
    name: 'Financial & Banking Law',
    shortDescription: 'Banking Ombudsman, loan recovery agent harassment, and unauthorized credit report hits.',
    iconName: 'Landmark',
    topics: [
      {
        id: 'recovery-agent-harassment',
        categoryId: 'financial-banking',
        title: 'Protection from Loan Recovery Agent Harassment',
        summary: 'Strict RBI regulations prohibiting abusive calls, threats, home visits at odd hours, or contacting relatives.',
        plainLanguageExplanation:
          'The Reserve Bank of India (RBI) strictly prohibits banks and NBFC recovery agents from using intimidating tactics, calling before 8:00 AM or after 7:00 PM, calling friends/family, or making unannounced workplace visits. Harassment can lead to heavy regulatory penalties on the lending institution.',
        whenRelevant: [
          'When recovery agents call relatives or friends for your loan.',
          'When agents use abusive language or threaten criminal action for civil loan default.'
        ],
        applicableSections: [
          {
            act: 'RBI Fair Practices Code & Recovery Guidelines',
            section: 'Circular DOR.ORG.REC.65/21.04.158/2022-23',
            description: 'Strict guidelines on engagement of recovery agents by Regulated Entities.',
            penaltyOrRemedy: 'Lenders barred from engaging recovery agents; RBI Ombudsman compensation.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can police arrest me for defaulting on a personal loan or credit card?',
            answer: 'No. Loan default is purely a civil dispute, not a criminal offence, unless there is proven fraud or bouncing of an account payee cheque (Sec 138 NI Act).'
          }
        ],
        suggestedNextSteps: [
          'Record calls and preserve SMS/WhatsApp threats.',
          'Lodge a complaint on the RBI CMS portal (cms.rbi.org.in).',
          'File a police complaint for criminal intimidation (BNS Sec 351) if threats are made.'
        ],
        officialSources: [
          {
            title: 'RBI Integrated Ombudsman Scheme',
            actName: 'Banking Regulation Act & RBI Directives',
            sectionOrArticle: 'Fair Practices Code',
            excerpt: 'Regulated entities and their agents shall not resort to intimidation or harassment of any kind, either verbal or physical...',
            url: 'https://cms.rbi.org.in',
            verified: true,
            lastReviewed: '2024-04-01'
          }
        ],
        relatedTopicIds: ['online-financial-fraud', 'assault-criminal-intimidation']
      }
    ]
  },
  {
    id: 'education-law',
    name: 'Education Law',
    shortDescription: 'Right to Education (RTE) Act 2009, school fee disputes, and institutional grievance redressal.',
    iconName: 'GraduationCap',
    topics: [
      {
        id: 'rte-student-grievance',
        categoryId: 'education-law',
        title: 'Right to Free and Compulsory Education (RTE)',
        summary: 'Free education for children aged 6 to 14, 25% quota in private schools, and prohibition of physical punishment.',
        plainLanguageExplanation:
          'Under Article 21A of the Constitution and the Right of Children to Free and Compulsory Education Act, 2009, every child aged 6-14 has a fundamental right to free education. Corporal punishment and mental harassment are strictly forbidden in all schools.',
        whenRelevant: [
          'Refusal of admission under EWS / 25% quota.',
          'Physical punishment or discrimination by school authorities.'
        ],
        applicableSections: [
          {
            act: 'Right of Children to Free and Compulsory Education Act, 2009',
            section: 'Section 12(1)(c) & 17',
            description: '25% reservation for disadvantaged groups in private schools and total prohibition of corporal punishment.',
            penaltyOrRemedy: 'Disciplinary action and penal provisions for offending staff.'
          }
        ],
        commonQuestions: [
          {
            question: 'Can a school withhold a student’s transfer certificate or marksheet for unpaid fees?',
            answer: 'Multiple High Courts and Supreme Court orders have ruled that a school cannot hold a child’s education or board marksheet hostage over fee disputes.'
          }
        ],
        suggestedNextSteps: [
          'File a representation before the District Education Officer (DEO).',
          'Approach the State Commission for Protection of Child Rights (SCPCR).'
        ],
        officialSources: [
          {
            title: 'RTE Act, 2009 - Ministry of Education',
            actName: 'RTE Act, 2009',
            sectionOrArticle: 'Section 12, 17',
            excerpt: 'No child shall be subjected to physical punishment or mental harassment.',
            url: 'https://www.education.gov.in',
            verified: true,
            lastReviewed: '2023-11-01'
          }
        ],
        relatedTopicIds: ['children-conflict-with-law']
      }
    ]
  },
  {
    id: 'environmental-law',
    name: 'Environmental Law',
    shortDescription: 'Air & water pollution complaints, National Green Tribunal (NGT), and municipal waste violations.',
    iconName: 'TreePine',
    topics: [
      {
        id: 'pollution-ngt-complaints',
        categoryId: 'environmental-law',
        title: 'Pollution Control & National Green Tribunal Remedies',
        summary: 'Action against industrial discharge, illegal tree felling, noise pollution, and garbage burning.',
        plainLanguageExplanation:
          'The Environment (Protection) Act, 1986, Air Act 1981, and Water Act 1974 empower Pollution Control Boards. The National Green Tribunal (NGT) provides dedicated judicial remedies with powers to award environmental damages.',
        whenRelevant: [
          'Illegal industrial emissions affecting residential colonies.',
          'Loud music / sound systems beyond 10:00 PM violating Noise Rules.'
        ],
        applicableSections: [
          {
            act: 'National Green Tribunal Act, 2010',
            section: 'Section 14 & 15',
            description: 'Tribunal jurisdiction over environmental questions and power to order relief, compensation, and restitution.',
            penaltyOrRemedy: 'Environmental compensation orders.'
          }
        ],
        commonQuestions: [
          {
            question: 'What can I do if construction work causes extreme dust and noise all night?',
            answer: 'File a complaint with the State Pollution Control Board and local Municipal Corporation for violation of Noise Pollution (Regulation and Control) Rules, 2000.'
          }
        ],
        suggestedNextSteps: [
          'Take geotagged photographs and videos of the pollution source.',
          'Lodge complaint on the Central Pollution Control Board SAMEER portal.',
          'File an application before the NGT Principal or Zonal Bench.'
        ],
        officialSources: [
          {
            title: 'NGT Official Portal',
            actName: 'NGT Act, 2010',
            sectionOrArticle: 'Section 14',
            excerpt: 'The Tribunal shall have jurisdiction over all civil cases where a substantial question relating to environment is involved...',
            url: 'https://greentribunal.gov.in',
            verified: true,
            lastReviewed: '2024-01-10'
          }
        ],
        relatedTopicIds: ['fundamental-rights-remedies']
      }
    ]
  }
];
