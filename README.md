# 🎫 Concert Ticket System

A full-stack web application for managing concert seat reservations, built with NestJS (backend), React (frontend), MongoDB, and React Query.

---

## 📦 Tech Stack

- **Frontend:** React (Next.js), TailwindCSS, React Query, Redux
- **Backend:** NestJS, MongoDB, Mongoose

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Chayapol-FELIZ/concert-ticket-app.git
```

### 2. Install Dependencies

#### Backend

```bash
cd concert-ticket-backend
npm install
```

#### Frontend

```bash
cd ../concert-ticket-frontend
npm install
```

### 3. Create Environment Variables

#### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://uat-iam:123@cluster0.a8w3x.mongodb.net/datawow-test?retryWrites=true&w=majority&appName=Cluster0
```

#### Frontend (.env)

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

## ▶️ Running the Test App

### Backend

```bash
cd concert-ticket-backend
npm run start:dev
```

### Frontend

```bash
cd concert-ticket-frontend
npm run dev
```

### Sign In (Mock Users)

```bash
  username: 'admin'
  password: 'P@ssw0rd'
```

```bash
  username: 'user'
  password: 'P@ssw0rd'
```

---

## An Overview About the Design of the Application’s Architecture
Database:
	•	Uses MongoDB
	•	Collections:
	    •	concerts – Stores concert details.
	    •	reservations – Tracks individual user reservations with statuses.
	    •	reservationlogs – Keeps an audit trail for actions like “reserve” and “cancel”.

Schema Relationships:
	•	Reservation refers to:
	    •	a User by ID (UUID string)
	    •	a Concert by ObjectId
	•	ReservationLog captures a snapshot of actions (userId, action, concert reference)

Frontend Integration:
	•	Frontend (assumed to be Next.js) communicates via REST APIs.
	•	Each reservation action is handled via endpoints

---

## Frontend (Next.js + React + Tailwind CSS)
Next.js, React, Tailwind CSS, Axios, @tanstack/react-query, Redux Toolkit, React Hook Form + Zod, Material UI Icons

## Backend (NestJS + MongoDB + Mongoose)
NestJS, @nestjs/core, @nestjs/common, @nestjs/mongoose

---

## ✅ Running Tests

```bash
# Backend tests
cd concert-ticket-backend
npm run test concerts.service.spec.ts
```

---
