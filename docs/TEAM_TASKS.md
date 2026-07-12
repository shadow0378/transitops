# Team Task Board

## Member 1 - Frontend Lead

Files to edit:

- `frontend/src/components/Layout.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Vehicles.jsx`
- `frontend/src/pages/Drivers.jsx`
- `frontend/src/pages/Trips.jsx`
- `frontend/src/pages/Maintenance.jsx`
- `frontend/src/pages/Expenses.jsx`
- `frontend/src/pages/Reports.jsx`
- `frontend/src/styles.css`

Finish checklist:

- Make UI clean on laptop and phone.
- Ensure all forms show backend errors.
- Improve table search/filter if time permits.
- Add screenshots for presentation.

## Member 2 - Backend & Authentication

Files to edit:

- `backend/src/server.js`
- `backend/src/config/db.js`
- `backend/src/middleware/auth.js`
- `backend/src/models/*`
- `backend/src/routes/auth.routes.js`
- `backend/src/routes/vehicle.routes.js`
- `backend/src/routes/driver.routes.js`
- `backend/src/routes/fuelLog.routes.js`
- `backend/src/routes/expense.routes.js`

Finish checklist:

- Confirm JWT login works.
- Confirm roles block unauthorized actions.
- Confirm unique vehicle and driver fields work.
- Add more CRUD endpoints only if needed.

## Member 3 - Business Logic

Files to edit:

- `backend/src/services/businessRules.js`
- `backend/src/routes/trip.routes.js`
- `backend/src/routes/maintenance.routes.js`

Finish checklist:

- Test every mandatory rule manually.
- Prepare examples of invalid actions.
- Explain status transitions clearly in the demo.

## Member 4 - Analytics & Extra Features

Files to edit:

- `backend/src/routes/analytics.routes.js`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/Reports.jsx`
- `frontend/src/api/client.js`

Finish checklist:

- Confirm KPIs are correct.
- Confirm charts render.
- Confirm CSV export downloads.
- Add PDF export or email reminders only after the main app works.
