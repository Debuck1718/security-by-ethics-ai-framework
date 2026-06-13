import { useEffect, useState } from "react";
import Header from "./components/Header";
import SystemProfileForm from "./components/SystemProfileForm";
import RiskChecklist from "./components/RiskChecklist";
import ResultsPanel from "./components/ResultsPanel";
import ReportPreview from "./components/ReportPreview";
import AssessmentHistory from "./components/AssessmentHistory";
import { RISK_CRITERIA } from "./data/criteria";
import type {
  AssessmentResult,
  SavedAssessment,
  SystemProfile,
} from "./types/assessment";
import { calculateAssessment } from "./utils/scoring";
import {
  deleteAssessment,
  getSavedAssessments,
  saveAssessment,
} from "./utils/storage";

const emptyProfile: SystemProfile = {
  systemName: "",
  sector: "",
  purpose: "",
  affectedUsers: "",
  dataHandled: "",
  deploymentStage: "",
};

function App() {
  const [profile, setProfile] = useState<SystemProfile>(emptyProfile);
  const [selectedRiskIds, setSelectedRiskIds] = useState<string[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [savedAssessments, setSavedAssessments] = useState<SavedAssessment[]>(
    []
  );

  useEffect(() => {
    setSavedAssessments(getSavedAssessments());
  }, []);

  const runAssessment = () => {
    if (!profile.systemName || !profile.sector || !profile.purpose) {
      alert(
        "Please complete the system name, sector, and purpose before running the assessment."
      );
      return;
    }

    const assessment = calculateAssessment(RISK_CRITERIA, selectedRiskIds);
    setResult(assessment);
  };

  const handleSaveAssessment = () => {
    if (!result) {
      alert("Please run an assessment before saving.");
      return;
    }

    const savedAssessment: SavedAssessment = {
      id: result.assessmentId,
      profile,
      result,
      savedAt: new Date().toLocaleString(),
    };

    saveAssessment(savedAssessment);
    setSavedAssessments(getSavedAssessments());

    alert("Assessment saved successfully.");
  };

  const handleLoadAssessment = (assessment: SavedAssessment) => {
    setProfile(assessment.profile);
    setResult(assessment.result);
    setSelectedRiskIds(assessment.result.selectedRisks.map((risk) => risk.id));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteAssessment = (id: string) => {
    const confirmed = confirm("Delete this saved assessment?");
    if (!confirmed) return;

    deleteAssessment(id);
    setSavedAssessments(getSavedAssessments());
  };

  const loadLabReportExample = () => {
    setProfile({
      systemName: "LabReport AI",
      sector: "Healthcare",
      purpose:
        "Simplifies complex laboratory reports into plain-language explanations for patients and non-medical users.",
      affectedUsers: "Patients, healthcare workers, non-medical users",
      dataHandled: "Medical laboratory data and user-submitted reports",
      deploymentStage: "Prototype",
    });

    setSelectedRiskIds([
      "sensitive-data",
      "black-box",
      "no-ai-disclosure",
      "limited-dataset",
      "no-human-review",
      "no-incident-plan",
    ]);

    setResult(null);
  };

  const resetAssessment = () => {
    setProfile(emptyProfile);
    setSelectedRiskIds([]);
    setResult(null);
  };

  return (
    <main className="app-shell">
      <Header />

      <div className="action-row">
        <button className="secondary-button" onClick={loadLabReportExample}>
          Load LabReport AI Example
        </button>

        <button className="ghost-button" onClick={resetAssessment}>
          Reset Assessment
        </button>
      </div>

      <SystemProfileForm profile={profile} setProfile={setProfile} />

      <RiskChecklist
        selectedRiskIds={selectedRiskIds}
        setSelectedRiskIds={setSelectedRiskIds}
      />

      <div className="assessment-action">
        <button className="primary-button" onClick={runAssessment}>
          Run AI Risk Assessment
        </button>

        <button className="ghost-button" onClick={handleSaveAssessment}>
          Save Assessment
        </button>
      </div>

      <ResultsPanel result={result} />

      <ReportPreview profile={profile} result={result} />

      <AssessmentHistory
        savedAssessments={savedAssessments}
        onLoadAssessment={handleLoadAssessment}
        onDeleteAssessment={handleDeleteAssessment}
      />
    </main>
  );
}

export default App;