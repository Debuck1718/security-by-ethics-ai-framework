import type { AssessmentResult } from "../types/assessment";
import { getImpactLabel } from "../utils/scoring";

type Props = {
  result: AssessmentResult | null;
};

function ResultsPanel({ result }: Props) {
  if (!result) {
    return (
      <section className="panel muted-panel">
        <h2>Results Dashboard</h2>
        <p>Complete the assessment to view risk scores and recommendations.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <span>Step 3</span>
        <h2>Results Dashboard</h2>
        <p>Review the security and governance risk profile.</p>
      </div>

      <div className={`score-card ${result.riskLevel.toLowerCase()}`}>
        <div>
          <p>Overall Risk</p>
          <h2>{result.riskLevel}</h2>
          <small>
            {result.totalScore}/{result.maxScore} total risk points
          </small>
        </div>

        <div className="score-number">{result.percentage}%</div>
      </div>

      <div className="insight-grid">
        <div className="insight-card">
          <h3>Risk Interpretation</h3>
          <p>{result.riskSummary}</p>
        </div>

        <div className="insight-card">
          <h3>Deployment Recommendation</h3>
          <p>{result.deploymentRecommendation}</p>
        </div>
      </div>

      {result.priorityPillars.length > 0 && (
        <div className="priority-box">
          <h3>Priority Risk Areas</h3>
          <div className="priority-pillars">
            {result.priorityPillars.map((pillar) => (
              <div key={pillar.pillar} className="priority-pillar">
                <strong>{pillar.pillar}</strong>
                <span>
                  {pillar.riskLevel} · {pillar.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pillar-results">
        {result.pillarResults.map((pillar) => (
          <div key={pillar.pillar} className="pillar-result">
            <div className="pillar-result-header">
              <strong>{pillar.pillar}</strong>
              <span>{pillar.riskLevel}</span>
            </div>

            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${pillar.percentage}%` }}
              />
            </div>

            <small>
              {pillar.score}/{pillar.maxScore} points · {pillar.percentage}%
            </small>
          </div>
        ))}
      </div>

      {result.priorityActions.length > 0 && (
        <div className="priority-box">
          <h3>Top Priority Actions</h3>
          <ol>
            {result.priorityActions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="selected-risks">
        <h3>Selected Risk Factors</h3>

        {result.selectedRisks.length === 0 ? (
          <p>No risk factors were selected.</p>
        ) : (
          <div className="selected-risk-list">
            {result.selectedRisks.map((risk) => (
              <div key={risk.id} className="selected-risk-item">
                <strong>{risk.label}</strong>
                <span>{risk.pillar}</span>
                <small>{getImpactLabel(risk.weight)}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="recommendations">
        <h3>All Recommended Controls</h3>

        {result.recommendations.length === 0 ? (
          <p>No major risks selected. Continue documenting safeguards.</p>
        ) : (
          <ul>
            {result.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="methodology-note">
        <strong>Framework:</strong> {result.frameworkVersion} ·{" "}
        {result.methodology}
      </div>
    </section>
  );
}

export default ResultsPanel;