export interface FeatureInfo {
  label: string;
  description?: string;
  group?: string;
}

export const featureInfoMap: Record<string, FeatureInfo> = {
  'Flight Deviation': {
    label: 'Flight Deviation',
    description: 'Aircraft deviated from planned route.',
    group: 'Flight'
  },
  'Speed Increase': {
    label: 'Speed Increase',
    description: 'Unexpected increase in aircraft speed.',
    group: 'Flight'
  },
  'ATC Non-Response': {
    label: 'ATC Non-Response',
    description: 'No reply to Air Traffic Control communications.',
    group: 'Communication'
  },
  'Geographic Vector': {
    label: 'Geographic Vector',
    description: 'Approach path toward sensitive location.',
    group: 'Geography'
  },
  'Time of Day': {
    label: 'Time of Day',
    description: 'Temporal factor affecting threat level.',
    group: 'Timing'
  },
  'Course Change': {
    label: 'Course Change',
    description: 'Change in planned course.',
    group: 'Flight'
  },
  'Timing Factor': {
    label: 'Timing Factor',
    description: 'Timing related to other events.',
    group: 'Timing'
  },
  'Acceleration Rate': {
    label: 'Acceleration Rate',
    description: 'Rate of speed increase.',
    group: 'Flight'
  },
  'Fuel Consumption': {
    label: 'Fuel Consumption',
    description: 'Fuel burn higher than expected.',
    group: 'Operations'
  },
  'Flight Plan Deviation': {
    label: 'Flight Plan Deviation',
    description: 'Difference from filed flight plan.',
    group: 'Flight'
  },
  'Historical Match': {
    label: 'Historical Match',
    description: 'Similarity to past incidents.',
    group: 'Intelligence'
  },
  'Behavior Pattern': {
    label: 'Behavior Pattern',
    description: 'Observed behavioral pattern.',
    group: 'Intelligence'
  },
  'Timing Correlation': {
    label: 'Timing Correlation',
    description: 'Correlation of timing with events.',
    group: 'Timing'
  },
  'Geographic Significance': {
    label: 'Geographic Significance',
    description: 'Location relevance to threat.',
    group: 'Geography'
  },
  'Response Time': {
    label: 'Response Time',
    description: 'Time required to respond.',
    group: 'Operations'
  },
  'Success Probability': {
    label: 'Success Probability',
    description: 'Likelihood of mission success.',
    group: 'Operations'
  },
  'Resource Availability': {
    label: 'Resource Availability',
    description: 'Assets available for action.',
    group: 'Operations'
  },
  'Collateral Risk': {
    label: 'Collateral Risk',
    description: 'Potential for unintended damage.',
    group: 'Risk'
  }
};

export interface DagNodeMeta {
  group: string;
  description?: string;
  why?: string;
  whatIf?: string;
}

export const dagNodeInfo: Record<string, DagNodeMeta> = {
  deviation: { group: 'Flight', description: 'Aircraft deviation observed.' },
  speed: { group: 'Flight', description: 'Increase in speed detected.' },
  communication: { group: 'Communication', description: 'Loss of ATC contact.' },
  geography: { group: 'Geography', description: 'Approach vector of aircraft.' },
  threat: { group: 'Threat', description: 'Overall threat assessment.' },
  acceleration: { group: 'Flight', description: 'Rapid acceleration noted.' },
  fuel: { group: 'Operations', description: 'Fuel analysis results.' },
  operations: { group: 'Operations', description: 'Flight operation factors.' },
  intent: { group: 'Threat', description: 'Assessment of hostile intent.' },
  historical: { group: 'Intelligence', description: 'Historical patterns matched.' },
  behavior: { group: 'Intelligence', description: 'Observed flight behavior.' },
  timing: { group: 'Timing', description: 'Timing considerations.' },
  cold_lake: { group: 'Resource', description: 'Cold Lake asset availability.' },
  bagotville: { group: 'Resource', description: 'Bagotville asset availability.' },
  ground: { group: 'Resource', description: 'Ground system readiness.' },
  civilian: { group: 'Resource', description: 'Airspace management measures.' },
  response: { group: 'Operations', description: 'Decision on response.' }
};

export const groupColors: Record<string, string> = {
  Flight: '#0ea5e9',
  Communication: '#a855f7',
  Geography: '#f97316',
  Threat: '#ef4444',
  Timing: '#eab308',
  Operations: '#10b981',
  Intelligence: '#3b82f6',
  Resource: '#facc15',
  Risk: '#f43f5e',
  Other: '#6b7280'
};
