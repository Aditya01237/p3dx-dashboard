export const worlds = [
  {
    id: 'india',
    name: 'India',
    short: 'IN',
    region: 'Jurisdictional world',
    location: 'India',
    law: 'DPDP Act 2023',
    gateway: 'Bharat Gateway',
    gatewayStatus: 'Operational',
    color: 'amber',
    agents: 148,
    lockers: 231,
    children: [
      {
        id: 'university',
        name: 'Bengaluru University',
        short: 'BU',
        region: 'Institutional world',
        location: 'Karnataka, India',
        law: 'Education Records Policy',
        gateway: 'Academia Gateway',
        gatewayStatus: 'Operational',
        color: 'violet',
        agents: 42,
        lockers: 68,
        children: [
          {
            id: 'registrar',
            name: 'Registrar Office',
            short: 'RO',
            region: 'Departmental world',
            location: 'Bengaluru, India',
            law: 'Credential Access Rules',
            gateway: 'Registrar Gateway',
            gatewayStatus: 'Operational',
            color: 'violet',
            agents: 8,
            lockers: 13,
          },
        ],
      },
      {
        id: 'hospital',
        name: 'Kaveri Health Network',
        short: 'KH',
        region: 'Institutional world',
        location: 'Karnataka, India',
        law: 'ABDM Health Data Policy',
        gateway: 'Health Gateway',
        gatewayStatus: 'Operational',
        color: 'rose',
        agents: 61,
        lockers: 94,
      },
      {
        id: 'tax',
        name: 'Tax Identity Office',
        short: 'TX',
        region: 'Institutional world',
        location: 'New Delhi, India',
        law: 'Government Data Policy',
        gateway: 'Civic Gateway',
        gatewayStatus: 'Operational',
        color: 'blue',
        agents: 45,
        lockers: 69,
      },
    ],
  },
  {
    id: 'us',
    name: 'United States',
    short: 'US',
    region: 'Jurisdictional world',
    location: 'United States',
    law: 'US federal and state privacy rules',
    gateway: 'US Trust Gateway',
    gatewayStatus: 'Operational',
    color: 'blue',
    agents: 204,
    lockers: 312,
    children: [
      {
        id: 'mit',
        name: 'MIT',
        short: 'MIT',
        region: 'Institutional world',
        location: 'Cambridge, Massachusetts, USA',
        law: 'MIT Data Access Policy',
        gateway: 'MIT Gateway',
        gatewayStatus: 'Operational',
        color: 'cyan',
        agents: 76,
        lockers: 108,
        children: [
          {
            id: 'mit-records',
            name: 'MIT HR & Records',
            short: 'HR',
            region: 'Departmental world',
            location: 'Cambridge, Massachusetts, USA',
            law: 'Hiring Verification Rules',
            gateway: 'Records Gateway',
            gatewayStatus: 'Operational',
            color: 'cyan',
            agents: 12,
            lockers: 19,
          },
          {
            id: 'compliance',
            name: 'Compliance & Risk',
            short: 'CR',
            region: 'Departmental world',
            location: 'Cambridge, Massachusetts, USA',
            law: 'Risk Access Rules',
            gateway: 'Risk Gateway',
            gatewayStatus: 'Maintenance',
            color: 'emerald',
            agents: 9,
            lockers: 12,
          },
        ],
      },
    ],
  },
]

export const agents = [
  { id: 1, name: 'Aarav Mehta', initials: 'AM', role: 'Indian citizen', world: 'India', locker: 'Personal & academic locker', records: ['Identity proof', 'Degree title', 'Graduation year', 'Final grade'], type: 'Individual', color: 'bg-amber-100 text-amber-700', status: 'Verified', endpoint: true },
  { id: 2, name: 'Dr. Ananya Rao', initials: 'AR', role: 'Health custodian', world: 'Kaveri Health Network', locker: 'Clinical records', type: 'Institution', color: 'bg-rose-100 text-rose-700', status: 'Verified', endpoint: true },
  { id: 3, name: 'Bengaluru University', initials: 'BU', role: 'Credential issuer', world: 'Bengaluru University', locker: 'Academic credentials', type: 'Institution', color: 'bg-violet-100 text-violet-700', status: 'Verified', endpoint: true },
  { id: 4, name: 'Emily Carter', initials: 'EC', role: 'MIT talent partner', world: 'MIT', locker: 'Employment records', type: 'Individual', color: 'bg-cyan-100 text-cyan-700', status: 'Verified', endpoint: true },
  { id: 5, name: 'Credential Verifier AI', initials: 'CV', role: 'Verification agent', world: 'MIT HR & Records', locker: 'Verification workspace', type: 'AI agent', color: 'bg-slate-900 text-lime', status: 'Governed', endpoint: false },
  { id: 6, name: 'Tax Identity Office', initials: 'TX', role: 'Government authority', world: 'Tax Identity Office', locker: 'Tax identity', type: 'Institution', color: 'bg-blue-100 text-blue-700', status: 'Verified', endpoint: true },
  { id: 7, name: 'Risk Assessment AI', initials: 'RA', role: 'Compliance agent', world: 'Compliance & Risk', locker: 'Risk signals', type: 'AI agent', color: 'bg-slate-900 text-lime', status: 'Governed', endpoint: false },
  { id: 8, name: 'Daniel Brooks', initials: 'DB', role: 'Data protection officer', world: 'United States', locker: 'Compliance evidence', type: 'Individual', color: 'bg-emerald-100 text-emerald-700', status: 'Verified', endpoint: true },
]

