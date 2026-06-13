function Header() {
  return (
    <header className="hero">
      <div className="badge">AI Security Governance Toolkit</div>

      <h1>Security-by-Ethics AI Framework</h1>

      <p className="hero-text">
        A cybersecurity-first AI risk assessment platform for identifying
        privacy, security, explainability, bias, oversight, and incident
        response risks before deployment.
      </p>

      <div className="mission-panel">
        AI systems introduce new security and governance risks, including data
        exposure, weak access control, biased outputs, lack of explainability,
        and poor incident readiness. This toolkit helps teams identify those
        risks before deployment.
      </div>

      <div className="value-grid">
        <div>
          <strong>Security-first</strong>
          <span>Assess access, monitoring, and incident readiness.</span>
        </div>

        <div>
          <strong>Ethics-aware</strong>
          <span>Review transparency, bias, and human accountability.</span>
        </div>

        <div>
          <strong>Deployment-ready</strong>
          <span>Generate practical recommendations before launch.</span>
        </div>
      </div>
    </header>
  );
}

export default Header;