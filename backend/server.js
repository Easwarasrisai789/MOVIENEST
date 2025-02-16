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
  password: "V@nky2003", // Replace with your actual MySQL password
  database: "movieapp",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// 🟢 **User Registration API** (No role required from frontend)
app.post("/api/register", (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "❌ Name, Email, and Password are required" });
  }

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length > 0) return res.status(400).json({ message: "⚠️ Email already registered" });

    // ✅ Auto-assign role as 'user'
    const insertQuery = "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, 'user')";
    db.query(insertQuery, [name, email, password, phone || null], (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "✅ User registered successfully" });
    });
  });
});

// 🔵 **Login API**
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "❌ Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "⚠️ User not found" });

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "❌ Incorrect password" });
    }

    res.json({ message: "✅ Login successful", user });
  });
});

// 🟡 **Get User Profile API**
app.get("/api/user-profile", (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ message: "❌ Email is required" });

  const query = "SELECT id, name, email, role, phone FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "⚠️ User not found" });

    res.json(results[0]);
  });
});

// 🟠 **Update User Profile API**
app.put("/api/update-profile", (req, res) => {
  const { email, name, password, phone } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "❌ Name, Email, and Password are required" });
  }

  const query = "UPDATE users SET name = ?, password = ?, phone = ? WHERE email = ?";
  db.query(query, [name, password, phone || null, email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ message: "⚠️ User not found" });

    res.json({ message: "✅ Profile updated successfully" });
  });
});

// 🔴 **Delete User API**
app.delete("/api/delete-user", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "❌ Email is required" });

  const query = "DELETE FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ message: "⚠️ User not found" });

    res.json({ message: "✅ User deleted successfully" });
  });
});

// 🟣 **Forgot Password - Check Email API**
app.post("/api/check-email", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "❌ Email is required" });

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "⚠️ Email not found" });

    res.json({ message: "✅ Email exists. Proceed to reset password." });
  });
});

// 🟣 **Forgot Password - Reset Password API**
app.post("/api/reset-password", (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "❌ Email and new password are required" });
  }

  const query = "UPDATE users SET password = ? WHERE email = ?";
  db.query(query, [newPassword, email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.affectedRows === 0) return res.status(404).json({ message: "⚠️ Email not found" });

    res.json({ message: "✅ Password reset successful" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
