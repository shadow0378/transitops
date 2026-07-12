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
git clone <repository-url>
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
