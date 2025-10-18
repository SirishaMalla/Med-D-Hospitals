// js/auth.js

const form = document.getElementById("authForm");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const message = document.getElementById("message");

let mode = "login";

signupBtn.addEventListener("click", () => {
  mode = "signup";
  form.requestSubmit(); // trigger form submission
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`http://localhost:5000/api/users/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      message.textContent = `✅ ${mode === "signup" ? "Account created" : "Login successful"}!`;
      window.location.href = "doctors.html"; // redirect to doctor page
    } else {
      message.textContent = `❌ ${data.message}`;
    }
  } catch (err) {
    message.textContent = "❌ Server error";
  }
});
