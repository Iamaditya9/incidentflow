# ⚡ IncidentFlow: Human-Centered Real-Time Incident Response Platform

> A production-style incident coordination and operations dashboard built with **React, Node.js, Express, Socket.IO, and MongoDB**. Designed specifically around human-computer interaction (HCI) principles, cognitive load reduction, and rapid operational decision-making.

[![CI](https://github.com/Iamaditya9/incidentflow/actions/workflows/ci.yml/badge.svg)](https://github.com/Iamaditya9/incidentflow/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20WebSockets-green)

---

## 📌 Quick Navigation
[Overview](#overview) · [Architecture](#architecture) · [API Endpoints](#api-endpoints) · [HCI Principles](#hci-principles) · [Local Setup](#local-setup) · [Author](#author)

---

## 🔍 Overview

**IncidentFlow** simulates a high-throughput enterprise operations center where distributed systems report incidents in real time. Unlike standard CRUD applications, IncidentFlow is engineered around strict usability heuristics:
* **Immediate Situational Awareness:** Critical anomalies are visually prioritized to minimize operator scan time.
* **Real-Time Event Stream:** Socket.IO pushes live incident updates instantly across connected dashboard clients without requiring page refreshes.
* **Error Prevention & Feedback:** Destructive or resolving actions require deliberate confirmation, backed by immutable audit timelines.

---

## 🏗️ Architecture

```text
React Client (Vite + Tailwind)
       │
       ├── HTTP REST API (Express) ──> MongoDB Database
       │
       └── WebSocket (Socket.IO) <── Real-Time Event Dispatcher
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Service health check |
| GET | `/api/incidents` | List and filter active incidents |
| POST | `/api/incidents` | Create a new operational incident |
| PATCH | `/api/incidents/:id` | Update incident workflow status / assignment |
| GET | `/api/systems` | Retrieve monitored system statuses |

---

## 🧠 HCI Principles

1. **Recognition over Recall:** Critical actions (Acknowledge, Assign, Resolve) are exposed as direct interactive buttons rather than hidden console commands.
2. **Reduced Cognitive Load:** Visual hierarchy strictly separates critical alerts from routine telemetry.
3. **Accessibility:** Severity indicators use redundant iconography and text labels rather than color alone.

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally or via Atlas

### Installation

```bash
# Clone repository
git clone https://github.com/Iamaditya9/incidentflow.git
cd incidentflow

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running Locally

Run backend:

```bash
cd server
npm run dev
```

Run frontend:

```bash
cd client
npm run dev
```

---

## 👤 Author

**Aditya Yadav**

Bachelor of Applied Computer Science (Software Development Co-op), Business Minor | Acadia University

- GitHub: https://github.com/iamaditya9
- LinkedIn: https://www.linkedin.com/in/aditya-yadav-tech/
- Email: yadyaditya39@gmail.com

---
