const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "V@nky2003", // Replace with actual password
  database: "movieapp",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// 🟢 Get User and Owner Stats
app.get("/api/users/stats", (req, res) => {
  const query = "SELECT role, COUNT(*) AS count FROM users WHERE role IN ('user', 'owner') GROUP BY role";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    const stats = { users: 0, owners: 0 };
    results.forEach(({ role, count }) => { stats[role + 's'] = count; });
    res.json(stats);
  });
});

// 🟡 User Registration (Default role: 'user')
app.post("/api/register", (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "❌ Name, Email, and Password are required" });
  
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length > 0) return res.status(400).json({ message: "⚠️ Email already registered" });

    db.query("INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'user')", [name, email, password, phone || null], (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "✅ User registered successfully" });
    });
  });
});

// 🔵 User Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "❌ Email and password are required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "⚠️ User not found" });

    const user = results[0];
    if (password !== user.password) return res.status(401).json({ message: "❌ Incorrect password" });

    res.json({ message: "✅ Login successful", user });
  });
});

// 🟡 Get User Profile
app.get("/api/user-profile", (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "❌ Email is required" });

  db.query("SELECT id, name, email, role, phone FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "⚠️ User not found" });

    res.json(results[0]);
  });
});

// 🟠 Update User Profile
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "❌ Name, Email, and Password are required" });

  db.query("UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?", [name, email, phone || null, password, id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ message: "⚠️ User not found" });

    res.json({ message: "✅ Profile updated successfully" });
  });
});

// 🔴 Delete User
app.delete("/api/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ message: "⚠️ User not found" });

    res.json({ message: "✅ User deleted successfully" });
  });
});

// 🟣 Forgot Password - Reset
app.post("/api/reset-password", (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ message: "❌ Email and new password are required" });

  db.query("UPDATE users SET password = ? WHERE email = ?", [newPassword, email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ message: "⚠️ Email not found" });

    res.json({ message: "✅ Password reset successful" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
