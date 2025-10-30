🧠 Credit Jambo — Admin Dashboard

The Credit Jambo Admin Dashboard is the backend + frontend control panel for managing all user and system activities in the Credit Jambo Savings Management System.
It provides full administrative control over users, devices, and transactions with real-time analytics and secure authentication.

📘 Table of Contents

Overview

Tech Stack

System Architecture

Features

Setup Instructions

Environment Variables

Database Setup

Folder Structure

API Overview

Security & Authentication

Future Enhancements

Developer

🧩 Overview

Admins use this dashboard to:

Approve and verify user devices

Monitor registered users

Manage and review transactions

View real-time insights (charts, summaries)

Securely log in using JWT-based authentication

⚙️ Tech Stack
Category	Technology
Frontend	React (Vite) + Tailwind CSS + Recharts
Backend	Node.js + Express.js
Database	MySQL
Authentication	JWT
Security	Helmet, CORS, Rate Limiting
Charts	Recharts
State Management	React Context API
🏗️ System Architecture
[React Admin Frontend] ⇄ [Express Backend API] ⇄ [MySQL Database]


Admin logs in via http://localhost:5174

Requests go to API (http://localhost:5000)

Backend validates token → queries MySQL → returns data

🚀 Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/<your-username>/creditjambo_admin.git
cd creditjambo_admin

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=creditjambo
JWT_SECRET=admin_secret_key
JWT_EXP=8h


Run backend:

npm start


→ API available at http://localhost:5000

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


→ Frontend runs on http://localhost:5174

🗄️ Database Setup

Open phpMyAdmin (or MySQL client)

Create database:

CREATE DATABASE creditjambo;


Import the SQL file found in:

database/creditjambo.sql


⚠️ The same database is used by both Admin and Client systems.
Ensure both .env files use DB_NAME=creditjambo.

🧑‍💻 Default Admin Account
Email	Password
admin@creditjambo.com	Admin@123
🧱 Folder Structure
creditjambo_admin/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── app.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── api/
    │   └── App.jsx
    └── index.html

🧠 API Overview
Endpoint	Method	Description
/api/auth/login	POST	Admin login
/api/devices	GET	List all devices
/api/devices/:id/verify	PUT	Verify device
/api/users	GET	List users
/api/users/:id	GET	View single user
/api/transactions	GET	All transactions
/api/transactions/:userId	GET	Transactions by user
/api/dashboard	GET	Dashboard summary
🔐 Security & Authentication

JWT auth for all admin routes

CORS restricted to http://localhost:5174

Helmet + Rate Limiting

Role-based access

📊 Features

✅ Secure login
✅ Analytics dashboard (charts & summaries)
✅ Manage users, devices, transactions
✅ Verify or delete devices
✅ View system balance and stats

🧩 Future Enhancements

Add audit logs

Multi-admin roles

CSV/PDF exports

Real-time notifications

👨‍💻 Developer

Name: Confy Eagle
Role: Full Stack Developer
Project: Junior Software Developer Practical Test
Year: 2024 – 2025
