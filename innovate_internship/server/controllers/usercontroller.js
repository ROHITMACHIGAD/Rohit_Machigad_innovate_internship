const bcrypt = require("bcryptjs");
const pool = require("../models/db");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [name, email, passwordHash]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rowCount === 0) return res.status(400).send("User not found");

    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) return res.status(400).send("Invalid credentials");

    // Create a session for the authenticated user
    req.session.userId = user.rows[0].user_id;
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Failed to log out.");
    res.send("Logged out successfully.");
  });
};
