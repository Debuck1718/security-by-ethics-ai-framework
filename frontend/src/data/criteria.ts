import type { RiskCriterion } from "../types/assessment";

export const RISK_CRITERIA: RiskCriterion[] = [
  {
    id: "sensitive-data",
    pillar: "Data Protection & Privacy",
    label: "The system processes sensitive or personal data",
    weight: 4,
    recommendation:
      "Minimize sensitive data collection, encrypt data at rest and in transit, and apply strong access controls.",
    securityControl:
      "Data minimization, encryption, access control, retention policy",
  },
  {
    id: "third-party-sharing",
    pillar: "Data Protection & Privacy",
    label: "The system shares user data with third-party services",
    weight: 3,
    recommendation:
      "Review third-party security practices, data processing agreements, and privacy responsibilities.",
    securityControl:
      "Vendor risk review, third-party agreement, data processing review",
  },
  {
    id: "weak-access-control",
    pillar: "Security Architecture",
    label: "Access control or authentication is weak or unclear",
    weight: 4,
    recommendation:
      "Implement strong authentication, role-based access control, and secure API key management.",
    securityControl:
      "Role-based access control, MFA, secure credential management",
  },
  {
    id: "no-security-monitoring",
    pillar: "Security Architecture",
    label: "There is no monitoring for logs, alerts, or abnormal activity",
    weight: 3,
    recommendation:
      "Enable activity logging, alerting, and regular security review of system behavior.",
    securityControl:
      "Logging, alerting, SIEM monitoring, abnormal behavior detection",
  },
  {
    id: "black-box",
    pillar: "Explainability & Transparency",
    label: "The system produces outputs users cannot easily understand",
    weight: 3,
    recommendation:
      "Provide user-facing explanations, confidence indicators, and documentation of system limitations.",
    securityControl:
      "Explainability notes, confidence scoring, model limitation disclosure",
  },
  {
    id: "no-ai-disclosure",
    pillar: "Explainability & Transparency",
    label: "Users are not clearly informed when AI is being used",
    weight: 2,
    recommendation:
      "Clearly disclose AI involvement and explain what the system can and cannot do.",
    securityControl:
      "AI disclosure notice, transparency statement, user guidance",
  },
  {
    id: "untested-bias",
    pillar: "Bias & Fairness",
    label: "The system has not been tested for biased or unfair outcomes",
    weight: 4,
    recommendation:
      "Test outputs across different groups, scenarios, and cultural contexts before deployment.",
    securityControl:
      "Bias testing, fairness review, representative test cases",
  },
  {
    id: "limited-dataset",
    pillar: "Bias & Fairness",
    label: "The training or reference data may not represent diverse users",
    weight: 3,
    recommendation:
      "Review dataset coverage and include diverse, relevant, and context-aware data sources.",
    securityControl:
      "Dataset review, data quality testing, cultural/context validation",
  },
  {
    id: "no-human-review",
    pillar: "Human Oversight & Accountability",
    label: "High-impact decisions are made without human review",
    weight: 4,
    recommendation:
      "Add human-in-the-loop review for sensitive or high-impact AI outputs.",
    securityControl:
      "Human review workflow, escalation process, approval checkpoints",
  },
  {
    id: "unclear-accountability",
    pillar: "Human Oversight & Accountability",
    label: "It is unclear who is responsible if the AI system causes harm",
    weight: 3,
    recommendation:
      "Define accountability roles, escalation procedures, and review responsibilities.",
    securityControl:
      "Ownership matrix, accountability policy, incident escalation roles",
  },
  {
    id: "no-incident-plan",
    pillar: "Monitoring & Incident Response",
    label: "There is no incident response plan for AI-related failures or misuse",
    weight: 4,
    recommendation:
      "Create an AI incident response plan covering misuse, data leaks, harmful outputs, and rollback procedures.",
    securityControl:
      "AI incident response plan, rollback process, misuse reporting",
  },
  {
    id: "no-update-process",
    pillar: "Monitoring & Incident Response",
    label: "There is no process for updating, patching, or reviewing the system",
    weight: 3,
    recommendation:
      "Schedule regular security reviews, model evaluations, dependency updates, and patch management.",
    securityControl:
      "Patch management, model review cycle, dependency monitoring",
  },
];