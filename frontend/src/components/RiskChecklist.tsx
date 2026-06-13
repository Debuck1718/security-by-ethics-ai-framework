import type { Dispatch, SetStateAction } from "react";
import { RISK_CRITERIA } from "../data/criteria";
import { getImpactLabel } from "../utils/scoring";

type Props = {
  selectedRiskIds: string[];
  setSelectedRiskIds: Dispatch<SetStateAction<string[]>>;
};

function RiskChecklist({ selectedRiskIds, setSelectedRiskIds }: Props) {
  const pillars = Array.from(new Set(RISK_CRITERIA.map((item) => item.pillar)));

  const toggleRisk = (id: string) => {
    setSelectedRiskIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <span>Step 2</span>
        <h2>Risk Assessment</h2>
        <p>
          Select all risk factors that apply to the AI system. Each selection
          increases the system’s risk score.
        </p>
      </div>

      <div className="risk-summary">
        {selectedRiskIds.length} risk factor
        {selectedRiskIds.length === 1 ? "" : "s"} selected
      </div>

      <div className="pillar-stack">
        {pillars.map((pillar) => (
          <div key={pillar} className="pillar-card">
            <h3>{pillar}</h3>

            <div className="risk-list">
              {RISK_CRITERIA.filter((item) => item.pillar === pillar).map(
                (item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`risk-item ${
                      selectedRiskIds.includes(item.id) ? "active" : ""
                    }`}
                    onClick={() => toggleRisk(item.id)}
                  >
                    <span className="risk-toggle">
                      {selectedRiskIds.includes(item.id) ? "✓" : "+"}
                    </span>

                    <span>{item.label}</span>

                    <small>{getImpactLabel(item.weight)}</small>
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RiskChecklist;