# 🚀 AWS CLF-C02 Practice Simulator

![AWS CLF-C02 Practice Simulator](docs/banner-simulator.png)

> 🎯 **Interactive learning platform for the AWS Certified Cloud Practitioner (CLF-C02) certification.**
>
> Built to help learners understand AWS concepts, reinforce weak areas, and prepare for the exam through active practice rather than memorization.
>
> Featuring **1,220+ unique practice questions** available in **English and Spanish**, weighted according to the official AWS CLF-C02 exam blueprint.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![AWS CLF-C02](https://img.shields.io/badge/AWS-CLF--C02-orange)
![Questions](https://img.shields.io/badge/Questions-1220%2B-blue)
![Languages](https://img.shields.io/badge/Languages-English%20%7C%20Spanish-green)
![Built With](https://img.shields.io/badge/Built%20With-Vanilla%20JavaScript-black)

---

# ⚠️ Important Disclaimer

This is an **independent educational project**.

It is **NOT** affiliated with, sponsored by, endorsed by, or maintained by Amazon Web Services (AWS).

- This simulator is **not an official AWS exam**.
- Questions are **original practice content** created for learning purposes.
- Internal metrics (**AWS Level**, **Exam Readiness**, **Success Estimate**) are educational estimates and **do not represent official AWS scores**.
- This project should be used as a **study companion**, not as a guarantee of certification success.

If you find an ambiguous, incorrect, or misleading question, please open an issue.

---

# 🎯 Target Certification

Designed for:

### AWS Certified Cloud Practitioner (CLF-C02)

🔗 Official Certification Page

https://aws.amazon.com/certification/certified-cloud-practitioner/

📄 Official Exam Guide

https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf

---

## Official Domain Distribution

The simulator follows the official CLF-C02 exam blueprint:

| Domain | Weight |
|----------|----------|
| Cloud Concepts | 24% |
| Security & Compliance | 30% |
| Cloud Technology & Services | 34% |
| Billing, Pricing & Support | 12% |

---

# ✨ Why This Simulator?

Most CLF-C02 simulators only tell you whether an answer is right or wrong.

This simulator was designed to help learners understand **why**.

Key learning features include:

- 🧠 Learning Cycle
- 🎯 Concept Recovery
- 💡 Progressive Hints
- 📚 Concept Insight
- 🔍 Weak Concept Tracking
- 📈 AWS Level
- 🎓 Exam Readiness
- 📊 Success Estimate
- 🌎 Bilingual Question Bank
- 📋 Transparent Metrics
- 💾 Progress Persistence
- 🌙 Dark Mode

---

# 🧪 Features

### Question Bank

✅ 1,220+ unique questions

✅ English and Spanish support

✅ Domain-based practice

✅ Mixed exam sessions

✅ Weighted according to AWS official distribution

---

### Practice Mode

- No timer
- Progressive hints
- Concept explanations
- Immediate feedback
- Learning-focused experience

---

### Exam Mode

- Timed session
- Simulates exam pressure
- Domain-balanced question selection
- End-of-session performance analysis

---

### Learning Cycle

One of the core differentiators of this simulator.

Instead of repeating the same failed question, the simulator generates a different question from the same concept.

```text
Incorrect Answer
        ↓
Hint
        ↓
Concept Insight
        ↓
Learning Cycle
        ↓
New Question
        ↓
Concept Validation
```

This encourages understanding instead of memorization.

---

# 📊 Learning Metrics

The simulator includes several performance metrics.

---

## AWS Level

Measures:

> Percentage of questions answered correctly on the first attempt without using hints.

Represents immediate mastery.

---

## Exam Readiness

Measures:

> Overall preparation level considering both mastered and recovered concepts.

Represents learning progress, not an official AWS score.

---

## Success Estimate

Measures:

> Alignment between your performance and the official CLF-C02 domain weighting.

Designed to identify strengths and weaknesses across exam domains.

---

## Needs Review

Tracks:

> Unique concepts that presented difficulties during the session.

Helps focus future study efforts.

---

## Transparency

Every metric includes:

- Tooltip explanations
- Calculation details
- FAQ references
- Final Report documentation

---

# 🏗️ Project Structure

```text
simulator/
│
├── index.html
├── app.js
├── styles.css
├── aws-services.js
│
├── assets/
│   ├── aws-logo.svg
│   └── aws-black.svg
│
├── data/
│   ├── clf-c02-lote-1.json
│   ├── clf-c02-lote-2.json
│   ├── ...
│   └── en/
│
├── icons/
│
└── README.md
```

---

# 🚀 Running Locally

The simulator loads question data using `fetch()`.

Because of browser security policies, it must be served through a local web server.

---

## Option 1 — VS Code + Live Server

1. Open the project in VS Code
2. Install Live Server
3. Right-click `index.html`
4. Select **Open with Live Server**

---

## Option 2 — Python

```bash
cd simulator
python -m http.server 5500
```

Open:

```text
http://localhost:5500
```

---

## Option 3 — Node.js

```bash
npx serve .
```

or

```bash
npx http-server -p 5500
```

---

⚠️ Do NOT open:

```text
file://index.html
```

Modern browsers block JSON loading when using the file protocol.

---

# 📚 Recommended AWS Resources

### AWS Skill Builder

https://skillbuilder.aws

Official AWS learning platform.

---

### AWS Cloud Practitioner Essentials

https://skillbuilder.aws/learn

Official foundational AWS course.

---

### AWS Documentation

https://docs.aws.amazon.com

Official AWS documentation.

---

### AWS Well-Architected Framework

https://aws.amazon.com/architecture/well-architected/

Architectural best practices and design principles.

---

# 🤝 Contributing

Contributions are welcome.

You can help by:

- Reporting incorrect questions
- Reporting ambiguous wording
- Improving documentation
- Suggesting UX improvements
- Improving accessibility
- Adding new learning resources

---

## Reporting Question Issues

If you find a question that appears incorrect:

- Include the Question ID
- Explain the issue
- Provide supporting AWS documentation if possible

---

# 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- LocalStorage
- Custom Design System

No frameworks.

No backend.

No dependencies.

---

# 📱 Browser Support

| Browser | Supported |
|----------|----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Edge | ✅ |
| Safari | ✅ |

Desktop experience is recommended.

---

# ⭐ Support The Project

If this simulator helps you prepare for AWS certification:

⭐ Star the repository

🐛 Report issues

🔄 Share improvements

📢 Share it with other AWS learners

---

# 👨‍💻 Author

## ValenciaF. Carlos DevOps

Cloud Architecture Student • AWS Learner • DevOps Enthusiast

### GitHub

https://github.com/ValenciaFCarlos

### LinkedIn

https://www.linkedin.com/in/carlos-valencia-f

---

![Good Luck](docs/good-luck.png)

> ☁️ Cloud is not about memorizing services.
>
> It is about understanding systems, architecture, trade-offs, and solving real business problems.

---

**Version:** v15.3  
**Questions:** 1,220+  
**Languages:** English & Spanish  
**Certification:** AWS Certified Cloud Practitioner (CLF-C02)
