export const shapFeatureInfo: Record<string, { group: string; explanation: string; why: string; value?: string }> = {
  "Flight Deviation": {
    group: "Flight Data",
    explanation: "How far the aircraft has deviated from its planned route.",
    why: "Large deviations can indicate intentional maneuvering or hostile intent.",
    value: "45° change"
  },
  "Course Change": {
    group: "Flight Data",
    explanation: "Degree of alteration from the original course or heading.",
    why: "Sudden course changes are often associated with evasive action.",
    value: "45° change"
  },
  "Speed Increase": {
    group: "Flight Data",
    explanation: "Increase in velocity compared to filed flight plan.",
    why: "Rapid acceleration may suggest urgency or evasion.",
    value: "50% increase"
  },
  "Acceleration Rate": {
    group: "Flight Data",
    explanation: "How quickly the aircraft is accelerating.",
    why: "Unusually high acceleration can indicate aggressive intent.",
    value: "High"
  },
  "Fuel Consumption": {
    group: "Flight Data",
    explanation: "Rate at which fuel is being used.",
    why: "High consumption limits operational time and indicates high power usage.",
    value: "Elevated"
  },
  "Flight Plan Deviation": {
    group: "Flight Data",
    explanation: "Difference from the filed flight plan.",
    why: "Deviations without clearance are suspicious.",
    value: "Significant"
  },
  "ATC Non-Response": {
    group: "Communications",
    explanation: "Lack of reply to air traffic control calls.",
    why: "Unresponsive aircraft may be hiding intentions.",
    value: "No contact"
  },
  "Timing Factor": {
    group: "Operational",
    explanation: "Specific timing of the maneuver or deviation.",
    why: "May coincide with vulnerabilities or shift changes.",
    value: "During shift change"
  },
  "Historical Match": {
    group: "Historical",
    explanation: "Similarity of current behavior to past incidents.",
    why: "Matching historical threats raises suspicion.",
    value: "85% correlation"
  },
  "Behavior Pattern": {
    group: "Operational",
    explanation: "Observed behavior relative to typical operations.",
    why: "Unusual patterns can indicate hostile intent.",
    value: "Consistent with threats"
  },
  "Timing Correlation": {
    group: "Operational",
    explanation: "Relationship of event timing to known vulnerabilities.",
    why: "Adversaries exploit predictable timings.",
    value: "During low coverage"
  },
  "Geographic Significance": {
    group: "Environmental",
    explanation: "Importance of the geographic approach vector.",
    why: "Certain vectors target critical assets.",
    value: "Critical approach"
  },
  "Geographic Vector": {
    group: "Environmental",
    explanation: "Current geographic path or approach vector.",
    why: "Approach may align with sensitive areas.",
    value: "Toward infrastructure"
  },
  "Response Time": {
    group: "Resource",
    explanation: "Time required to deploy intercept or response assets.",
    why: "Determines feasibility of interception.",
    value: "8 minutes"
  },
  "Success Probability": {
    group: "Resource",
    explanation: "Estimated chance of successful response.",
    why: "Higher probability actions are favored.",
    value: "95%"
  },
  "Resource Availability": {
    group: "Resource",
    explanation: "Whether assets are ready and available.",
    why: "Limited resources may constrain options.",
    value: "High"
  },
  "Collateral Risk": {
    group: "Resource",
    explanation: "Risk of collateral damage from the action.",
    why: "High risk may preclude certain responses.",
    value: "Moderate"
  },
  "Time of Day": {
    group: "Environmental",
    explanation: "Current time affecting visibility and operations.",
    why: "Night or low-light conditions complicate response.",
    value: "Night"
  }
};

export const dagNodeInfo: Record<string, { group: string; description: string; why: string; whatIf?: string }> = {
  deviation: {
    group: "Flight Data",
    description: "Change from expected flight path.",
    why: "Helps assess if the aircraft is intentionally diverting.",
    whatIf: "If deviation decreases, threat assessment lowers."
  },
  speed: {
    group: "Flight Data",
    description: "Increase or decrease in speed.",
    why: "Rapid speed shifts may indicate urgency or evasion.",
    whatIf: "Reducing speed could signal compliance."
  },
  communication: {
    group: "Communications",
    description: "Radio contact with ATC or other aircraft.",
    why: "Lack of communication hides intent and raises risk.",
    whatIf: "Restoring comms clarifies intentions."
  },
  geography: {
    group: "Environmental",
    description: "Approach vector relative to terrain or infrastructure.",
    why: "Certain vectors expose high value targets.",
    whatIf: "Changing vector might mitigate risk."
  },
  threat: {
    group: "Threat",
    description: "Overall threat assessment node.",
    why: "Combines factors to determine response level."
  },
  timing: {
    group: "Operational",
    description: "When the event occurs relative to operations.",
    why: "Some times present vulnerabilities.",
    whatIf: "Different timing may reduce exposure."
  },
  intent: {
    group: "Threat",
    description: "Inferred intent of the aircraft.",
    why: "Determines if action is hostile or benign."
  },
  acceleration: {
    group: "Flight Data",
    description: "Rate at which speed is changing.",
    why: "High acceleration can indicate aggressive maneuvering."
  },
  fuel: {
    group: "Flight Data",
    description: "Fuel usage and remaining capacity.",
    why: "Low fuel limits options and may force actions."
  },
  operations: {
    group: "Operational",
    description: "Standard flight operations and procedures.",
    why: "Deviations from normal ops are suspicious."
  },
  historical: {
    group: "Historical",
    description: "Past incidents and known patterns.",
    why: "Matching history helps predict intent."
  },
  behavior: {
    group: "Operational",
    description: "Observed flight behavior patterns.",
    why: "Inconsistent behavior signals potential threat."
  },
  cold_lake: {
    group: "Resource",
    description: "Assets available at Cold Lake base.",
    why: "Determines quickest intercept capability."
  },
  bagotville: {
    group: "Resource",
    description: "Assets available at Bagotville base.",
    why: "Provides additional intercept options."
  },
  ground: {
    group: "Resource",
    description: "Ground-based defensive systems.",
    why: "Serve as backup or alternative response."
  },
  civilian: {
    group: "Communications",
    description: "Management of civilian air traffic.",
    why: "Ensures safety and clears intercept path."
  },
  response: {
    group: "Threat",
    description: "Overall response decision node.",
    why: "Combines factors to choose best action."
  }
};

export const groupColors: Record<string, string> = {
  "Flight Data": "#3b82f6", // blue-500
  "Communications": "#10b981", // emerald-500
  "Operational": "#f59e0b", // amber-500
  "Historical": "#8b5cf6", // violet-500
  "Resource": "#f97316", // orange-500
  "Environmental": "#14b8a6", // teal-500
  "Threat": "#ef4444" // red-500
};
