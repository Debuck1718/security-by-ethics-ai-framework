import type { Dispatch, SetStateAction } from "react";
import type { SystemProfile } from "../types/assessment";

type Props = {
  profile: SystemProfile;
  setProfile: Dispatch<SetStateAction<SystemProfile>>;
};

function SystemProfileForm({ profile, setProfile }: Props) {
  const updateField = (field: keyof SystemProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <span>Step 1</span>
        <h2>AI System Profile</h2>
        <p>
          Describe the AI system, its purpose, users, data type, and deployment
          stage.
        </p>
      </div>

      <div className="form-grid">
        <label>
          System Name *
          <input
            value={profile.systemName}
            onChange={(e) => updateField("systemName", e.target.value)}
            placeholder="e.g. LabReport AI"
          />
        </label>

        <label>
          Sector *
          <select
            value={profile.sector}
            onChange={(e) => updateField("sector", e.target.value)}
          >
            <option value="">Select sector</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Finance</option>
            <option>Agriculture</option>
            <option>Public Services</option>
            <option>Business Operations</option>
            <option>Cybersecurity</option>
            <option>Other</option>
          </select>
        </label>

        <label className="full-width">
          Purpose *
          <textarea
            value={profile.purpose}
            onChange={(e) => updateField("purpose", e.target.value)}
            placeholder="What problem does this AI system solve?"
          />
        </label>

        <label>
          Affected Users
          <input
            value={profile.affectedUsers}
            onChange={(e) => updateField("affectedUsers", e.target.value)}
            placeholder="e.g. patients, students, customers"
          />
        </label>

        <label>
          Data Handled
          <input
            value={profile.dataHandled}
            onChange={(e) => updateField("dataHandled", e.target.value)}
            placeholder="e.g. medical data, student records"
          />
        </label>

        <label>
          Deployment Stage
          <select
            value={profile.deploymentStage}
            onChange={(e) => updateField("deploymentStage", e.target.value)}
          >
            <option value="">Select stage</option>
            <option>Idea</option>
            <option>Prototype</option>
            <option>Pilot</option>
            <option>Production</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default SystemProfileForm;