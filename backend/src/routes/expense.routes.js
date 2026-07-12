const express = require("express");
const Expense = require("../models/Expense");
const { authRequired, allowRoles } = require("../middleware/auth");

const router = express.Router();
router.use(authRequired);

router.get("/", async (req, res, next) => {
  try {
    const query = req.query.vehicle ? { vehicle: req.query.vehicle } : {};
    res.json(await Expense.find(query).populate("vehicle").sort({ date: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post("/", allowRoles("Admin", "Fleet Manager", "Financial Analyst"), async (req, res, next) => {
  try {
    res.status(201).json(await Expense.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
