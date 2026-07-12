<<<<<<< HEAD
# TransitOps - Smart Transport Operations Platform

TransitOps is a MERN hackathon starter for vehicle, driver, trip, maintenance, fuel, expense, and analytics management.

## What is included

- React + Vite frontend with responsive dashboard, sidebar, dark mode, CRUD forms, charts, and CSV export.
- Node.js + Express backend with JWT authentication, RBAC middleware, MongoDB/Mongoose models, and REST APIs.
- Mandatory business rules from the problem statement implemented in `backend/src/services/businessRules.js`.
- Seed data for a quick demo.

## Team split

### Member 1 - Frontend Lead

Owns `frontend/`.

- Login page
- Dashboard UI
- Sidebar navigation
- Vehicle, driver, trip, maintenance, expense, and report screens
- Dark mode
- Responsive Tailwind styling
- Charts using Recharts

### Member 2 - Backend & Authentication

Owns backend setup, auth, models, and normal REST APIs.

- `backend/src/server.js`
- `backend/src/config/db.js`
- `backend/src/middleware/auth.js`
- `backend/src/models/*`
- `backend/src/routes/auth.routes.js`
- Vehicle/driver/fuel/expense routes

### Member 3 - Business Logic

Owns `backend/src/services/businessRules.js` and trip/maintenance routes.

Implemented mandatory rules:

- Vehicle registration number is unique.
- Retired or In Shop vehicles are hidden from dispatch selection.
- Expired-license or Suspended drivers cannot be assigned.
- Driver/vehicle already On Trip cannot be assigned again.
- Cargo weight cannot exceed vehicle capacity.
- Dispatch changes vehicle and driver to On Trip.
- Completion restores both to Available.
- Cancellation of dispatched trip restores both to Available.
- Opening maintenance changes vehicle to In Shop.
- Closing maintenance restores vehicle to Available unless retired.

### Member 4 - Analytics & Extra Features

Owns reports, dashboard calculations, charts, CSV export, search/filter polish, and optional extras.

- `backend/src/routes/analytics.routes.js`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Reports.jsx`
- CSV export in `frontend/src/api/client.js`
- Bonus ideas: email reminders, PDF export, document uploads

## Setup steps

1. Install Node.js and MongoDB locally.
2. Open this folder in VS Code.
3. Create backend env file:

```bash
cd backend
copy .env.example .env
```

4. Create frontend env file:

```bash
cd ../frontend
copy .env.example .env
```

5. Install dependencies:

```bash
cd ..
npm run install:all
```

6. Start MongoDB.
7. Seed demo data:

```bash
npm run seed
```

8. Start backend:

```bash
npm run dev:backend
```

9. In a second terminal, start frontend:

```bash
npm run dev:frontend
```

10. Open `http://localhost:5173`.

Demo login:

- Email: `admin@transitops.com`
- Password: `password123`

## GitHub upload steps

1. Create a new GitHub repository named `transitops`.
2. Open terminal inside this folder.
3. Run:

```bash
git init
git add .
git commit -m "Initial TransitOps hackathon project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/transitops.git
git push -u origin main
```

4. In the README on GitHub, keep the setup steps visible so judges can run the app.

## Suggested 8-hour plan

Hour 1:

- Everyone clones repo.
- Member 2 runs backend.
- Member 1 runs frontend.
- Member 3 tests business rules with seeded data.
- Member 4 checks dashboard and reports.

Hours 2-4:

- Member 1 improves UI and responsiveness.
- Member 2 completes missing CRUD/update/delete endpoints if needed.
- Member 3 adds stronger validations and demo test cases.
- Member 4 adds filters, chart polish, CSV/PDF/email bonus if time permits.

Hours 5-6:

- Integrate all changes.
- Fix bugs.
- Make sure demo flow works.

Hours 7-8:

- Prepare presentation.
- Record screenshots.
- Push final repo.
- Practice the demo script.

## Demo script

1. Login as admin.
2. Show dashboard KPIs.
3. Add a vehicle with a unique registration number.
4. Add a driver with a valid license.
5. Create and dispatch a trip.
6. Show vehicle and driver become On Trip.
7. Complete trip and show both return to Available.
8. Open maintenance and show vehicle becomes In Shop.
9. Show reports and export CSV.
10. Try assigning overloaded cargo or expired-license driver and show the validation error.
=======
# 🚚 TransitOps – Smart Transport Operations Platform

