const express = require("express");
const Trip = require("../models/Trip");
const { authRequired, allowRoles } = require("../middleware/auth");
const {
  cancelTrip,
  completeTrip,
  dispatchTrip,
  validateTripAssignment
} = require("../services/businessRules");

const router = express.Router();
router.use(authRequired);

router.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    const trips = await Trip.find(query).populate("vehicle driver").sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    next(err);
  }
});

router.post("/", allowRoles("Admin", "Fleet Manager", "Driver"), async (req, res, next) => {
  try {
    await validateTripAssignment({
      vehicleId: req.body.vehicle,
      driverId: req.body.driver,
      cargoWeight: req.body.cargoWeight
    });
    const trip = await Trip.create(req.body);
    res.status(201).json(await Trip.findById(trip._id).populate("vehicle driver"));
  } catch (err) {
    next(err);
  }
});

router.post("/:id/dispatch", allowRoles("Admin", "Fleet Manager", "Driver"), async (req, res, next) => {
  try {
    res.json(await dispatchTrip(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.post("/:id/complete", allowRoles("Admin", "Fleet Manager", "Driver"), async (req, res, next) => {
  try {
    res.json(await completeTrip(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/:id/cancel", allowRoles("Admin", "Fleet Manager", "Driver"), async (req, res, next) => {
  try {
    res.json(await cancelTrip(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
