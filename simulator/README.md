# AWS CLF-C02 Practice Simulator

Practice simulator for the **AWS Certified Cloud Practitioner (CLF-C02)** exam, featuring 1,200 questions organized by domain and weighted according to the official exam distribution.

**Author:** [ValenciaF. Carlos DevOps](https://github.com/ValenciaFCarlos)
**License:** MIT
**Status:** v0.1 — Functional prototype

---

## ⚠️ Important Disclaimer

This is an **independent educational project**. It is **NOT** related to, sponsored by, endorsed by, or affiliated with Amazon Web Services (AWS) or Amazon.com, Inc.

- **It is not an official exam** nor a replacement for it.
- All questions are **original practice material**, not leaked exam questions.
- Internal metrics (AWS Level, Exam Readiness, Success Estimate) are **estimates** and do not represent official AWS scores.
- The question bank **has not been reviewed by AWS** or by certified third parties.

If you find an ambiguous, incorrect, or poorly worded question, please open an issue.

---

## Features

- **1,200 questions** organized across the 4 official CLF-C02 domains.
- **Stratified sampling** using official exam weights: Cloud Concepts (24%), Security & Compliance (30%), Technology & Services (34%), Billing Pricing & Support (12%).
- **Practice Mode** (no time limit, progressive hints) and **Exam Mode** (timed, simulates the real exam).
- **Learning Cycle**: retry failed concepts with new questions to demonstrate real understanding.
- **Progressive hints** + contextual Concept Insight.
- **Final Report** with metric transparency: AWS Level, Exam Readiness, Success Estimate, and Needs Review.
- **Retry Report** and **Mastery Report** for concept recovery tracking.
- **Progress persistence** using `localStorage`.
- **Bilingual** (Spanish / English) with automatic fallback.
- **Light and dark theme**.

---

## Project Structure

.
├── index.html # Main interface
├── app.js # Simulator logic
├── styles.css # Design system
├── aws-services.js # AWS services catalog (ticker)
├── icons/ # AWS service icons
├── data/
│ ├── clf-c02-lote-1.json # Question batches (ES)
│ ├── clf-c02-lote-2.json
│ ├── ...
│ ├── clf-c02-lote-12.json
│ └── en/ # English version (optional)
│ ├── clf-c02-lote-1.json
│ └── ...
└── README.md



---

## Installation and Usage

### Requirements

- Modern browser (Chrome, Firefox, Edge, Safari).
- A local server (do not open `index.html` directly via `file://`).

### Option 1: VS Code + Live Server (recommended)

1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
3. Open the project folder in VS Code.
4. Right-click `index.html` → **"Open with Live Server"**.
5. The browser will open at `http://127.0.0.1:5500`.

### Option 2: Python (no VS Code required)

```bash
# Python 3
cd path/to/project
python -m http.server 5500

# Open in browser
# http://localhost:5500

Option 3: Node.js

npx serve .
# or
npx http-server -p 5500

⚠️ Do not do this
Do not open index.html directly by double-clicking it (file://). The browser will block JSON file loading due to CORS policies.

How to Use
Configure your session: choose the number of questions (10, 25, 50, or 100) and mode (Practice or Exam).

Select the domain: Mixed Exam (all) or a specific domain.

Practice: answer, use hints if needed, review explanations.

When finished: review your Final Report with preparation metrics.

Retry failed questions: use the Learning Cycle to recover weak concepts.

Simulator Metrics
AWS Level
Percentage of questions answered correctly on the first attempt, without hints. A strict metric of immediate mastery.

Exam Readiness
Preparation estimate that includes both mastered and recovered questions. Not a guarantee of passing the exam.

Success Estimate
Alignment of your performance with the official weights of the 4 domains. Not a prediction of passing.

Mastered / Recovered / Unresolved
Mastered: correct on first attempt, without hints.

Recovered: missed first, corrected afterwards (with or without hint).

Unresolved: not resolved (neither with hint nor on second attempt).

Needs Review
Unique concepts that presented difficulty during the session. Not individual questions.

More details available in the Final Report → "How are my metrics calculated?" section and in the About modal.

Tech Stack
HTML5 + CSS3 (custom properties, grid, flexbox).

Vanilla JavaScript (no frameworks, no build step).

localStorage for persistence.

Fetch API for data loading.

Custom Design System with tokens.

Browser Compatibility
Chrome 90+

Firefox 88+

Edge 90+

Safari 14+

Mobile: Responsive, but the experience is optimized for desktop.

Roadmap
v0.2 (next)
□ Question reporting mechanism.
□ Formula update for Exam Readiness and Success Estimate (higher rigor).
□ Persistent Learning Cycle badge.
□ Results export (PDF / CSV).
v0.3
□ Spaced repetition.
□ Historical statistics across sessions.
□ Full keyboard navigation.
□ Focus trap in modals.
v1.0
□ External question verification.
□ Offline mode with Service Worker.
□ AWS Skill Builder integration.
Contributing
Contributions are welcome, especially:

Reporting incorrect or ambiguous questions (open an issue with the question ID).

Translations to other languages.

Accessibility improvements.

UX suggestions.

Process
Fork the repository.

Create a branch (git checkout -b feature/my-improvement).

Commit your changes (git commit -m "feat: add X").

Push to the branch (git push origin feature/my-improvement).

Open a Pull Request.

Known Limitations
The question bank has not been verified by a certified instructor.

Internal metrics may inflate the perception of preparation if hints are overused.

No spaced repetition yet.

No results export yet.

EN→ES fallback is silent (if an English question is missing, the Spanish version is used without warning).

License
MIT License. See LICENSE for details.

AWS, Amazon Web Services, and all related logos are trademarks of Amazon.com, Inc. or its affiliates. Their use in this project is for educational purposes only.

Contact
GitHub: @ValenciaFCarlos

LinkedIn: valencia-carlos

Buy Me a Coffee: valenciaf.carlos

If this project helps you prepare for the CLF-C02, consider giving it a ⭐ on GitHub.

