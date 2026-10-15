import { DraftTemplate } from '../types/legal';

export const DRAFT_TEMPLATES: DraftTemplate[] = [
  {
    id: 'incident-report',
    title: 'Personal Incident Report',
    description: 'Write a structured, factual account of an incident, dispute, or violation for personal record or initial submission.',
    recommendedFor: 'Theft, road incidents, roadside altercations, lost property, cyber fraud, neighborhood disputes',
    fields: [
      { key: 'reporterName', label: 'Your Full Name', placeholder: 'e.g. Ramesh Kumar', type: 'text', required: true },
      { key: 'dateTime', label: 'Date & Approximate Time of Incident', placeholder: 'e.g. 14 October 2024 at around 3:30 PM', type: 'text', required: true },
      { key: 'location', label: 'Exact Location / Platform', placeholder: 'e.g. Near Indiranagar Metro Station, Bengaluru / WhatsApp Group', type: 'text', required: true },
      { key: 'involvedParties', label: 'Persons or Organizations Involved', placeholder: 'e.g. Unknown individual on motorcycle, Traffic Constable Badge #421, Customer Support rep', type: 'text' },
      { key: 'chronologicalNarrative', label: 'Detailed Account of What Happened (in chronological order)', placeholder: 'Describe what took place step-by-step. Include who said what, actions taken, and what happened immediately after.', type: 'textarea', required: true, helpText: 'Be factual and objective. Avoid assumptions or speculation.' },
      { key: 'evidenceList', label: 'Available Documents or Evidence', placeholder: 'e.g. Transaction UTR #12345, CCTV clip, WhatsApp screenshots, Medical prescription', type: 'textarea' },
      { key: 'witnesses', label: 'Witnesses (if any)', placeholder: 'e.g. Shopkeeper adjacent to ATM, friend who was present', type: 'text' },
      { key: 'requestedOutcome', label: 'Requested Action or Purpose of Report', placeholder: 'e.g. Request investigation, record for insurance claim, formal police complaint', type: 'text' }
    ]
  },
  {
    id: 'formal-complaint',
    title: 'Formal Complaint Letter',
    description: 'A formal letter addressed to an official authority, department, bank, or corporate grievance redressal officer.',
    recommendedFor: 'Banking fraud, police inaction, consumer defects, landlord violations, employer wage disputes',
    fields: [
      { key: 'complainantName', label: 'Complainant Full Name & Contact Info', placeholder: 'e.g. Priya Sharma, Phone: 9876543210, Email: priya@example.com', type: 'text', required: true },
      { key: 'authorityRecipient', label: 'Recipient Authority / Designated Officer', placeholder: 'e.g. The Station House Officer (SHO), The Branch Manager, HDFC Bank / Grievance Redressal Officer', type: 'text', required: true },
      { key: 'subjectLine', label: 'Subject of Complaint', placeholder: 'e.g. Formal Complaint regarding unauthorized UPI debit of ₹25,000 and request for immediate reversal', type: 'text', required: true },
      { key: 'incidentSummary', label: 'Factual Background & Chronology', placeholder: 'Detail the timeline of events, account or reference numbers, prior communications, and failure of previous attempts.', type: 'textarea', required: true },
      { key: 'specificGrievance', label: 'Specific Legal or Service Violation', placeholder: 'e.g. Violation of RBI Master Directions on Customer Protection, failure of service delivery under CPA 2019', type: 'textarea' },
      { key: 'reliefRequested', label: 'Specific Relief or Action Demanded', placeholder: 'e.g. Complete refund of disputed amount within 7 days, registration of FIR, written apology', type: 'textarea', required: true },
      { key: 'annexures', label: 'List of Enclosed Annexures / Attachments', placeholder: 'Annexure 1: Bank Statement, Annexure 2: Complaint acknowledgment, Annexure 3: Screenshots', type: 'textarea' }
    ]
  },
  {
    id: 'representation-authority',
    title: 'Representation to an Authority',
    description: 'Formal written representation to a government department, municipal commissioner, school board, or statutory body.',
    recommendedFor: 'Municipal grievances, school board issues, environmental hazard complaints, licensing appeals',
    fields: [
      { key: 'applicantName', label: 'Applicant / Representing Group Name', placeholder: 'e.g. Residents Welfare Association, Sector 14 / Sunita Verma', type: 'text', required: true },
      { key: 'targetDepartment', label: 'Department / Authority & Address', placeholder: 'e.g. The Commissioner, Municipal Corporation / District Education Officer', type: 'text', required: true },
      { key: 'matterTitle', label: 'Matter of Representation', placeholder: 'e.g. Urgent representation regarding open sewage overflow creating public health hazard', type: 'text', required: true },
      { key: 'factualCircumstances', label: 'Circumstances and Public or Personal Impact', placeholder: 'Describe how long the issue has persisted, previous oral representations made, and actual damage/inconvenience caused.', type: 'textarea', required: true },
      { key: 'statutoryProvisions', label: 'Applicable Rules or Notifications (if known)', placeholder: 'e.g. Municipal Solid Waste Rules 2016, Section 133 CrPC / BNSS Public Nuisance', type: 'text' },
      { key: 'prayer', label: 'Prayer / Redressal Sought', placeholder: 'e.g. Immediate inspection by sanitary team and repair within 48 hours', type: 'textarea', required: true }
    ]
  },
  {
    id: 'request-information',
    title: 'Request for Information / RTI Application',
    description: 'Structured application seeking official records or information under the Right to Information (RTI) Act, 2005.',
    recommendedFor: 'Public project delays, tender details, status of pending government files, fund allocation audits',
    fields: [
      { key: 'applicantName', label: 'Applicant Full Name and Address', placeholder: 'e.g. Arvind Mehta, Address for communication', type: 'text', required: true },
      { key: 'pioDesignation', label: 'Public Information Officer (PIO) / Department', placeholder: 'e.g. The Public Information Officer, Department of Public Works (PWD)', type: 'text', required: true },
      { key: 'particularsInfo', label: 'Specific Information Required (Numbered Points)', placeholder: '1. Certified copy of tender work order #123.\n2. Date of commencement and stipulated completion date.\n3. Total expenditure released to date.\n4. Names of inspection engineers.', type: 'textarea', required: true, helpText: 'Be specific and numbered. Ask for existing records rather than hypothetical questions.' },
      { key: 'periodConcerned', label: 'Period for which information is sought', placeholder: 'e.g. From 1st April 2022 to 31st March 2024', type: 'text' },
      { key: 'preferredFormat', label: 'Mode of Inspection / Format of Documents', placeholder: 'e.g. Certified physical copies by speed post / Inspection of records under Section 2(j)(i)', type: 'text' }
    ]
  },
  {
    id: 'chronological-statement',
    title: 'Chronological Statement of Events',
    description: 'A timeline-based, forensic summary of events formatted for legal consultations, dispute reviews, or mediation.',
    recommendedFor: 'Complex commercial disputes, family estate division, long-standing property matters, prolonged employment conflicts',
    fields: [
      { key: 'partiesHeading', label: 'Title of Matter / Parties Involved', placeholder: 'e.g. Matter of Tenancy Lease Agreement between Mr. A (Tenant) and Mr. B (Landlord)', type: 'text', required: true },
      { key: 'preparedBy', label: 'Prepared By & Date', placeholder: 'e.g. Prepared by Ankit Sen on 15 October 2024', type: 'text', required: true },
      { key: 'timelineEntries', label: 'Chronological Timeline (Date -> Event -> Reference)', placeholder: '01/01/2023 - Registered Lease Agreement signed (Doc A)\n15/06/2023 - First written request for ceiling repair via email (Doc B)\n10/08/2023 - Water leakage damaged living room ceiling (Photos C1-C4)\n01/09/2023 - Landlord refused deduction from monthly rent (WhatsApp Doc D)', type: 'textarea', required: true, helpText: 'List each milestone with exact date, brief event summary, and corresponding document/record reference.' },
      { key: 'currentStatus', label: 'Current Impasse or Status', placeholder: 'e.g. Tenancy ended on 31 August; landlord has withheld ₹1,20,000 security deposit without itemized repair bill.', type: 'textarea', required: true },
      { key: 'keyDocumentsAvailable', label: 'List of Primary Documents Available', placeholder: 'e.g. Registered agreement, bank UTR slips, email threads, video recording', type: 'textarea' }
    ]
  }
];
