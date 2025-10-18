const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST - create appointment
router.post("/add", async (req, res) => {
  try {
    const { username, doctorName, doctorSpecialty, region, date, time } = req.body;

    // Basic validation
    if (!username || !doctorName || !doctorSpecialty || !region || !date || !time) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newAppointment = new Appointment({
      username,
      doctorName,
      doctorSpecialty,
      region,
      date,
      time
    });

    await newAppointment.save();
    res.json({ success: true, message: "Appointment saved successfully!" });
  } catch (err) {
    console.error("Error saving appointment:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET - fetch appointments by username
router.get("/:username", async (req, res) => {
  try {
    const appointments = await Appointment.find({ username: req.params.username });
    res.json({ success: true, data: appointments });  // ✅ wrap in {data: ...}
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;