export const initialConnections = [
  { id: 'CN-2048', source: 'MIT', sourceShort: 'MIT', target: 'Bengaluru University', targetShort: 'BU', purpose: 'Degree verification', state: 'Established', updated: '2 min ago', gateway: 'MIT → US Trust → Bharat → Academia', owner: 'Aarav Mehta' },
  { id: 'CN-2047', source: 'MIT', sourceShort: 'MIT', target: 'Kaveri Health Network', targetShort: 'KH', purpose: 'Benefits enrolment', state: 'Pending', updated: '18 min ago', gateway: 'MIT → US Trust → Bharat → Health', owner: 'Aarav Mehta' },
  { id: 'CN-2046', source: 'MIT', sourceShort: 'MIT', target: 'Tax Identity Office', targetShort: 'TX', purpose: 'Tax residency check', state: 'Requested', updated: '1 hr ago', gateway: 'MIT → US Trust → Bharat → Civic', owner: 'Aarav Mehta' },
  { id: 'CN-2044', source: 'Aarav Mehta', sourceShort: 'AM', target: 'Bengaluru University', targetShort: 'BU', purpose: 'Credential retrieval', state: 'Established', updated: 'Yesterday', gateway: 'Bharat → Academia', owner: 'Aarav Mehta' },
]

export const initialConsents = [
  { id: 'CS-8801', title: 'Academic degree verification', data: ['Degree title', 'Graduation year', 'Final grade'], purpose: 'Pre-employment verification', recipient: 'MIT', owner: 'Aarav Mehta', validUntil: '30 Sep 2026', status: 'Active', uses: 3, limit: 5, conditions: 'Verification only · No onward sharing' },
  { id: 'CS-8795', title: 'Employment eligibility', data: ['Tax identity', 'Residency status'], purpose: 'Cross-border onboarding', recipient: 'MIT', owner: 'Aarav Mehta', validUntil: '18 Aug 2026', status: 'Active', uses: 1, limit: 1, conditions: 'One-time access · Delete after 30 days' },
  { id: 'CS-8721', title: 'Health benefits enrolment', data: ['Insurance eligibility'], purpose: 'Employee benefits setup', recipient: 'MIT', owner: 'Aarav Mehta', validUntil: 'Revoked 12 Jul', status: 'Revoked', uses: 0, limit: 2, conditions: 'Benefits administration only' },
]

export const transactions = [
  { id: 'TX-92841', actor: 'Credential Verifier AI', action: 'read', data: 'Degree credential', source: 'Bengaluru University', target: 'MIT', consent: 'CS-8801', gateway: 'Academia → Bharat → US Trust → MIT', time: 'Today, 14:32', outcome: 'Approved', automated: true },
  { id: 'TX-92840', actor: 'MIT HR & Records', action: 'requested', data: 'Insurance eligibility', source: 'Kaveri Health Network', target: 'MIT', consent: 'Awaiting consent', gateway: 'Health → Bharat → US Trust → MIT', time: 'Today, 14:14', outcome: 'Pending', automated: false },
  { id: 'TX-92835', actor: 'Risk Assessment AI', action: 'verified', data: 'Tax residency status', source: 'Tax Identity Office', target: 'Compliance & Risk', consent: 'CS-8795', gateway: 'Civic → Bharat → US Trust', time: 'Today, 12:46', outcome: 'Approved', automated: true },
  { id: 'TX-92822', actor: 'Aarav Mehta', action: 'revoked', data: 'Insurance eligibility', source: 'Kaveri Health Network', target: 'MIT', consent: 'CS-8721', gateway: 'Health → Bharat', time: '12 Jul, 17:02', outcome: 'Revoked', automated: false },
  { id: 'TX-92817', actor: 'Credential Verifier AI', action: 'read', data: 'Graduation year', source: 'Bengaluru University', target: 'MIT', consent: 'CS-8801', gateway: 'Academia → Bharat → US Trust → MIT', time: '12 Jul, 11:25', outcome: 'Approved', automated: true },
]

export const activity = [
  { title: 'Credential shared', detail: 'Bengaluru University → MIT', time: '2m', tone: 'bg-lime' },
  { title: 'Consent requested', detail: 'Health benefits enrolment', time: '18m', tone: 'bg-amber-400' },
  { title: 'AI access verified', detail: 'Purpose and scope matched', time: '1h', tone: 'bg-cyan' },
  { title: 'Gateway policy updated', detail: 'US Trust Gateway · Policy v4.2', time: '3h', tone: 'bg-violet-400' },
]

export function flattenWorlds(items = worlds, depth = 0) {
  return items.flatMap((world) => [
    { ...world, depth },
    ...(world.children ? flattenWorlds(world.children, depth + 1) : []),
  ])
}
