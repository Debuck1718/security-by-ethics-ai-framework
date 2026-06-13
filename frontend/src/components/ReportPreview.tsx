import type { AssessmentResult, SystemProfile } from "../types/assessment";
import { getImpactLabel } from "../utils/scoring";

type Props = {
    profile: SystemProfile;
    result: AssessmentResult | null;
};

function ReportPreview({ profile, result }: Props) {
    const handlePrint = () => {
        window.print();
    };

    const exportJSON = () => {
        if (!result) return;

        const assessmentData = {
            metadata: {
                assessmentId: result.assessmentId,
                frameworkVersion: result.frameworkVersion,
                assessmentDate: result.assessmentDate,
                exportedAt: new Date().toISOString(),
            },
            profile,
            result,
            disclaimer:
                "This assessment is a preliminary AI security and governance review and does not replace formal legal, compliance, privacy, penetration testing, or cybersecurity assessments.",
        };

        const blob = new Blob([JSON.stringify(assessmentData, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        const safeFileName =
            profile.systemName.trim().replace(/\s+/g, "-").toLowerCase() ||
            "ai-assessment";

        link.href = url;
        link.download = `${result.assessmentId}-${safeFileName}-security-by-ethics-report.json`;
        link.click();

        URL.revokeObjectURL(url);
    };

    if (!result) return null;

    return (
        <section className="panel report-panel">
            <div className="section-heading">
                <span>Step 4</span>
                <h2>Assessment Report</h2>
                <p>Generate a practical AI security and governance risk report.</p>
            </div>

            <div className="report-box">
                <div className="report-header">
                    <div>
                        <h3>{profile.systemName || "Unnamed AI System"}</h3>
                        <p className="report-subtitle">
                            AI Security & Governance Risk Assessment
                        </p>
                    </div>

                    <span className={`risk-badge ${result.riskLevel.toLowerCase()}`}>
                        {result.riskLevel} Risk
                    </span>
                </div>

                <div className="report-grid">
                    <p>
                        <strong>Assessment ID:</strong> {result.assessmentId}
                    </p>

                    <p>
                        <strong>Assessment Date:</strong> {result.assessmentDate}
                    </p>

                    <p>
                        <strong>Framework Version:</strong> {result.frameworkVersion}
                    </p>

                    <p>
                        <strong>Sector:</strong> {profile.sector || "Not specified"}
                    </p>

                    <p>
                        <strong>Deployment Stage:</strong>{" "}
                        {profile.deploymentStage || "Not specified"}
                    </p>

                    <p>
                        <strong>Affected Users:</strong>{" "}
                        {profile.affectedUsers || "Not specified"}
                    </p>

                    <p>
                        <strong>Data Handled:</strong>{" "}
                        {profile.dataHandled || "Not specified"}
                    </p>

                    <p className="full-width">
                        <strong>Purpose:</strong> {profile.purpose || "Not specified"}
                    </p>
                </div>

                <hr />

                <h4>Overall Risk Summary</h4>

                <div className="report-summary-card">
                    <p>
                        <strong>Risk Level:</strong> {result.riskLevel}
                    </p>

                    <p>
                        <strong>Risk Score:</strong> {result.totalScore}/{result.maxScore} (
                        {result.percentage}%)
                    </p>

                    <p>
                        <strong>Interpretation:</strong> {result.riskSummary}
                    </p>

                    <p>
                        <strong>Deployment Recommendation:</strong>{" "}
                        {result.deploymentRecommendation}
                    </p>
                </div>

                <h4>Risk Level Guide</h4>

                <div className="risk-guide">
                    <div className="risk-guide-item low">
                        <strong>Low</strong>
                        <p>Minimal preliminary risk. Continue monitoring and documenting safeguards.</p>
                    </div>

                    <div className="risk-guide-item moderate">
                        <strong>Moderate</strong>
                        <p>Address priority controls before wider deployment or production use.</p>
                    </div>

                    <div className="risk-guide-item high">
                        <strong>High</strong>
                        <p>Major controls should be strengthened before production deployment.</p>
                    </div>

                    <div className="risk-guide-item critical">
                        <strong>Critical</strong>
                        <p>Pause deployment pending formal cybersecurity, privacy, and governance review.</p>
                    </div>
                </div>

                <h4>Priority Risk Areas</h4>

                {result.priorityPillars.length === 0 ? (
                    <p>No priority risk areas were identified.</p>
                ) : (
                    <div className="report-table">
                        {result.priorityPillars.map((pillar) => (
                            <div key={pillar.pillar}>
                                <strong>{pillar.pillar}</strong>
                                <span>
                                    {pillar.riskLevel} · {pillar.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <h4>Pillar Results</h4>

                <div className="report-table">
                    {result.pillarResults.map((pillar) => (
                        <div key={pillar.pillar}>
                            <strong>{pillar.pillar}</strong>
                            <span>
                                {pillar.riskLevel} · {pillar.score}/{pillar.maxScore} points ·{" "}
                                {pillar.percentage}%
                            </span>
                        </div>
                    ))}
                </div>

                <h4>Priority Recommendations</h4>

                {result.priorityActions.length === 0 ? (
                    <p>No immediate priority actions were generated.</p>
                ) : (
                    <ol>
                        {result.priorityActions.map((action, index) => (
                            <li key={index}>{action}</li>
                        ))}
                    </ol>
                )}

                <h4>Selected Risk Factors & Security Controls</h4>

                {result.selectedRisks.length === 0 ? (
                    <p>No risk factors selected.</p>
                ) : (
                    <div className="report-risk-list">
                        {result.selectedRisks.map((risk) => (
                            <div key={risk.id} className="report-risk-item">
                                <p>
                                    <strong>{risk.pillar}</strong>
                                </p>

                                <p>{risk.label}</p>

                                <p>
                                    <strong>Impact:</strong> {getImpactLabel(risk.weight)}
                                </p>

                                <p>
                                    <strong>Recommended Control:</strong> {risk.securityControl}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <h4>Methodology</h4>
                <p>{result.methodology}</p>

                <p className="disclaimer">
                    This assessment is a preliminary governance and cybersecurity review.
                    It is intended to support internal risk awareness and decision-making.
                    It does not replace a formal legal review, compliance audit,
                    penetration test, privacy impact assessment, or professional
                    cybersecurity assessment.
                </p>
            </div>

            <div className="report-actions">
                <button className="primary-button" onClick={handlePrint}>
                    Print / Save Report as PDF
                </button>

                <button className="ghost-button" onClick={exportJSON}>
                    Export Assessment JSON
                </button>
            </div>
        </section>
    );
}

export default ReportPreview;