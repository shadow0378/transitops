const express = require("express");
const Driver = require("../models/Driver");
const { authRequired, allowRoles } = require("../middleware/auth");

const router = express.Router();
router.use(authRequired);

router.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.available === "true") query.status = "Available";

    const drivers = await Driver.find(query).sort({ createdAt: -1 });
    res.json(drivers);
  } catch (err) {
    next(err);
  }
});

router.post("/", allowRoles("Admin", "Fleet Manager", "Safety Officer"), async (req, res, next) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    if (err.code === 11000) err.message = "License number must be unique";
    next(err);
  }
});

router.put("/:id", allowRoles("Admin", "Fleet Manager", "Safety Officer"), async (req, res, next) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(driver);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", allowRoles("Admin", "Fleet Manager"), async (req, res, next) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Driver deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
