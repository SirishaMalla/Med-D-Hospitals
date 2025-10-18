const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  gender: String,
  specialty: String,
  fees: Number,
  services: [String],
  rating: Number,
  reviews: Number,
  experience: Number,
  availability: String,
  photo: String,
  location:String
});

module.exports = mongoose.model("Doctor", doctorSchema);
