# Security-by-Ethics AI Framework

**Security-by-Ethics AI Framework** is a cybersecurity-first toolkit that helps developers, startups, schools, healthcare platforms, and organizations evaluate AI systems before deployment.

It combines ethical AI principles with practical cybersecurity checks to identify risks in data handling, explainability, bias, access control, human oversight, and incident response.

## Overview

As AI systems become more widely used in healthcare, education, business, finance, public services, and other high-impact sectors, organizations must consider not only innovation but also security, privacy, accountability, and ethical risks.

This project provides a practical risk assessment framework that helps teams ask an important question:

> Before this AI system is deployed, what cybersecurity, privacy, ethical, and governance risks should be addressed?

The tool allows users to profile an AI system, select relevant risk factors, generate a risk score, receive priority recommendations, and produce a professional assessment report.

## Core Purpose

The goal of this project is to help organizations identify and reduce AI-related risks before deployment by focusing on:

* Data protection and privacy
* Security architecture
* Explainability and transparency
* Bias and fairness
* Human oversight and accountability
* Monitoring and incident response

## Key Features

* AI system profile form
* Six-pillar cybersecurity and governance risk framework
* Weighted risk scoring engine
* Overall risk level calculation
* Pillar-by-pillar risk results
* Risk interpretation and deployment recommendation
* Priority risk areas
* Priority security controls
* Professional assessment report
* Print / Save as PDF report
* Export assessment as JSON
* Save assessments locally in browser storage
* Reopen and delete saved assessments
* Demo assessment using LabReport AI example

## Framework Pillars

### 1. Data Protection & Privacy

Assesses how the AI system handles personal, sensitive, or regulated data.

Example checks:

* Does the system process sensitive or personal data?
* Is data shared with third-party services?
* Are privacy and access controls clearly defined?

### 2. Security Architecture

Assesses whether the system has strong security foundations.

Example checks:

* Are authentication and access controls implemented?
* Are logs and alerts monitored?
* Are API keys and credentials protected?

### 3. Explainability & Transparency

Assesses whether users understand when and how AI is being used.

Example checks:

* Can users understand the system’s output?
* Are AI limitations clearly explained?
* Is AI usage disclosed to users?

### 4. Bias & Fairness

Assesses whether the system may produce unfair or biased outcomes.

Example checks:

* Has the system been tested for bias?
* Is the dataset representative of diverse users?
* Are outputs reviewed across different user groups?

### 5. Human Oversight & Accountability

Assesses whether humans remain responsible for high-impact decisions.

Example checks:

* Are high-impact decisions reviewed by a human?
* Is accountability clearly assigned?
* Is there an escalation process when harm occurs?

### 6. Monitoring & Incident Response

Assesses whether the system can be monitored, updated, and controlled after deployment.

Example checks:

* Is there an AI incident response plan?
* Can harmful outputs or misuse be reported?
* Is there a process for patching and reviewing the system?

## Risk Levels

The framework calculates a risk score and assigns one of four levels:

| Risk Level | Meaning                                                                        |
| ---------- | ------------------------------------------------------------------------------ |
| Low        | Minimal preliminary risk. Continue monitoring and documenting safeguards.      |
| Moderate   | Address priority controls before wider deployment or production use.           |
| High       | Major controls should be strengthened before production deployment.            |
| Critical   | Pause deployment pending formal cybersecurity, privacy, and governance review. |

## Technology Stack

* React
* TypeScript
* Vite
* CSS
* Browser Local Storage

## Project Structure

```txt
src/
  components/
    AssessmentHistory.tsx
    Header.tsx
    ReportPreview.tsx
    ResultsPanel.tsx
    RiskChecklist.tsx
    SystemProfileForm.tsx

  data/
    criteria.ts

  types/
    assessment.ts

  utils/
    scoring.ts
    storage.ts

  App.tsx
  index.css
  main.tsx
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/debuck1718/security-by-ethics-ai-framework.git
```

### 2. Navigate into the project

```bash
cd security-by-ethics-ai-framework/frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the app

Open the local development URL shown in your terminal, usually:

```txt
http://localhost:5173
```

## How to Use

1. Enter the AI system profile.
2. Select risk factors that apply to the system.
3. Run the AI risk assessment.
4. Review the results dashboard.
5. Generate the assessment report.
6. Export the report as JSON or print/save it as PDF.
7. Save the assessment to local history.
8. Reopen or delete saved assessments when needed.

## Example Use Case

The app includes a demo profile for **LabReport AI**, an AI-powered system designed to simplify complex medical laboratory reports into plain-language explanations for patients and non-medical users.

This example demonstrates how the framework can be applied to high-impact AI systems in healthcare, where privacy, explainability, bias, human oversight, and incident response are critical.

## Current Version

**Version:** 1.4
**Status:** Working MVP

Current capabilities include:

* Risk assessment
* Results dashboard
* Report generation
* PDF print support
* JSON export
* Local saved assessment history

## Roadmap

Future improvements may include:

* Better saved assessment filtering and search
* Clear all history feature
* Supabase backend integration
* User authentication
* Organization dashboard
* Cloud-based assessment storage
* AI system registry
* Upload and parse AI system documentation
* Mapping to standards such as NIST AI RMF, ISO 27001, OWASP, and GDPR-style principles
* AI-assisted recommendations
* Multi-language support

## Disclaimer

This tool provides a preliminary AI security and governance assessment. It is intended to support internal risk awareness and decision-making.

It does not replace a formal legal review, compliance audit, penetration test, privacy impact assessment, or professional cybersecurity assessment.

## Author

**Evans Buckman**
Aspiring IT and cybersecurity professional focused on secure systems, ethical AI, and responsible digital innovation.

Portfolio: https://debuck1718.github.io/portfolio
GitHub: https://github.com/debuck1718
