// Authentication and navigation

let users = JSON.parse(localStorage.getItem("users")) || [];

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
}

function seedAdminUser() {
  const adminEmail = "admin@onyx.com";
  const adminExists = users.some((u) => u.email === adminEmail);
  if (!adminExists) {
    users.push({
      name: "Administrator",
      email: adminEmail,
      password: "Admin@123",
      isAdmin: true,
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      showNotification("Invalid email or password", "error");
      return;
    }
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: user.email,
        name: user.name,
        isAdmin: !!user.isAdmin,
      })
    );
    showNotification("Logged in successfully", "success");
    setTimeout(() => (window.location.href = "index.html"), 800);
  });
}

function setupRegisterForm() {
  const form = document.getElementById("register-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirm = document.getElementById("reg-confirm").value;
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!nameRegex.test(name)) {
      showNotification("Name must be at least 3 letters", "error");
      return;
    }
    if (!emailRegex.test(email)) {
      showNotification("Enter a valid email address", "error");
      return;
    }
    if (!passwordRegex.test(password)) {
      showNotification(
        "Password must be 8+ chars with upper, lower, number and symbol",
        "error"
      );
      return;
    }
    if (password !== confirm) {
      showNotification("Passwords do not match", "error");
      return;
    }
    if (users.some((u) => u.email === email)) {
      showNotification("Email already registered", "error");
      return;
    }
    users.push({ name, email, password, isAdmin: false });
    localStorage.setItem("users", JSON.stringify(users));
    showNotification("Registered successfully! Please login.", "success");
    setTimeout(() => (window.location.href = "login.html"), 800);
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  showNotification("Logged out", "info");
  setTimeout(() => (window.location.href = "index.html"), 500);
}

function setupNavigation() {
  updateCartCounter();
  const navList = document.querySelector(".nav ul");
  if (!navList) return;
  navList.querySelectorAll(".auth-link").forEach((el) => el.remove());
  const user = getCurrentUser();
  if (user && user.isAdmin) {
    const li = document.createElement("li");
    li.className = "auth-link";
    li.innerHTML = '<a href="admin.html">Admin</a>';
    navList.appendChild(li);
  }
  if (user) {
    const li = document.createElement("li");
    li.className = "auth-link";
    li.innerHTML = '<a href="logout.html">Logout</a>';
    navList.appendChild(li);
  } else {
    const liLogin = document.createElement("li");
    liLogin.className = "auth-link";
    liLogin.innerHTML = '<a href="login.html">Login</a>';
    navList.appendChild(liLogin);
    const liRegister = document.createElement("li");
    liRegister.className = "auth-link";
    liRegister.innerHTML = '<a href="register.html">Register</a>';
    navList.appendChild(liRegister);
  }
}




