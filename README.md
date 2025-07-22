# Smart Scheduler

**Smart Scheduler** is a full-stack event management application where users can create, edit, delete, and archive events. It also features an **AI-powered categorization** system that automatically suggests a category for each event using natural language understanding.

> **Live Demo:** [smart-scheduler-seven.vercel.app](https://smart-scheduler-seven.vercel.app)

---

## Key Features

* Create, edit, delete, and archive events
* **AI-powered categorization** for suggested event categories
* Archive or restore completed tasks
* Fully responsive and modern UI (Tailwind CSS)
* Full-stack TypeScript project using Node.js and React

---

## 🛠 Tech Stack

| Frontend           | Backend                | Others                   |
| ------------------ | ---------------------- | ------------------------ |
| React + TS | Node.js + Express + TS | Tailwind CSS, Vercel     |

---

## 🧰 Setup Instructions

### ⚙️ Prerequisites

* Node.js v18+
* npm v9+
* Git

---

### 📦 Install Frontend

```bash
git clone https://github.com/Faey2023/smart-scheduler
cd smart-scheduler
npm install
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint                  | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| GET    | `/events`             | Get all events                               |
| POST   | `/events`             | Create a new event (with AI-based category)  |
| PUT    | `/events/:id`         | Update an existing event                     |
| DELETE | `/events/:id`         | Delete an event                              |
| PUT    | `/events/:id/archive` | Archive an event                             |
