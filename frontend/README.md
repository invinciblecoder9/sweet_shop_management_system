# 🍭 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built with modern technologies, featuring user authentication, inventory management, purchase functionality, admin panel, purchase history, and persistent login. This project demonstrates clean architecture, Test-Driven Development (TDD), Redux state management, responsive UI, and thoughtful user experience.

**Live Demo**: [https://your-app.vercel.app](https://your-app.vercel.app) *(replace with your deployed link if available)*

**Backend API**: `http://localhost:3000/api` (or deployed URL)

## 🚀 Features

### User Features
- Register and login with JWT-based authentication
- Persistent login across page refreshes (using `redux-persist`)
- Browse available sweets in a beautiful responsive grid
- Search and filter sweets by name, category, or price
- Purchase sweets (quantity decreases in real-time)
- Purchase button disabled when out of stock
- View personal **purchase history** with date, item, and price
- Real-time toast notifications for success/error

### Admin Features
- Dedicated Admin Panel (accessible only to ADMIN role)
- Add new sweets
- Update sweet details (name, category, price, quantity)
- Delete sweets
- Restock sweets with custom amount
- All changes reflect instantly across the app

### Technical Highlights
- Full Test-Driven Development (TDD) with high coverage
- Clean, maintainable code following SOLID principles
- Responsive and visually appealing UI with Tailwind CSS
- State management with Redux Toolkit
- Prisma ORM with PostgreSQL (adapter for Prisma 7+)
- JWT authentication with role-based access control
- Purchase history tracking

## 🛠️ Tech Stack

### Backend
- **Node.js** + **TypeScript**
- **Express.js**
- **Prisma ORM** (with PostgreSQL adapter)
- **PostgreSQL** database
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **React** + **TypeScript** (Create React App)
- **Redux Toolkit** + **redux-persist**
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **react-toastify** for notifications
- **React Hook Form** for forms

## 📸 Screenshots

![Login Page](./screenshots/login.png)
*Clean and modern login interface*

![Dashboard](./screenshots/dashboard.png)
*Responsive sweets grid with search and purchase buttons*

![Purchase Success](./screenshots/purchase-success.png)
*Real-time quantity update and toast notification*

![My Purchases Modal](./screenshots/my-purchases.png)
*Detailed purchase history with timestamps*

![Admin Panel](./screenshots/admin-panel.png)
*Full CRUD operations for sweets management*

![Admin Add/Edit](./screenshots/admin-add.png)
*Easy form to add or update sweets*

## 🏗️ Project Structure
