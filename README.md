# Job Application Tracker

A full-stack web app I built to track my own internship applications — company, role, status, all in one place, with secure login so my data stays mine.

## Live Demo
🔗 [varsha-jobtracker.vercel.app](https://varsha-jobtracker.vercel.app)

## Features
- User authentication (signup/login) with JWT and hashed passwords
- Add, update, and delete job applications
- Track status: Applied, Interview, Offer, Rejected
- Filter applications by status
- User-scoped data — each user only sees their own applications
- Fully deployed and live

## Tech Stack
**Frontend:** React, TypeScript, Tailwind CSS, React Router, Vite
**Backend:** Node.js, Express, MongoDB, Mongoose
**Auth:** JWT, bcrypt
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Why I built this
I was manually tracking internship applications and kept losing track of statuses. Built this to solve that problem for myself, while learning full-stack development end-to-end — from database design to authentication to deployment.

## Architecture

Frontend (React/Vite) → Vercel
Backend (Express API) → Render
Database (MongoDB) → MongoDB Atlas

Frontend communicates with the backend via a REST API, authenticated using JWT tokens stored client-side. All job data is scoped to the logged-in user at the database query level.

## Running Locally

Backend:
cd backend
npm install
npm start


Frontend:
npm install
npm run dev


You'll need a `.env` file in `/backend` with `MONGO_URI`, `JWT_SECRET`, and `PORT`.