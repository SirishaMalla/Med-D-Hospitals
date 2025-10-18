const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// @route   GET /api/doctors
// @desc    Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// @route   POST /api/doctors
// @desc    Add a new doctor
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.error("Error adding doctor:", error.message);
    res.status(400).json({ message: "Error adding doctor", error: error.message });
  }
});

module.exports = router;
