require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Driver = require("./models/Driver");
const Expense = require("./models/Expense");
const FuelLog = require("./models/FuelLog");
const Maintenance = require("./models/Maintenance");
const Trip = require("./models/Trip");
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");

async function seed() {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Vehicle.deleteMany({}),
    Driver.deleteMany({}),
    Trip.deleteMany({}),
    Maintenance.deleteMany({}),
    FuelLog.deleteMany({}),
    Expense.deleteMany({})
  ]);

  const password = await bcrypt.hash("password123", 10);
  await User.insertMany([
    { name: "Fleet Admin", email: "admin@transitops.com", password, role: "Admin" },
    { name: "Finance User", email: "finance@transitops.com", password, role: "Financial Analyst" }
  ]);

  const [van, truck, mini] = await Vehicle.insertMany([
    {
      registrationNumber: "MH12AB1001",
      name: "Van-05",
      type: "Van",
      region: "West",
      maxLoadCapacity: 500,
      odometer: 12000,
      acquisitionCost: 700000,
      revenue: 95000,
      status: "Available"
    },
    {
      registrationNumber: "KA01CD2200",
      name: "Truck-12",
      type: "Truck",
      region: "South",
      maxLoadCapacity: 4000,
      odometer: 45000,
      acquisitionCost: 2400000,
      revenue: 360000,
      status: "On Trip"
    },
    {
      registrationNumber: "DL08EF9090",
      name: "Mini-02",
      type: "Mini Truck",
      region: "North",
      maxLoadCapacity: 900,
      odometer: 18000,
      acquisitionCost: 950000,
      revenue: 120000,
      status: "In Shop"
    }
  ]);

  const [alex, priya, rahul] = await Driver.insertMany([
    {
      name: "Alex Mathew",
      licenseNumber: "DL-ALEX-991",
      licenseCategory: "LMV",
      licenseExpiryDate: "2028-11-20",
      contactNumber: "9876543210",
      safetyScore: 92,
      status: "Available"
    },
    {
      name: "Priya Shah",
      licenseNumber: "DL-PRIYA-223",
      licenseCategory: "HMV",
      licenseExpiryDate: "2029-04-10",
      contactNumber: "9876500011",
      safetyScore: 88,
      status: "On Trip"
    },
    {
      name: "Rahul Singh",
      licenseNumber: "DL-RAHUL-004",
      licenseCategory: "LMV",
      licenseExpiryDate: "2025-01-10",
      contactNumber: "9876500022",
      safetyScore: 61,
      status: "Available"
    }
  ]);

  await Trip.create({
    source: "Bengaluru",
    destination: "Chennai",
    vehicle: truck._id,
    driver: priya._id,
    cargoWeight: 2500,
    plannedDistance: 340,
    revenue: 58000,
    status: "Dispatched",
    dispatchedAt: new Date()
  });

  await Maintenance.create({
    vehicle: mini._id,
    title: "Oil change",
    description: "Routine service",
    cost: 6500,
    status: "Active"
  });

  await FuelLog.insertMany([
    { vehicle: van._id, liters: 38, cost: 3900, distance: 420 },
    { vehicle: truck._id, liters: 80, cost: 8200, distance: 340 }
  ]);

  await Expense.insertMany([
    { vehicle: van._id, type: "Toll", amount: 1200, note: "Mumbai route toll" },
    { vehicle: mini._id, type: "Maintenance", amount: 6500, note: "Oil change" }
  ]);

  console.log("Seed complete");
  console.log("Login: admin@transitops.com / password123");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
