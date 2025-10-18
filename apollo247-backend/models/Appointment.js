const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  username: { type: String, required: true },  // who booked
  doctorName: { type: String, required: true },
  doctorSpecialty: { type: String, required: true },
  region: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
