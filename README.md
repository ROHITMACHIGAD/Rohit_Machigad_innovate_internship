ServiceTrack
ServiceTrack is a comprehensive web application designed to streamline vehicle service management and ensure timely maintenance through an intuitive reminder system. With ServiceTrack, users can effortlessly track service histories, schedule upcoming maintenance tasks, and receive automated reminders, helping to keep vehicles in optimal condition.

Features
User Registration and Login with session-based authentication
Vehicle management (add, update, and view vehicle details)
Service history tracking for each vehicle
Reminder system for upcoming services
Responsive design accessible from desktop and mobile devices
Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: PostgreSQL
Session Management: express-session with PostgreSQL for storing sessions
Project Structure
bash
Copy code
ServiceTrack/
├── client/           # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── server/
│   ├── controllers/  # Backend logic
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── app.js        # Main backend file
├── .env              # Environment variables
└── README.md         # Project documentation
Getting Started
Prerequisites
Node.js (v14 or higher)
PostgreSQL (Ensure PostgreSQL is installed and running)
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/ServiceTrack.git
cd ServiceTrack
Install Backend Dependencies

bash
Copy code
npm install
Setup PostgreSQL Database

Create a PostgreSQL database for the project.

Create the required tables by executing the following SQL commands:

sql
Copy code
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  contact_number VARCHAR(15)
);

CREATE TABLE vehicles (
  vehicle_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  make VARCHAR(50),
  model VARCHAR(50),
  year INT,
  vin VARCHAR(17),
  license_plate VARCHAR(10)
);

CREATE TABLE service_records (
  record_id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(vehicle_id),
  service_date DATE,
  description TEXT,
  cost DECIMAL(10, 2)
);

CREATE TABLE reminders (
  reminder_id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(vehicle_id),
  reminder_date DATE,
  reminder_message TEXT
);
Configure Environment Variables

Create a .env file in the root directory and add the following configurations:

makefile
Copy code
PORT=5000
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=your_session_secret
Replace your_postgres_connection_string with the connection string for your PostgreSQL database and your_session_secret with a secret string for session encryption.

Running the Application
Start the Backend Server

bash
Copy code
node server/app.js
Access the Application

Open client/index.html in a browser for the frontend interface, or navigate to http://localhost:5000 for API endpoints (if developing locally).

Frontend Usage
Login/Registration: Access the login or register forms on client/index.html.
Session Management: Upon login, the session is stored in PostgreSQL via express-session.
API Endpoints
User Registration: POST /api/users/register
User Login: POST /api/users/login
User Logout: POST /api/users/logout
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -am 'Add a feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.
