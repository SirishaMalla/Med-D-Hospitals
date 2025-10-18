const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST - create appointment
router.post("/add", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.json({ success: true, message: "Appointment saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET - fetch appointments by username
router.get("/:username", async (req, res) => {
  try {
    const appointments = await Appointment.find({ username: req.params.username });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
