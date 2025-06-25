import { COAScenario, ScenarioPhase, XAIExplanation } from '../types';

// Mission timeline data (not displayed in UI, but system is aware)
export const scenario: ScenarioPhase[] = [
  {
    phase: "Monitoring and Detection",
    actions: [
      "Note aircraft indicated by ATC in Northern Quebec.",
      "Interrogates the indicated track of interest.",
      "Changes mission phase."
    ]
  },
  {
    phase: "Identification and Location",
    actions: [
      "Discusses track of interest with reporting ATC.",
      "Verifies ATC card.",
      "Shares information with team.",
      "Notices aircraft's course aligns with high value targets.",
      "Checks high value target list.",
      "Notices aircraft's speed has increased.",
      "Checks intelligence summaries.",
      "Confirms no change with ATC.",
      "MCC gives direction to make the track a target.",
      "Changes mission phase."
    ]
  },
  {
    phase: "Definition and Requirements",
    actions: [
      "TIMS card generated and shared.",
      "**XAI Panel Activates**"
    ]
  }
];

export const xaiExplanation: XAIExplanation = {
  response: "XAI Analysis: Unresponsive aircraft detected with multiple threat indicators",
  insight: {
    text: "Aircraft threat assessment summary:\n• Flight path deviation from original route\n• Increased speed toward restricted airspace\n• No response to ATC communications\n• Course alignment with critical infrastructure\n• Multiple threat indicators present",
    lime: ["flight_deviation", "speed_increase", "target_alignment", "communication_loss"]
  },
  reasoning: {
    text: "Threat correlation analysis:\n• Flight pattern matches 85% of known adversarial profiles\n• Speed increase suggests intentional course change\n• Communication silence indicates potential hostile intent\n• Geographic approach vector is tactically significant",
    dag: {
      nodes: [
        {
          id: 'deviation',
          label: 'Flight Deviation',
          group: 'Flight Data',
          description: 'Deviation from original flight path',
          importance: 'Indicates potential evasive manoeuvre',
          whatIf: 'Less deviation lowers threat'
        },
        {
          id: 'speed',
          label: 'Speed Increase',
          group: 'Flight Data',
          description: 'Increase in aircraft speed',
          importance: 'Suggests intentional course change',
          whatIf: 'Slowing down may indicate compliance'
        },
        {
          id: 'communication',
          label: 'ATC Silence',
          group: 'Communications',
          description: 'No response to ATC calls',
          importance: 'Silence often precedes hostile intent',
          whatIf: 'Responding would ease concern'
        },
        {
          id: 'geography',
          label: 'Approach Vector',
          group: 'Route',
          description: 'Vector toward critical infrastructure',
          importance: 'May indicate attack posture',
          whatIf: 'Different route reduces suspicion'
        },
        {
          id: 'threat',
          label: 'Threat Assessment',
          group: 'Assessment',
          description: 'Overall threat evaluation',
          importance: 'Aggregates indicators to gauge risk'
        }
      ],
      edges: [
        { from: 'deviation', to: 'threat' },
        { from: 'speed', to: 'threat' },
        { from: 'communication', to: 'threat' },
        { from: 'geography', to: 'threat' }
      ]
    },
    shap: {
      "Flight Deviation": 0.45,
      "Speed Increase": 0.35,
      "ATC Non-Response": 0.4,
      "Geographic Vector": 0.3,
      "Time of Day": -0.1
    }
  },
  projection: {
    text: "Threat projection analysis:\n• High probability of continued approach to restricted airspace\n• Multiple response options available with varying success rates\n• Critical decision window rapidly closing",
    alternatives: [
      {
        title: "Immediate Intercept Deployment",
        details: "Deploy fighter aircraft for visual identification and potential diversion. Highest success rate with rapid response."
      },
      {
        title: "Enhanced Monitoring Protocol",
        details: "Maintain surveillance while preparing defensive systems. Lower resource commitment but higher risk."
      },
      {
        title: "Defensive Systems Activation",
        details: "Activate ground-based defense systems as precautionary measure. Guaranteed availability but limited to defensive engagement."
      }
    ]
  },
  confidence: 85,
  suggestedPrompts: [
    "Why is the flight deviation significant?",
    "What makes this pattern suspicious?",
    "What are the intercept options?",
    "What happens if we wait?"
  ]
};

export const defaultScenario: COAScenario = {
  name: "COA Analysis: Unresponsive Aircraft - Northern Quebec",
  situation: "An aircraft has deviated from its flight plan in Northern Quebec and is unresponsive to ATC, heading toward critical infrastructure.",
  coursesOfAction: [
    {
      id: 'coa1',
      name: "COA 1: Enhanced Monitoring",
      summary: "Maintain surveillance and attempt communication while tracking the aircraft's progress and preparing defensive systems.",
      risk: "High (potential breach of restricted airspace)",
      reward: "Low (minimal resource commitment)",
      recommendationScore: 25,
    },
    {
      id: 'coa2',
      name: "COA 2: Immediate Intercept",
      summary: "Deploy fighter aircraft for visual identification, communication attempt, and potential diversion of the target aircraft.",
      risk: "Medium (resource intensive, potential escalation)",
      reward: "High (direct control and threat mitigation)",
      recommendationScore: 90,
    },
    {
      id: 'coa3',
      name: "COA 3: Defensive Posture",
      summary: "Activate ground-based defense systems and prepare for potential engagement while continuing monitoring efforts.",
      risk: "Low (defensive posture only)",
      reward: "Medium (prepared response capability)",
      recommendationScore: 70,
    }
  ]
};