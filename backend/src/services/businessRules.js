const Driver = require("../models/Driver");
const Expense = require("../models/Expense");
const FuelLog = require("../models/FuelLog");
const Maintenance = require("../models/Maintenance");
const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

function isExpired(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
}

async function validateTripAssignment({ vehicleId, driverId, cargoWeight }) {
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) throw badRequest("Vehicle not found");
  if (vehicle.status === "Retired" || vehicle.status === "In Shop") {
    throw badRequest("Retired or In Shop vehicles cannot be dispatched");
  }
  if (vehicle.status === "On Trip") {
    throw badRequest("Vehicle is already on another trip");
  }
  if (Number(cargoWeight) > vehicle.maxLoadCapacity) {
    throw badRequest(`Cargo weight exceeds vehicle capacity of ${vehicle.maxLoadCapacity} kg`);
  }

  const driver = await Driver.findById(driverId);
  if (!driver) throw badRequest("Driver not found");
  if (driver.status === "Suspended") {
    throw badRequest("Suspended driver cannot be assigned");
  }
  if (driver.status === "On Trip") {
    throw badRequest("Driver is already on another trip");
  }
  if (isExpired(driver.licenseExpiryDate)) {
    throw badRequest("Driver license is expired");
  }

  return { vehicle, driver };
}

async function dispatchTrip(tripId) {
  const trip = await Trip.findById(tripId);
  if (!trip) throw badRequest("Trip not found");
  if (trip.status !== "Draft") throw badRequest("Only Draft trips can be dispatched");

  const { vehicle, driver } = await validateTripAssignment({
    vehicleId: trip.vehicle,
    driverId: trip.driver,
    cargoWeight: trip.cargoWeight
  });

  trip.status = "Dispatched";
  trip.dispatchedAt = new Date();
  vehicle.status = "On Trip";
  driver.status = "On Trip";

  await Promise.all([trip.save(), vehicle.save(), driver.save()]);
  return Trip.findById(trip._id).populate("vehicle driver");
}

async function completeTrip(tripId, payload) {
  const trip = await Trip.findById(tripId).populate("vehicle driver");
  if (!trip) throw badRequest("Trip not found");
  if (trip.status !== "Dispatched") throw badRequest("Only Dispatched trips can be completed");

  const vehicle = await Vehicle.findById(trip.vehicle._id);
  const driver = await Driver.findById(trip.driver._id);
  const finalOdometer = Number(payload.finalOdometer || vehicle.odometer + trip.plannedDistance);

  if (finalOdometer < vehicle.odometer) {
    throw badRequest("Final odometer cannot be lower than current odometer");
  }

  trip.status = "Completed";
  trip.completedAt = new Date();
  trip.finalOdometer = finalOdometer;
  trip.revenue = Number(payload.revenue || trip.revenue || 0);

  vehicle.status = "Available";
  vehicle.odometer = finalOdometer;
  vehicle.revenue += trip.revenue;
  driver.status = "Available";

  const writes = [trip.save(), vehicle.save(), driver.save()];
  if (Number(payload.fuelLiters) > 0 && Number(payload.fuelCost) >= 0) {
    writes.push(
      FuelLog.create({
        vehicle: vehicle._id,
        trip: trip._id,
        liters: Number(payload.fuelLiters),
        cost: Number(payload.fuelCost),
        distance: trip.plannedDistance
      })
    );
  }

  await Promise.all(writes);
  return Trip.findById(trip._id).populate("vehicle driver");
}

async function cancelTrip(tripId) {
  const trip = await Trip.findById(tripId);
  if (!trip) throw badRequest("Trip not found");
  if (trip.status === "Completed") throw badRequest("Completed trips cannot be cancelled");

  if (trip.status === "Dispatched") {
    await Promise.all([
      Vehicle.findByIdAndUpdate(trip.vehicle, { status: "Available" }),
      Driver.findByIdAndUpdate(trip.driver, { status: "Available" })
    ]);
  }

  trip.status = "Cancelled";
  trip.cancelledAt = new Date();
  await trip.save();
  return Trip.findById(trip._id).populate("vehicle driver");
}

async function openMaintenance(payload) {
  const vehicle = await Vehicle.findById(payload.vehicle);
  if (!vehicle) throw badRequest("Vehicle not found");
  if (vehicle.status === "On Trip") throw badRequest("Vehicle on trip cannot enter maintenance");
  if (vehicle.status === "Retired") throw badRequest("Retired vehicle cannot enter maintenance");

  const record = await Maintenance.create(payload);
  vehicle.status = "In Shop";
  await vehicle.save();

  if (Number(payload.cost) > 0) {
    await Expense.create({
      vehicle: vehicle._id,
      type: "Maintenance",
      amount: Number(payload.cost),
      note: payload.title
    });
  }

  return Maintenance.findById(record._id).populate("vehicle");
}

async function closeMaintenance(id) {
  const record = await Maintenance.findById(id).populate("vehicle");
  if (!record) throw badRequest("Maintenance record not found");
  if (record.status === "Closed") return record;

  record.status = "Closed";
  record.endDate = new Date();
  await record.save();

  const vehicle = await Vehicle.findById(record.vehicle._id);
  if (vehicle.status !== "Retired") {
    vehicle.status = "Available";
    await vehicle.save();
  }

  return Maintenance.findById(record._id).populate("vehicle");
}

module.exports = {
  validateTripAssignment,
  dispatchTrip,
  completeTrip,
  cancelTrip,
  openMaintenance,
  closeMaintenance
};
