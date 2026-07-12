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
