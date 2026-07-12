const express = require("express");
const Maintenance = require("../models/Maintenance");
const { authRequired, allowRoles } = require("../middleware/auth");
const { closeMaintenance, openMaintenance } = require("../services/businessRules");

const router = express.Router();
router.use(authRequired);

router.get("/", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    const records = await Maintenance.find(query).populate("vehicle").sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    next(err);
  }
});

router.post("/", allowRoles("Admin", "Fleet Manager"), async (req, res, next) => {
  try {
    res.status(201).json(await openMaintenance(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/:id/close", allowRoles("Admin", "Fleet Manager"), async (req, res, next) => {
  try {
    res.json(await closeMaintenance(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
