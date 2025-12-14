# Sweet Shop Management System

A modern full-stack **Sweet Shop Management System** built as a Test-Driven Development (TDD) kata. This project features user authentication, inventory management, real-time purchase functionality, admin panel, purchase history, and a beautiful responsive UI.

**Live Demo**: https://sweet-shop-management-system-silk.vercel.app

## Features

### User Features
- User registration and login with JWT authentication
- Persistent login across page refreshes (using `redux-persist`)
- Responsive dashboard displaying available sweets in a grid layout
- Search and filter sweets by name, category, or price
- Purchase sweets with real-time quantity update
- Purchase button disabled when stock is zero
- View personal **purchase history** in a modal with item name, price, and timestamp
- Toast notifications for success and error messages

### Admin Features
- Dedicated **Admin Panel** (accessible only to users with `role: "ADMIN"`)
- Add new sweets
- Update sweet details (name, category, price, quantity)
- Delete sweets
- Restock sweets with custom amount
- All changes reflect instantly on the dashboard

### Technical Highlights
- Test-Driven Development with high test coverage
- Clean architecture following SOLID principles
- Prisma ORM with PostgreSQL (Prisma 7+ with adapter)
- Role-based access control (USER / ADMIN)
- Purchase history tracking per user
- Responsive and visually appealing design with Tailwind CSS
- State management with Redux Toolkit

## Tech Stack

### Backend
- Node.js + TypeScript
- Express.js
- Prisma ORM + PostgreSQL
- JWT for authentication
- bcrypt for password hashing
- CORS enabled for frontend

### Frontend
- React + TypeScript (Create React App)
- Redux Toolkit + redux-persist
- React Router v6
- Tailwind CSS
- Axios for API calls
- react-toastify for notifications
- React Hook Form for forms

## 📸 Screenshots

![Dashboard](https://raw.githubusercontent.com/invinciblecoder9/sweet_shop_management_system/screenshots/DashboardPage.png)

![Dashboard Full](https://raw.githubusercontent.com/invinciblecoder9/sweet_shop_management_system/screenshots/DashboardFull.png)

![Purchase Success](https://raw.githubusercontent.com/invinciblecoder9/sweet_shop_management_system/screenshots/Purchase.png)




## ⚙️ Local Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env  # Set REACT_APP_API_URL=http://localhost:3000/api
npm start
```

### Admin Access

To use admin features:

1. Use Postman or curl to create an admin user:

```bash
POST {BACKEND_URL}/api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

2. Login with these credentials in the app.

### My AI Usage

I used Grok (by xAI) throughout development for:

-> Project architecture and folder structure design

-> Generating TDD test cases and debugging failures

-> Resolving Prisma 7+ adapter and singleton issues

-> Implementing Redux slices, persistence, and state management

-> Fixing deployment issues (CORS, environment variables, Axios baseURL)

-> Creating responsive Tailwind layouts and modals

-> Debugging authentication, real-time updates, and API routing

Grok accelerated development significantly **(~40-50% faster)** while I manually reviewed, tested, and refined every part for quality and understanding.
**Reflection**: AI tools like Grok are powerful for overcoming blockers and exploring best practices, but human oversight is crucial for architecture, UX, and production readiness.

### Deployment

-> **Frontend**: Deployed on Vercel → https://sweet-shop-management-system-silk.vercel.app

-> **Backend + Database**: Deployed on Render
