export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

export type Pillar =
  | "Data Protection & Privacy"
  | "Security Architecture"
  | "Explainability & Transparency"
  | "Bias & Fairness"
  | "Human Oversight & Accountability"
  | "Monitoring & Incident Response";

export type RiskCriterion = {
  id: string;
  pillar: Pillar;
  label: string;
  weight: number;
  recommendation: string;
  securityControl: string;
};

export type SystemProfile = {
  systemName: string;
  sector: string;
  purpose: string;
  affectedUsers: string;
  dataHandled: string;
  deploymentStage: string;
};

export type PillarResult = {
  pillar: Pillar;
  score: number;
  maxScore: number;
  percentage: number;
  riskLevel: RiskLevel;
};

export type AssessmentResult = {
  assessmentId: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  riskLevel: RiskLevel;
  pillarResults: PillarResult[];
  selectedRisks: RiskCriterion[];
  recommendations: string[];
  priorityActions: string[];
  priorityPillars: PillarResult[];
  riskSummary: string;
  deploymentRecommendation: string;
  frameworkVersion: string;
  methodology: string;
  assessmentDate: string;
};

export type SavedAssessment = {
  id: string;
  profile: SystemProfile;
  result: AssessmentResult;
  savedAt: string;
};