// Importing express module
const express = require("express");

// Creating an express application instance
const app = express();

// Setting up the port to listen on, defaulting to 3002 if not provided
const port = process.env.PORT || 3002;

// Importing routes
const departmentRoute = require("./routes/department.route");
const jobRoute = require("./routes/job.route");
const locationRoute = require("./routes/location.route");
const employeeRoute = require("./routes/employee.route");

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded requests with extended options
app.use(express.urlencoded({ extended: true }));

// Mounting routes
app.use("/api/departments", departmentRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/locations", locationRoute);
app.use("/api/employees", employeeRoute);

// Starting the server to listen on the specified port
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
