import type {
  AssessmentResult,
  Pillar,
  PillarResult,
  RiskCriterion,
  RiskLevel,
} from "../types/assessment";

export const FRAMEWORK_VERSION = "v1.1";

export const FRAMEWORK_METHODOLOGY =
  "Weighted risk scoring across six AI security and governance pillars: data protection, security architecture, explainability, bias and fairness, human oversight, and incident response.";

export const getRiskLevel = (percentage: number): RiskLevel => {
  if (percentage <= 25) return "Low";
  if (percentage <= 50) return "Moderate";
  if (percentage <= 75) return "High";
  return "Critical";
};

export const getImpactLabel = (weight: number) => {
  if (weight >= 4) return "High impact";
  if (weight === 3) return "Medium-high impact";
  if (weight === 2) return "Medium impact";
  return "Low impact";
};

const getRiskSummary = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case "Low":
      return "This AI system currently shows a low preliminary risk profile. Continue documenting safeguards, monitoring system behavior, and reviewing controls before wider deployment.";
    case "Moderate":
      return "This AI system has a moderate risk profile. Several controls should be improved before deployment, especially in areas where high-impact risks were selected.";
    case "High":
      return "This AI system has a high risk profile. Major security, privacy, governance, or oversight controls should be strengthened before production deployment.";
    case "Critical":
      return "This AI system has a critical risk profile. Deployment should be paused until a formal security, privacy, and governance review is completed.";
    default:
      return "Risk summary unavailable.";
  }
};

const getDeploymentRecommendation = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case "Low":
      return "Suitable for controlled pilot or limited deployment with continued monitoring.";
    case "Moderate":
      return "Proceed carefully only after addressing the priority recommendations and documenting safeguards.";
    case "High":
      return "Not recommended for production deployment until major risks are reduced and reviewed.";
    case "Critical":
      return "Deployment should be paused pending formal cybersecurity, privacy, and governance assessment.";
    default:
      return "Deployment recommendation unavailable.";
  }
};

export const calculateAssessment = (
  criteria: RiskCriterion[],
  selectedRiskIds: string[]
): AssessmentResult => {
  const selectedRisks = criteria.filter((item) =>
    selectedRiskIds.includes(item.id)
  );

  const totalScore = selectedRisks.reduce((sum, item) => sum + item.weight, 0);
  const maxScore = criteria.reduce((sum, item) => sum + item.weight, 0);

  const percentage =
    maxScore === 0 ? 0 : Math.round((totalScore / maxScore) * 100);

  const riskLevel = getRiskLevel(percentage);

  const pillars = Array.from(new Set(criteria.map((item) => item.pillar)));

  const pillarResults: PillarResult[] = pillars.map((pillar) => {
    const pillarCriteria = criteria.filter((item) => item.pillar === pillar);
    const selectedPillarRisks = selectedRisks.filter(
      (item) => item.pillar === pillar
    );

    const score = selectedPillarRisks.reduce(
      (sum, item) => sum + item.weight,
      0
    );

    const maxPillarScore = pillarCriteria.reduce(
      (sum, item) => sum + item.weight,
      0
    );

    const pillarPercentage =
      maxPillarScore === 0
        ? 0
        : Math.round((score / maxPillarScore) * 100);

    return {
      pillar: pillar as Pillar,
      score,
      maxScore: maxPillarScore,
      percentage: pillarPercentage,
      riskLevel: getRiskLevel(pillarPercentage),
    };
  });

  const recommendations = Array.from(
    new Set(selectedRisks.map((item) => item.recommendation))
  );

  const priorityActions = [...selectedRisks]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((item) => item.recommendation);

  const priorityPillars = [...pillarResults]
    .filter((pillar) => pillar.score > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  return {
  assessmentId: `SBE-${Date.now()}`,
  totalScore,
  maxScore,
  percentage,
  riskLevel,
  pillarResults,
  selectedRisks,
  recommendations,
  priorityActions,
  priorityPillars,
  riskSummary: getRiskSummary(riskLevel),
  deploymentRecommendation: getDeploymentRecommendation(riskLevel),
  frameworkVersion: FRAMEWORK_VERSION,
  methodology: FRAMEWORK_METHODOLOGY,
  assessmentDate: new Date().toLocaleDateString(),
};
};