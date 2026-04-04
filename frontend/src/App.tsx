import { useState } from "react";
import "./index.css";

const ETHICS_CRITERIA = [
  { id: "pii", label: "Processes sensitive personal data", weight: 3, tip: "Use AES-256 encryption." },
  { id: "automated", label: "Makes final decisions without human review", weight: 2, tip: "Add a Human-in-the-Loop step." },
  { id: "blackbox", label: "Logic is not explainable", weight: 2, tip: "Integrate SHAP/LIME." },
  { id: "thirdParty", label: "Shares data with third-parties", weight: 1, tip: "Check SOC2 compliance." },
];

function App() {
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<{ risk: string; color: string; score: number } | null>(null);

  const toggleRisk = (id: string) => {
    setSelectedRisks(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const simulateScan = () => {
    if (!file) return alert("Please select a model file first!");
    
    setIsEvaluating(true);
    setResult(null);
    setLogs(["Initializing secure sandbox...", "Loading model weights...", "Checking for data leakage..."]);

    // Sequence of log updates to show the "process"
    setTimeout(() => setLogs(prev => [...prev, "Running adversarial bias test..."]), 1000);
    setTimeout(() => setLogs(prev => [...prev, "Analyzing decision tree transparency..."]), 2000);
    
    setTimeout(() => {
      const totalScore = ETHICS_CRITERIA
        .filter(c => selectedRisks.includes(c.id))
        .reduce((acc, curr) => acc + curr.weight, 0);

      const riskData = totalScore >= 5 
        ? { risk: "High Risk 🚨", color: "#ef4444" } 
        : totalScore >= 3 
        ? { risk: "Medium Risk ⚠️", color: "#f59e0b" } 
        : { risk: "Low Risk ✅", color: "#10b981" };

      setResult({ ...riskData, score: totalScore });
      setLogs(prev => [...prev, "Scan Complete. Generating report."]);
      setIsEvaluating(false);
    }, 3000);
  };

  return (
    <div className="container">
      <header>
        <code style={{ color: 'var(--accent)' }}>v1.2 // Audit_Engine</code>
        <h1>Security-by-Ethics</h1>
        <p className="subtitle">Upload and audit your AI architecture for ethical compliance.</p>
      </header>

      {/* NEW: Model Upload Section */}
      <section className="upload-section">
        <h3>1. Upload Model Artifact (.json, .h5, .bin)</h3>
        <div className="file-input-wrapper">
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className="file-input"
          />
          <p>{file ? `Ready: ${file.name}` : "No file selected"}</p>
        </div>
      </section>

      {/* Risk Selection */}
      <section style={{ marginTop: '30px' }}>
        <h3>2. Declaration of Data Intent</h3>
        <div className="card-grid">
          {ETHICS_CRITERIA.map(item => (
            <div key={item.id} className={`risk-card ${selectedRisks.includes(item.id) ? 'active' : ''}`} onClick={() => toggleRisk(item.id)}>
              <div className="checkbox-custom">{selectedRisks.includes(item.id) ? "●" : "○"}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <button onClick={simulateScan} className="button primary-btn" disabled={isEvaluating || !file}>
        {isEvaluating ? "Scanning Model..." : "Start Ethical Audit"}
      </button>

      {/* Live Log Display */}
      {isEvaluating && (
        <div className="log-window">
          {logs.map((log, i) => <div key={i} className="log-entry"><code>&gt; {log}</code></div>)}
        </div>
      )}

      {/* Result Display */}
      {result && !isEvaluating && (
        <div className="result-container" style={{ borderColor: result.color }}>
          <h2 style={{ color: result.color }}>{result.risk}</h2>
          <div className="mitigation-list">
             {ETHICS_CRITERIA.filter(c => selectedRisks.includes(c.id)).map(c => (
                <div key={c.id} className="mitigation-item">
                  <strong>{c.id.toUpperCase()}:</strong> {c.tip}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;