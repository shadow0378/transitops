require("dotenv").config();

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const driverRoutes = require("./routes/driver.routes");
const tripRoutes = require("./routes/trip.routes");
const maintenanceRoutes = require("./routes/maintenance.routes");
const fuelLogRoutes = require("./routes/fuelLog.routes");
const expenseRoutes = require("./routes/expense.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ name: "TransitOps API", status: "running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel-logs", fuelLogRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(port, () => console.log(`API listening on ${port}`)))
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
