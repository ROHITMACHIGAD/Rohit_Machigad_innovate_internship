const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const dotenv = require("dotenv");
const app = express();
const pool = require("./models/db");

dotenv.config();
app.use(express.json());

// Session configuration
app.use(
  session({
    store: new pgSession({
      pool: pool,                 // Connection pool for the database
      tableName: "user_sessions"  // Optional table name for session storage
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  })
);

// Import routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
