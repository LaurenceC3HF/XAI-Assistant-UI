export interface COAScenario {
  name: string;
  situation: string;
  coursesOfAction: CourseOfAction[];
}

export interface CourseOfAction {
  id: string;
  name: string;
  summary: string;
  risk: string;
  reward: string;
  recommendationScore: number;
}

export interface ScenarioPhase {
  phase: string;
  actions: string[];
}

export interface ChatMessage {
  timestamp: string;
  type: 'user_query' | 'ai_response';
  details: {
    query?: string;
    question?: string;
    response?: XAIExplanation;
  };
}

export interface XAIExplanation {
  defaultTab?: 'insight' | 'reasoning' | 'projection';
  response: string;
  insight: {
    text: string;
    lime?: string[];
  };
  reasoning: {
    text: string;
    dag?: DAGData;
    shap?: Record<string, number>;
  };
  projection: {
    text: string;
    alternatives?: AlternativeOutcome[];
  };
  confidence?: number;
  suggestedPrompts?: string[];
}

export interface DAGNode {
  id: string;
  label: string;
  group?: string;
  description?: string;
  importance?: string;
  whatIf?: string;
}

export interface DAGEdge {
  from: string;
  to: string;
}

export interface DAGData {
  nodes: DAGNode[];
  edges: DAGEdge[];
}

export interface AlternativeOutcome {
  title: string;
  details: string;
}

export type TabType = 'insight' | 'reasoning' | 'projection';