// questions.js
// 45 Question Audit Framework mapped to Kenyan Fintech Regulations (CBK & ODPC)

const auditQuestions = [
    {
        sectionTitle: "1. Company Profile (KYC)",
        sectionId: "s1",
        questions: [
            { id: "q1", text: "Company/Business Name", type: "text", weight: 0 },
            { id: "q2", text: "Industry Sub-sector", type: "select", options: ["Digital Credit Provider", "Payment Service Provider (PSP)", "Neo-Bank / Wallet", "Insurtech", "Remittance", "Other"], weight: 0 },
            { id: "q3", text: "Current ODPC Registration Status", type: "select", options: ["Not Registered", "Application Pending", "Registered Data Controller", "Registered Data Processor"], weight: 0 },
            { id: "q4", text: "Annual Turnover Range", type: "select", options: ["< 5M KES", "5M - 50M KES", "50M - 100M KES", "> 100M KES"], weight: 0 }
        ]
    },
    {
        sectionTitle: "2. Regulatory Governance",
        sectionId: "s2",
        questions: [
            { id: "q5", text: "Is the company fully licensed by the Central Bank of Kenya (CBK)?", weight: 4, critical: true, legalContext: "Mandatory under CBK Digital Credit Providers Regulations 2022. Operating without a license is a criminal offense." },
            { id: "q6", text: "Is the company registered with the ODPC?", weight: 4, critical: true, legalContext: "Section 18 Data Protection Act (DPA). Mandatory for any entity processing personal data." },
            { id: "q7", text: "Do you have a designated Data Protection Officer (DPO)?", weight: 3, legalContext: "Required by DPA Section 24 if processing requires regular monitoring of subjects." },
            { id: "q8", text: "Are data protection policies reviewed and approved by the Board annually?", weight: 2, legalContext: "CBK Governance guidelines require Board oversight on compliance matters." },
            { id: "q9", text: "Does the company maintain an up-to-date Record of Processing Activities (RoPA)?", weight: 2, legalContext: "DPA Section 23 accountability requirement." },
            { id: "q10", text: "Is there a specific budget allocated for compliance and cybersecurity?", weight: 1, legalContext: "Demonstrates organizational commitment to CBK Cybersecurity Guidelines." },
            { id: "q11", text: "Do you have a Whistleblowing Policy for reporting non-compliance?", weight: 2, legalContext: "Regulation 17 of CBK Regulations." }
        ]
    },
    {
        sectionTitle: "3. Data Collection & Privacy",
        sectionId: "s3",
        questions: [
            { id: "q12", text: "Is explicit, opt-in consent obtained before data collection?", weight: 4, critical: true, legalContext: "DPA Section 30. Implied consent is not valid for sensitive financial data." },
            { id: "q13", text: "Is the Privacy Notice provided specifically at the point of data entry?", weight: 3, legalContext: "DPA Section 18: Notification of collection." },
            { id: "q14", text: "Does the Privacy Notice contain all mandatory Regulation 13 elements (Purpose, Rights, 3rd Parties)?", weight: 3, legalContext: "Defective notices invalidate consent." },
            { id: "q15", text: "Is data collection limited to only what is necessary (Data Minimization)?", weight: 2, legalContext: "DPA Principle 3: You cannot collect data 'just in case'." },
            { id: "q16", text: "Are retention periods defined and does data auto-delete after expiry?", weight: 2, legalContext: "DPA Principle 5: Storage Limitation." },
            { id: "q17", text: "Is consent obtained separately for marketing/SMS (not bundled with Terms)?", weight: 4, critical: true, legalContext: "Common ODPC penalty trigger. Marketing requires distinct consent." },
            { id: "q18", text: "Is there a functioning 'Opt-Out' or 'Stop' mechanism for marketing messages?", weight: 3, legalContext: "Consumer Protection Act Section 4." },
            { id: "q19", text: "Is sensitive data (biometrics, health, location) treated with enhanced security?", weight: 3, legalContext: "DPA Section 44 requires specific safeguards for sensitive personal data." }
        ]
    },
    {
        sectionTitle: "4. Credit Assessment & AI",
        sectionId: "s4",
        questions: [
            { id: "q20", text: "Are customers informed if AI/Automated Decision Making is used for loans?", weight: 3, legalContext: "DPA Section 35: Right to be informed of automated decision making." },
            { id: "q21", text: "Can customers request human intervention or appeal an AI credit decision?", weight: 3, legalContext: "DPA Section 35(1)(b): Right to request human review." },
            { id: "q22", text: "Is specific consent obtained before accessing Credit Reference Bureau (CRB) records?", weight: 4, critical: true, legalContext: "CIS Regulations 2020. Listing or checking without notice is illegal." },
            { id: "q23", text: "Have algorithms been tested to ensure they don't discriminate (e.g., gender/location bias)?", weight: 3, legalContext: "CBK Consumer Protection Guidelines on fair lending." },
            { id: "q24", text: "Are the data sources used for credit scoring disclosed to the customer?", weight: 2, legalContext: "Transparency principle under Consumer Protection Act." },
            { id: "q25", text: "Does the company validate the accuracy of data submitted to CRBs?", weight: 3, legalContext: "CIS Mechanism: Duty to submit accurate data." },
            { id: "q26", text: "Is there a logic explanation available if a customer asks why they were rejected?", weight: 2, legalContext: "Right to explanation of processing." }
        ]
    },
    {
        sectionTitle: "5. Cybersecurity & Infrastructure",
        sectionId: "s5",
        questions: [
            { id: "q27", text: "Is customer financial data encrypted at rest (database) and in transit (SSL/TLS)?", weight: 4, critical: true, legalContext: "CBK Cybersecurity Guidelines 3.1." },
            { id: "q28", text: "Is Multi-Factor Authentication (MFA) mandated for admin access?", weight: 3, legalContext: "CBK Guidelines 3.3. Simple passwords are non-compliant for sensitive access." },
            { id: "q29", text: "Is a System Audit / Penetration Test conducted at least annually?", weight: 3, legalContext: "Mandatory annual requirement under CBK/ODPC technical measures." },
            { id: "q30", text: "Do you have a documented Incident Response Plan?", weight: 4, critical: true, legalContext: "Required for complying with the 72-hour breach reporting window (DPA Section 43)." },
            { id: "q31", text: "Are access logs maintained to track who viewed customer data?", weight: 2, legalContext: "Audit trails are required for forensic investigations." },
            { id: "q32", text: "Are regular backups performed and tested for restorability?", weight: 3, legalContext: "CBK Business Continuity requirements." },
            { id: "q33", text: "Is physical access to servers or critical infrastructure restricted?", weight: 1, legalContext: "Physical security controls." },
            { id: "q34", text: "Is anti-virus/anti-malware software up to date on all workstations?", weight: 2, legalContext: "Basic endpoint security." }
        ]
    },
    {
        sectionTitle: "6. Third-Party Management",
        sectionId: "s6",
        questions: [
            { id: "q35", text: "Are written Data Processing Agreements (DPA) signed with all vendors?", weight: 4, critical: true, legalContext: "DPA Section 41: Controller-Processor legal binding is mandatory." },
            { id: "q36", text: "Is data hosting located within Kenya (or is a transfer impact assessment done)?", weight: 3, legalContext: "DPA Section 48: Restrictions on cross-border transfer." },
            { id: "q37", text: "Are third-party debt collectors vetted for conduct and compliance?", weight: 3, legalContext: "CBK Digital Credit Regs hold the lender liable for debt collector harassment." },
            { id: "q38", text: "Do you review the security posture of your cloud providers (AWS/Azure)?", weight: 2, legalContext: "Supply chain risk management." },
            { id: "q39", text: "Do contracts allow you to audit third-party providers?", weight: 2, legalContext: "Right to audit clause." },
            { id: "q40", text: "Are APIs secured with proper authentication tokens?", weight: 3, legalContext: "Secure API standards for Open Banking/Fintech integration." }
        ]
    },
    {
        sectionTitle: "7. Consumer Rights",
        sectionId: "s7",
        questions: [
            { id: "q41", text: "Is there a mechanism to handle Subject Access Requests within 21 days?", weight: 3, legalContext: "Statutory deadline for responding to requests." },
            { id: "q42", text: "Can a customer easily request 'Right to be Forgotten' (Erasure)?", weight: 3, legalContext: "DPA Section 40: Essential when a customer clears a loan and leaves." },
            { id: "q43", text: "Is there a designated complaints handling mechanism (Phone/Email)?", weight: 2, legalContext: "CBK Consumer Protection requirement." },
            { id: "q44", text: "Is data portability (transferring history to another lender) supported?", weight: 1, legalContext: "DPA Section 38." },
            { id: "q45", text: "Are fees/pricing clearly displayed before the loan application begins?", weight: 3, legalContext: "Consumer Protection Act & CBK Full Disclosure requirements." }
        ]
    }
];