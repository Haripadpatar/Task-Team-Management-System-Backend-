🔗 Backend-only REST API | Tested with Postman | No frontend included

# Task & Team Management System (Backend)

A role-based backend application inspired by Jira/Trello, built using Node.js, Express, and MongoDB.  
The system supports authentication, role-based access control (RBAC), and ownership-based authorization.

---

## 🚀 Features
- JWT-based Authentication
- Role-Based Access Control (Admin, Manager, Member)
- Ownership-based data access
- Team creation and task assignment
- Task status workflow (todo → in-progress → done)

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Postman

---

## 👥 Roles & Permissions

| Role | Permissions |
|-----|------------|
| Admin | Create teams, view all data |
| Manager | Create teams, assign and delete tasks |
| Member | View and update assigned tasks only |

---

## 🔐 Authentication Flow
Signup → Login → JWT Token → Auth Middleware → Role Middleware → Controller

---

## 📌 API Endpoints

### Auth
- POST `/auth/signup`
- POST `/auth/login`

### Teams
- POST `/teams` (Admin, Manager)
- GET `/teams` (Authenticated)

### Tasks
- POST `/tasks` (Manager)
- GET `/tasks` (Manager: all, Member: assigned)
- PATCH `/tasks/:id` (Assigned user or Manager)
- DELETE `/tasks/:id` (Manager)

---

## ▶️ How to Run Locally

```bash
git clone <repo-url>
cd task-team-management-backend
npm install
npm run dev

Create a .env file:

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
