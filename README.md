# 🎫 Concert Ticket System

A full-stack web application for managing concert seat reservations, built with NestJS (backend), React (frontend), MongoDB, and React Query.

---

## 📦 Tech Stack

- **Frontend:** React (Next.js), TailwindCSS, React Query
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

## ✅ Running Tests

```bash
# Backend tests
cd backend
npm run test
```

---
