const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const departmentRoute = require("./routes/department.route");
const jobRoute = require("./routes/job.route");
const locationRoute = require("./routes/location.route");
const employeeRoute = require("./routes/employee.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/departments", departmentRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/locations", locationRoute);
app.use("/api/employees", employeeRoute);


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
