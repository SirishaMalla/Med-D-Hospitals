// ================== GLOBAL ==================
const doctorList = document.getElementById("doctorList"); // only exists on doctors.html
const specialtyInput = document.getElementById("specialtyInput");
const suggestionsList = document.getElementById("suggestions");
const loginNav = document.getElementById("loginNav");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");

if (loginNav) {
  loginNav.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "block";
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    loginModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

let allDoctors = [];      // for doctors.html
let allSpecialties = [];  // will fetch from backend

// ================== HOMEPAGE ==================
async function loadSpecialties() {
  try {
    const res = await fetch("https://apollo247-backend-c3p6.onrender.com/api/doctors/specialties");
    const specialties = await res.json();

    if (!Array.isArray(specialties)) return;
    allSpecialties = specialties;

    if (specialtyInput) {
      specialtyInput.addEventListener("input", () => {
        const query = specialtyInput.value.toLowerCase();
        suggestionsList.innerHTML = "";

        if (!query) {
          suggestionsList.classList.remove("show");
          return;
        }

        const filtered = allSpecialties.filter(spec =>
          spec.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
          suggestionsList.classList.add("show");
        } else {
          suggestionsList.classList.remove("show");
        }

        filtered.forEach(spec => {
          const li = document.createElement("li");
          li.textContent = spec;

          li.addEventListener("click", () => {
            specialtyInput.value = spec;
            suggestionsList.innerHTML = "";
            suggestionsList.classList.remove("show");
          });

          suggestionsList.appendChild(li);
        });
      });

      document.addEventListener("click", (e) => {
        if (e.target !== specialtyInput && !suggestionsList.contains(e.target)) {
          suggestionsList.innerHTML = "";
          suggestionsList.classList.remove("show");
        }
      });
    }
  } catch (err) {
    console.error("Failed to load specialties:", err);
  }
}

function openDoctorsPage() {
  const specialty = specialtyInput?.value || "";
  const gender = document.getElementById("genderFilter")?.value || "";
  const experience = document.getElementById("experienceFilter")?.value || "";

  const params = new URLSearchParams({ search: specialty, gender, experience });
  window.open(`doctors.html?${params.toString()}`, "_blank");
}

// ================== DOCTORS PAGE ==================
async function fetchDoctors() {
  try {
    const response = await fetch("https://apollo247-backend-c3p6.onrender.com/api/doctors");
    const data = await response.json();
    const doctors = data.doctors;

    if (!Array.isArray(doctors) || doctors.length === 0) {
      if (doctorList) doctorList.innerHTML = "<p>No doctors found.</p>";
      return;
    }

    allDoctors = doctors;
    if (doctorList) applyFiltersFromURL();
  } catch (err) {
    console.error("Fetch Error:", err);
    if (doctorList) {
      doctorList.innerHTML = "<p style='color:red;'>Failed to load doctors.</p>";
    }
  }
}

function renderDoctors(doctors) {
  if (!doctorList) return;
  doctorList.innerHTML = "";

  if (!doctors.length) {
    doctorList.innerHTML = "<p>No matching doctors found.</p>";
    return;
  }

  doctors.forEach((doc) => {
    const card = document.createElement("div");
    card.className = "doctor-card";

    card.innerHTML = `
      <div class="doctor-image">
        <img src="${doc.image || 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png'}" alt="Doctor Photo">
      </div>
      <div class="doctor-info">
        <h3>${doc.name}</h3>
        <p><strong>Speciality:</strong> ${doc.speciality || "N/A"}</p>
        <p><strong>Fees:</strong> ₹${doc.fees || "N/A"}</p>
        <p><strong>Location:</strong> ${doc.location || "N/A"}</p>
        <p><strong>Experience:</strong> ${doc.experience || 0}+ years</p>
        <button class="book-btn">Book Appointment</button>
      </div>
      <div class="doctor-right">
        <p>⭐ ${doc.rating || 4.5}</p>
        <p>Available: ${doc.availability || "N/A"}</p>
      </div>
    `;
    doctorList.appendChild(card);
  });
}

function applyFiltersFromURL() {
  if (!doctorList) return;

  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("search")?.toLowerCase() || "";
  const gender = urlParams.get("gender") || "";
  const experience = urlParams.get("experience");

  let filtered = [...allDoctors];

  if (searchTerm) {
    filtered = filtered.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm) ||
      (doc.speciality && doc.speciality.toLowerCase().includes(searchTerm))
    );
  }

  if (gender) {
    filtered = filtered.filter(doc => doc.gender && doc.gender.toLowerCase() === gender.toLowerCase());
  }

  if (experience) {
    if (experience === "0-5") {
      filtered = filtered.filter(doc => doc.experience <= 5);
    } else if (experience === "5-10") {
      filtered = filtered.filter(doc => doc.experience > 5 && doc.experience <= 10);
    } else if (experience === "10+") {
      filtered = filtered.filter(doc => doc.experience > 10);
    }
  }

  renderDoctors(filtered);
}

// ================== INIT ==================
if (specialtyInput) loadSpecialties();
if (doctorList) fetchDoctors();
