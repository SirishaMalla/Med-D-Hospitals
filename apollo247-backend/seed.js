const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor");

dotenv.config();

// MongoDB URI
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/apollo247";

// Cities & availabilities
const cities = ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];
const availabilities = ["Mon-Fri", "Mon-Sat", "Weekdays", "Daily", "Alt Days"];

// Helpers
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max, decimals = 1) {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(decimals));
}

// Generate a doctor object
function genDoc(name, gender, specialty, exp) {
  return {
    name,
    gender, // "Male" | "Female"
    specialty,
    fees: randomInt(300, 900),
    services: randomItem([
      ["Video Consult"],
      ["In-Clinic Visit"],
      ["Video Consult", "In-Clinic Visit"],
    ]),
    rating: randomFloat(3.9, 4.9),
    reviews: randomInt(25, 500),
    experience: exp,
    availability: randomItem(availabilities),
    photo: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    location: randomItem(cities),
  };
}

// Create 30 doctors per specialty (5 Female + 5 Male for each exp range)
function makeDoctorsForSpecialty(specialty, femaleNames, maleNames) {
  const docs = [];
  const expRanges = [
    { min: 0, max: 5 },
    { min: 5, max: 10 },
    { min: 10, max: 20 }
  ];

  expRanges.forEach((range) => {
    // 5 females for this range
    for (let i = 0; i < 5; i++) {
      const exp = randomInt(range.min, range.max);
      docs.push(genDoc(femaleNames[i % femaleNames.length], "Female", specialty, exp));
    }
    // 5 males for this range
    for (let i = 0; i < 5; i++) {
      const exp = randomInt(range.min, range.max);
      docs.push(genDoc(maleNames[i % maleNames.length], "Male", specialty, exp));
    }
  });

  return docs;
}


// ---- Name banks per specialty ----
const dataBanks = [
  {
    specialty: "Dermatologist",
    females: ["Dr. Ananya Sharma", "Dr. Priya Mehta", "Dr. Nisha Rao", "Dr. Kavya Menon", "Dr. Radhika Nair"],
    males: ["Dr. Rakesh Gupta", "Dr. Arjun Verma", "Dr. Manish Patel", "Dr. Vivek Iyer", "Dr. Saurabh Kulkarni"],
  },
  {
    specialty: "Cardiologist",
    females: ["Dr. Aditi Kapoor", "Dr. Sneha Kulkarni", "Dr. Pooja Sinha", "Dr. Neha Chawla", "Dr. Shreya Desai"],
    males: ["Dr. Rohit Malhotra", "Dr. Karan Singh", "Dr. Amit Tiwari", "Dr. Naveen Kaushik", "Dr. Varun Bhatia"],
  },
  {
    specialty: "Gynecologist",
    females: ["Dr. Meera Iyer", "Dr. Ishita Jain", "Dr. Ritu Bansal", "Dr. Bhavana Reddy", "Dr. Sunita Pillai"],
    males: ["Dr. Rohan Nair", "Dr. Aditya Sharma", "Dr. Rahul Kapoor", "Dr. Abhishek Shukla", "Dr. Devendra Rao"],
  },
  {
    specialty: "Neurologist",
    females: ["Dr. Anusha Reddy", "Dr. Swati Mishra", "Dr. Jyoti Saxena", "Dr. Parul Goyal", "Dr. Hema Joshi"],
    males: ["Dr. Siddharth Gupta", "Dr. Anirudh Menon", "Dr. Vivek Saxena", "Dr. Nitin Agrawal", "Dr. Gopal Dubey"],
  },
  {
    specialty: "Pulmonologist",
    females: ["Dr. Richa Bhatt", "Dr. Tanvi Kapoor", "Dr. Heena Khan", "Dr. Padmini Rao", "Dr. Shruti Bhargava"],
    males: ["Dr. Sanjay Kulkarni", "Dr. Mohit Arora", "Dr. Ajay Sharma", "Dr. Prakash Mehta", "Dr. Imran Shaikh"],
  },
];

// Build 50 doctors (10 per specialty × 5 specialties)
// Build doctors (30 per specialty × 5 specialties = 150 docs)
const buildDoctors = () => {
  let out = [];
  for (const bank of dataBanks) {
    out = out.concat(makeDoctorsForSpecialty(bank.specialty, bank.females, bank.males));
  }
  return out;
};

// Seed script runner
async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("Clearing old doctors...");
    await Doctor.deleteMany({});

    console.log("Generating doctors...");
    const doctors = buildDoctors();

    console.log(`Inserting ${doctors.length} doctors...`);
    await Doctor.insertMany(doctors);

    console.log("✅ Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