> A modern fleet and transport management platform built for the **TransitOps Hackathon**.

---

## 📖 Overview

TransitOps is a web-based Transport Operations Management System that helps organizations digitize and streamline their fleet operations. The platform centralizes vehicle management, driver management, trip scheduling, maintenance tracking, fuel and expense logging, and operational analytics into a single dashboard.

Instead of relying on spreadsheets and manual records, TransitOps provides a secure, role-based system that improves operational efficiency, reduces scheduling conflicts, and provides real-time insights into fleet performance.

---

## ✨ Features

### 🔐 Authentication & Authorization

* Secure Login
* JWT Authentication
* Password Encryption
* Role-Based Access Control (RBAC)

Supported Roles:

* Fleet Manager
* Dispatcher
* Safety Officer
* Financial Analyst

---

### 📊 Dashboard

The dashboard provides a quick overview of fleet operations through KPI cards and analytics.

Dashboard includes:

* Active Vehicles
* Available Vehicles
* Vehicles in Maintenance
* Active Trips
* Pending Trips
* Drivers On Duty
* Fleet Utilization
* Recent Activities
* Operational Charts

---

### 🚛 Vehicle Management

Manage the complete vehicle registry.

Features:

* Register new vehicles
* Edit vehicle details
* Delete vehicles
* View vehicle information
* Track vehicle status
* Search & Filter vehicles

Vehicle Status:

* Available
* On Trip
* In Shop
* Retired

---

### 👨‍✈️ Driver Management

Maintain driver information and availability.

Features:

* Register drivers
* Edit driver information
* License tracking
* Safety score tracking
* Driver availability
* Search & Filter

Driver Status:

* Available
* On Trip
* Off Duty
* Suspended

---

### 📦 Trip Management

Create and manage transport operations.

Trip Lifecycle:

Draft

↓

Dispatched

↓

Completed

or

Cancelled

Trip Information:

* Source
* Destination
* Assigned Vehicle
* Assigned Driver
* Cargo Weight
* Planned Distance
* Current Status

---

### 🔧 Maintenance Management

Track vehicle servicing and repairs.

Features:

* Create maintenance requests
* View maintenance history
* Update maintenance status
* Automatically block vehicles under maintenance

---

### ⛽ Fuel Management

Track fuel usage for every vehicle.

Includes:

* Fuel quantity
* Cost
* Date
* Vehicle
* Fuel history

---

### 💰 Expense Management

Manage transportation-related expenses.

Expense Types:

* Fuel
* Maintenance
* Toll
* Parking
* Miscellaneous

---

### 📈 Reports & Analytics

Generate operational insights using interactive charts and reports.

Analytics include:

* Fleet Utilization
* Fuel Efficiency
* Operational Cost
* Vehicle ROI
* Vehicle Status Distribution
* Trip Statistics

---

## ✅ Business Rules

TransitOps automatically enforces important business rules.

* Vehicle registration numbers must be unique.
* Vehicles in maintenance cannot be dispatched.
* Retired vehicles cannot be assigned to trips.
* Drivers with expired licenses cannot drive.
* Suspended drivers cannot be assigned.
* A vehicle already on a trip cannot be assigned again.
* A driver already on a trip cannot be assigned again.
* Cargo weight cannot exceed vehicle capacity.
* Dispatching a trip automatically updates both vehicle and driver status.
* Completing a trip restores vehicle and driver availability.
* Maintenance automatically updates vehicle status.
* Fuel and maintenance costs contribute to operational analytics.

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

---

## 📂 Project Structure

```
TransitOps/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/shadow0378/transitops.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 📸 Screenshots

> Screenshots will be added after development.

* Login
* Dashboard
* Vehicles
* Drivers
* Trips
* Maintenance
* Fuel Logs
* Expenses
* Reports

---

## 🌟 Future Enhancements

* Email reminders for expiring licenses
* Vehicle document management
* PDF report generation
* Advanced analytics
* Dark Mode
* Notification system
* Mobile application
* GPS integration

---

## 👥 Team

| Member   | Responsibility           |
| -------- | ------------------------ |
| Member 1 | Frontend & UI/UX         |
| Member 2 | Backend & Authentication |
| Member 3 | Business Logic           |
| Member 4 | Analytics & Reporting    |

---

## 📄 License

This project was developed as part of a hackathon for educational purposes.
>>>>>>> 59ede1345437b48cb659a196467472f8467e2e2b
