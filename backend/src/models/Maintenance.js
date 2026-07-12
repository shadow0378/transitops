const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    cost: { type: Number, default: 0, min: 0 },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    status: { type: String, enum: ["Active", "Closed"], default: "Active" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
