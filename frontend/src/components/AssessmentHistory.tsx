import type { SavedAssessment } from "../types/assessment";

type Props = {
  savedAssessments: SavedAssessment[];
  onLoadAssessment: (assessment: SavedAssessment) => void;
  onDeleteAssessment: (id: string) => void;
};

function AssessmentHistory({
  savedAssessments,
  onLoadAssessment,
  onDeleteAssessment,
}: Props) {
  return (
    <section className="panel">
      <div className="section-heading">
        <span>History</span>
        <h2>Saved Assessments</h2>
        <p>Review, reopen, or delete previous AI risk assessments.</p>
      </div>

      {savedAssessments.length === 0 ? (
        <div className="empty-history">
          <p>No assessments saved yet.</p>
          <span>
            Run an assessment and save it to keep a local history in your browser.
          </span>
        </div>
      ) : (
        <div className="history-list">
          {savedAssessments.map((assessment) => (
            <div key={assessment.id} className="history-card">
              <div>
                <strong>
                  {assessment.profile.systemName || "Unnamed AI System"}
                </strong>

                <p>
                  {assessment.result.riskLevel} Risk ·{" "}
                  {assessment.result.percentage}% ·{" "}
                  {assessment.profile.sector || "No sector"}
                </p>

                <small>
                  Saved: {assessment.savedAt} · ID:{" "}
                  {assessment.result.assessmentId}
                </small>
              </div>

              <div className="history-actions">
                <button
                  className="secondary-button"
                  onClick={() => onLoadAssessment(assessment)}
                >
                  Open
                </button>

                <button
                  className="ghost-button danger-button"
                  onClick={() => onDeleteAssessment(assessment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AssessmentHistory;