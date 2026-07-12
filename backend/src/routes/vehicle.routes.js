const express = require("express");
const Vehicle = require("../models/Vehicle");
const { authRequired, allowRoles } = require("../middleware/auth");

const router = express.Router();
router.use(authRequired);

router.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.type) query.type = req.query.type;
    if (req.query.region) query.region = req.query.region;
    if (req.query.dispatchable === "true") query.status = "Available";

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
});

router.post("/", allowRoles("Admin", "Fleet Manager"), async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    if (err.code === 11000) err.message = "Registration number must be unique";
    next(err);
  }
});

router.put("/:id", allowRoles("Admin", "Fleet Manager"), async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", allowRoles("Admin", "Fleet Manager"), async (req, res, next) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
