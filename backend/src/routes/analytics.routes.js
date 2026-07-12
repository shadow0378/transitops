const express = require("express");
const Driver = require("../models/Driver");
const Expense = require("../models/Expense");
const FuelLog = require("../models/FuelLog");
const Maintenance = require("../models/Maintenance");
const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");
const { authRequired } = require("../middleware/auth");

const router = express.Router();
router.use(authRequired);

router.get("/dashboard", async (req, res, next) => {
  try {
    const [vehicles, drivers, activeTrips, pendingTrips] = await Promise.all([
      Vehicle.find(),
      Driver.find(),
      Trip.countDocuments({ status: "Dispatched" }),
      Trip.countDocuments({ status: "Draft" })
    ]);

    const activeVehicles = vehicles.filter((v) => v.status === "On Trip").length;
    const availableVehicles = vehicles.filter((v) => v.status === "Available").length;
    const maintenanceVehicles = vehicles.filter((v) => v.status === "In Shop").length;
    const driversOnDuty = drivers.filter((d) => d.status === "On Trip").length;
    const usableVehicles = vehicles.filter((v) => v.status !== "Retired").length || 1;

    res.json({
      activeVehicles,
      availableVehicles,
      maintenanceVehicles,
      activeTrips,
      pendingTrips,
      driversOnDuty,
      fleetUtilization: Math.round((activeVehicles / usableVehicles) * 100),
      vehicleStatus: ["Available", "On Trip", "In Shop", "Retired"].map((status) => ({
        status,
        count: vehicles.filter((v) => v.status === status).length
      })),
      driverStatus: ["Available", "On Trip", "Off Duty", "Suspended"].map((status) => ({
        status,
        count: drivers.filter((d) => d.status === status).length
      }))
    });
  } catch (err) {
    next(err);
  }
});

router.get("/vehicle-performance", async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find().lean();
    const rows = await Promise.all(
      vehicles.map(async (vehicle) => {
        const [fuelLogs, expenses, maintenance] = await Promise.all([
          FuelLog.find({ vehicle: vehicle._id }).lean(),
          Expense.find({ vehicle: vehicle._id }).lean(),
          Maintenance.find({ vehicle: vehicle._id }).lean()
        ]);

        const fuelCost = fuelLogs.reduce((sum, item) => sum + item.cost, 0);
        const fuelLiters = fuelLogs.reduce((sum, item) => sum + item.liters, 0);
        const distance = fuelLogs.reduce((sum, item) => sum + item.distance, 0);
        const maintenanceCost = maintenance.reduce((sum, item) => sum + item.cost, 0);
        const otherCost = expenses.reduce((sum, item) => sum + item.amount, 0);
        const totalCost = fuelCost + maintenanceCost + otherCost;
        const roi = vehicle.acquisitionCost
          ? ((vehicle.revenue - totalCost) / vehicle.acquisitionCost) * 100
          : 0;

        return {
          vehicleId: vehicle._id,
          registrationNumber: vehicle.registrationNumber,
          name: vehicle.name,
          fuelEfficiency: fuelLiters ? Number((distance / fuelLiters).toFixed(2)) : 0,
          operationalCost: totalCost,
          revenue: vehicle.revenue,
          roi: Number(roi.toFixed(2))
        };
      })
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
