# AWS Cloud Foundations Certification Hub

A comprehensive resource hub for the AWS Certified Cloud Practitioner (CLF-C02) certification. Includes an interactive practice simulator, study guide, personal notes, and curated resources.

**Author:** [ValenciaF. Carlos DevOps](https://github.com/ValenciaFCarlos)
**License:** MIT

---

## Table of Contents

- [What's Inside](#whats-inside)
- [Exam Overview](#exam-overview)
- [Simulator Highlights](#simulator-highlights)
- [Getting Started](#getting-started)
- [Repository Structure](#repository-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## What's Inside

| Resource | Description | Status |
|----------|-------------|:------:|
| **[Practice Simulator](./simulator/)** | Interactive CLF-C02 simulator with 1,200 weighted questions, Learning Cycle, bilingual support, and dark mode. | Available |
| **[Study Guide](./guide/)** | Comprehensive guide covering all 4 exam domains with examples and scenarios. | Coming soon |
| **[Notes](./notes/)** | Personal notes, summaries, and mental models for the exam. | Coming soon |
| **[Resources](./resources/)** | Curated links to courses, documentation, and practice exams. | Coming soon |

---

## Exam Overview

### AWS Certified Cloud Practitioner (CLF-C02)

| Aspect | Details |
|--------|---------|
| Duration | 90 minutes |
| Format | Multiple choice, multiple response |
| Questions | 65 |
| Passing Score | 700 / 1000 |
| Cost | $100 USD |
| Validity | 3 years |
| Prerequisites | None (entry-level) |

### Exam Domains and Weights

| Domain | Weight | Description |
|--------|:------:|-------------|
| 1. Cloud Concepts | 24% | Fundamentals of cloud computing |
| 2. Security and Compliance | 30% | AWS security model and compliance |
| 3. Cloud Technology and Services | 34% | Core AWS services and architecture |
| 4. Billing, Pricing, and Support | 12% | Cost management and support options |

---

## Simulator Highlights

The **[CLF-C02 Simulator](./simulator/)** is a fully client-side web application. No backend, no dependencies, no build step.

Features:

- **1,200 weighted questions** across all 4 exam domains.
- **Stratified sampling** using the official exam weights (24/30/34/12).
- **Practice Mode** with progressive hints and Concept Insight.
- **Exam Mode** with timer to simulate the real exam.
- **Learning Cycle** to reinforce weak concepts with new questions.
- **AWS Level, Exam Readiness, Success Estimate** metrics with transparent calculation.
- **Final Report** with per-domain breakdown and Needs Review list.
- **Bilingual** (Spanish / English) with automatic fallback.
- **Dark mode** and **light mode**.
- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript.

[**Try the simulator**](./simulator/)

---

## Getting Started

### Run the simulator locally

The simulator requires a local HTTP server because it loads JSON files via `fetch()`.

```bash
# Navigate to the simulator folder
cd simulator

# Option 1: Python 3
python -m http.server 5500

# Option 2: Node.js (npx)
npx serve .

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

Then open http://localhost:5500 in your browser.

Do not open index.html directly with file:// — the browser will block JSON loading due to CORS policies.

See the simulator README for more details.

Repository Structure

AWS-Cloud-Foundations-Certification-Hub/
├── README.md                  This file
├── LICENSE                    MIT License
├── .gitignore                 Git ignore rules
│
├── simulator/                 CLF-C02 practice simulator
│   ├── README.md
│   ├── LICENSE
│   ├── .gitignore
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── aws-services.js
│   ├── assets/                AWS logos (SVG)
│   ├── data/                  Question batches (ES + EN)
│   └── icons/                 AWS service icons (SVG)
│
├── guide/                     Study guide 
├── notes/                     Personal notes 
└── resources/                 Curated resources 

Contributing
Contributions are welcome and appreciated. Here's how you can help:

Report a bug or an incorrect question — open an issue.

Suggest an improvement — start a discussion.

Submit a pull request — follow the standard GitHub flow:

Fork the repository.
Create a branch (git checkout -b feature/my-improvement).
Commit your changes.
Push to the branch.
Open a Pull Request.
License
MIT License. See LICENSE for details.

AWS, Amazon Web Services, and all related logos are trademarks of Amazon.com, Inc. or its affiliates. Their use in this project is for educational purposes only.

Contact
GitHub: @ValenciaFCarlos

LinkedIn: valencia-carlos

If this hub helps you prepare for the CLF-C02 exam, consider giving it a star on GitHub....