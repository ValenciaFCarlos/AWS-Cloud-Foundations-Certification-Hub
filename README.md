# 🚀 AWS Cloud Foundations & Certification Hub

<p align="center">
  <img src="./images/banner-main.png" alt="AWS Cloud Foundations & Certification Hub">
</p>

<p align="center">

![AWS](https://img.shields.io/badge/AWS-Cloud%20Practitioner-orange)
![Questions](https://img.shields.io/badge/Questions-1220%2B-blue)
![Simulator](https://img.shields.io/badge/Simulator-Interactive-success)
![Language](https://img.shields.io/badge/Language-EN%20%7C%20ES-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

</p>

> 🎯 **A complete learning hub for AWS Cloud Foundations and AWS Certified Cloud Practitioner (CLF-C02).**
>
> Study guides, architecture notes, certification preparation resources, and an interactive practice simulator designed to help you understand cloud computing—not just memorize AWS services.

<p align="center">
  <img src="./images/aws-certified-cloud-practitioner.svg" width="220" alt="AWS Certified Cloud Practitioner Badge">
</p>

---

## 📋 Table of Contents

- [☁️ About This Project](#️-about-this-project)
- [📚 What's Included](#-whats-included)
- [📊 AWS Certified Cloud Practitioner (CLF-C02)](#-aws-certified-cloud-practitioner-clf-c02)
- [🧪 CLF-C02 Practice Simulator](#-clf-c02-practice-simulator)
- [📖 Study Guide](#-study-guide)
- [🏗️ Repository Structure](#️-repository-structure)
- [🚀 Running the Simulator Locally](#-running-the-simulator-locally)
- [📚 Recommended AWS Resources](#-recommended-aws-resources)
- [🤝 Contributing](#-contributing)
- [⚠️ Disclaimer](#️-disclaimer)
- [⭐ Support the Project](#-support-the-project)
- [👨‍💻 Author](#-author)

---

# ☁️ About This Project

AWS Cloud Foundations & Certification Hub is a learning repository designed to help students, IT professionals, career changers, and cloud enthusiasts build a strong foundation in AWS Cloud.

The objective is not simply to pass a certification exam.

The objective is to understand:

- Cloud Computing fundamentals
- AWS architecture principles
- Core AWS services
- Security and compliance concepts
- Cost optimization strategies
- Cloud economics
- Real-world cloud use cases
- Cloud architecture thinking
- Certification preparation

This repository combines structured learning material with hands-on practice and exam preparation.

---

# 📚 What's Included

| Resource | Description |
|-----------|-------------|
| 🎯 Practice Simulator | Interactive AWS CLF-C02 simulator with 1,220+ questions |
| 📖 Study Guide | Structured learning path aligned with official exam domains |
| 📝 Notes | Personal notes, summaries, and mental models |
| 🔗 Resources | Curated AWS learning resources |
| ☁️ Cloud Architecture Concepts | Foundational architecture knowledge |
| 🎓 Certification Preparation | AWS certification study material |

---

# 📊 AWS Certified Cloud Practitioner (CLF-C02)

### Official AWS Resources

🔗 Certification Page

https://aws.amazon.com/certification/certified-cloud-practitioner/

📄 Official Exam Guide (PDF)

https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf

---

## 🎓 Exam Overview

| Aspect | Details |
|----------|----------|
| Duration | 90 Minutes |
| Questions | 65 |
| Format | Multiple Choice & Multiple Response |
| Passing Score | 700 / 1000 |
| Cost | $100 USD |
| Validity | 3 Years |
| Prerequisites | None |

---

## 🎯 Official Exam Domain Weights

| Domain | Weight |
|----------|----------|
| Cloud Concepts | 24% |
| Security and Compliance | 30% |
| Cloud Technology and Services | 34% |
| Billing, Pricing, and Support | 12% |

---

# 🧪 CLF-C02 Practice Simulator

The simulator included in this repository provides an interactive environment for learning and practicing AWS Cloud Practitioner concepts.

Built with:

- HTML
- CSS
- Vanilla JavaScript

No frameworks.

No backend.

No external dependencies.

---

## ✨ Simulator Features

✅ 1,220+ Questions

✅ Official Domain Weight Distribution

✅ Practice Mode

✅ Exam Mode

✅ Learning Cycle

✅ Hint System

✅ Concept Insight

✅ AWS Level

✅ Exam Readiness

✅ Success Estimate

✅ Needs Review Tracking

✅ Domain Performance Analysis

✅ Dark Mode

✅ Light Mode

✅ Spanish & English Support

✅ Local Progress Persistence

✅ Fully Client-Side

---

## 🧠 Learning Cycle

One of the key features of the simulator.

Instead of repeating the exact same failed question, the Learning Cycle reinforces weak concepts by generating a new question from the same topic.

```text
Incorrect Answer
        ↓
Hint
        ↓
Concept Review
        ↓
Learning Cycle
        ↓
New Question from Same Concept
        ↓
Concept Validation
```

This promotes understanding rather than memorization.

---

# 📖 Study Guide

The study guide covers all official CLF-C02 domains.

---

## 🌩️ Cloud Concepts

Topics include:

- What is Cloud Computing
- Benefits of Cloud Computing
- Elasticity vs Scalability
- Cloud Deployment Models
- Cloud Service Models
- AWS Global Infrastructure

---

## 🔒 Security & Compliance

Topics include:

- Shared Responsibility Model
- AWS Identity and Access Management (IAM)
- Multi-Factor Authentication (MFA)
- Security Services
- Compliance Programs
- Security Best Practices

---

## ⚙️ Cloud Technology & Services

Topics include:

- Amazon EC2
- AWS Lambda
- Amazon S3
- Amazon EBS
- Amazon EFS
- Amazon RDS
- Amazon DynamoDB
- Amazon VPC
- Amazon CloudFront
- Amazon Route 53
- Elastic Load Balancing

---

## 💰 Billing, Pricing & Support

Topics include:

- AWS Pricing Models
- AWS Cost Explorer
- AWS Budgets
- Reserved Instances
- Savings Plans
- AWS Support Plans
- AWS Organizations

---

# 🏗️ Repository Structure

```text
AWS-Cloud-Foundations-Certification-Hub
│
├── images/
│   ├── banner-main.png
│   ├── banner-simulator.png
│   ├── good-luck.png
│   └── aws-certified-cloud-practitioner.svg
│
├── simulator/
│   ├── index.html
│   ├── app.js
│   ├── aws-services.js
│   ├── styles.css
│   ├── data/
│   ├── assets/
│   └── icons/
│
├── guide/
├── notes/
├── resources/
└── README.md
```

---

# 🚀 Running the Simulator Locally

The simulator loads JSON files using `fetch()`.

Because of this, it must be served through a local HTTP server.

### Python

```bash
cd simulator
python -m http.server 5500
```

### Node.js

```bash
cd simulator
npx serve .
```

### VS Code

Use the Live Server extension.

Then open:

```text
http://localhost:5500
```

---

# 📚 Recommended AWS Resources

### AWS Skill Builder

https://skillbuilder.aws

Official AWS learning platform.

### AWS Cloud Practitioner Essentials

https://skillbuilder.aws/learn

Official AWS foundational course for CLF-C02 candidates.

### AWS Documentation

https://docs.aws.amazon.com

Official AWS documentation.

### AWS Well-Architected Framework

https://aws.amazon.com/architecture/well-architected/

Learn AWS architectural best practices and design principles.

---

# 🤝 Contributing

Contributions are welcome.

Ways to contribute:

- Report bugs
- Suggest improvements
- Submit pull requests
- Improve documentation
- Report ambiguous questions
- Share study resources

---

# ⚠️ Disclaimer

This project is an independent educational resource.

It is not affiliated with, endorsed by, sponsored by, or maintained by Amazon Web Services (AWS).

AWS®, Amazon Web Services®, Cloud Practitioner®, and all related trademarks belong to Amazon.com, Inc. and its affiliates.

Question content has been created and organized for educational purposes based on AWS Cloud Practitioner learning objectives and publicly available AWS training resources.

---

# ⭐ Support the Project

If this repository helps you in your AWS learning journey, consider giving it a ⭐.

It helps more people discover free AWS learning resources.

---

# 👨‍💻 Author

## ValenciaF. Carlos DevOps

AWS Certified Cloud Practitioner | Cloud Architecture Student | DevOps Engineer

Passionate about AWS, Cloud Architecture, Infrastructure Design, Automation, and Continuous Learning.

🔗 GitHub  
https://github.com/ValenciaFCarlos

🔗 LinkedIn  
https://www.linkedin.com/in/valencia-carlos-77a1b213b/

☁️ Feel free to connect, collaborate, or contribute to this project.

---

---

## 🎯 Good Luck

<p align="center">
  <img src="./images/good-luck.png" alt="Good Luck">
</p>

> ☁️ Cloud is not about memorizing services.
>
> It is about understanding systems, architecture, trade-offs, and solving real business problems.

---

**Last Updated:** September 2026  
**Certification Version:** AWS Certified Cloud Practitioner (CLF-C02)
