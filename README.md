# 💰 FinScale Dashboard (MERN Stack)

A clean, interactive, and premium finance dashboard built to evaluate frontend development skills and MERN stack proficiency.

## 🚀 Key Features

- **Dashboard Overview**: Summary cards for Balance, Income, and Expenses with real-time trend visualizations.
- **Interactive Visualizations**: Time-based balance trend (Area Chart) and categorical spending breakdown (Pie Chart).
- **Transaction Management**: Search, filter, and sort transactions with ease.
- **Simulated RBAC**: Seamlessly switch between **Admin** and **Viewer** roles.
  - *Admin*: Full control to add, edit, or delete transactions.
  - *Viewer*: Read-only access to financial data.
- **Financial Insights**: Automated analysis of savings rates, spending hotspots, and budget alerts.
- **Premium UI/UX**: Dark-themed, glassmorphism-inspired design with smooth animations and responsive layout.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Vite, Recharts, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **State Management**: React Context API for clean and modular state handling.

## 📂 Project Structure

```text
├── client/          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Modular UI Components
│   │   ├── context/     # State & RBAC Context
│   │   ├── data/        # Mock Data & Schemas
│   │   └── App.tsx      # Main Layout & Navigation
├── server/          # Node/Express Backend
│   ├── config/      # DB Connection Logic
│   └── index.js     # API Endpoints & CRUD
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed.
- (Optional) MongoDB running locally or a MongoDB Atlas URI.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd server
npm install
npm run dev
```

## 🧩 Approach & Decisions

- **Aesthetics First**: Focused on a premium dark mode design to provide a high-end feel.
- **Modular Components**: Built reusable components (StatCard, InsightCard) for scalability.
- **State Efficiency**: Used Context API for shared state (role, transactions) to avoid prop-drilling while keeping it lighter than Redux for this scope.
- **Reliable Mocking**: Implemented a robust mock data system so the dashboard is fully functional even without a database connection.
- **Role Simulation**: Added a simple toggle in the sidebar to demonstrate RBAC behavior dynamically.

---
*Created with ❤️ for the Finance Dashboard Assessment.*
