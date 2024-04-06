const express = require("express");
const router = express.Router();
const { createJob, getJobById , getJobs, updateJob} = require("../controllers/job.controller");
const {
  validateBody,
  validateParams,
  jobSchema,
  idSchema,
} = require("../middleware/validationMiddleware");

// Create a new job
router.post("/department/:id",validateParams(idSchema), validateBody(jobSchema), createJob);

// Retrieve all jobs
router.get("/", getJobs);

// Retrieve a job by ID
router.get("/:id", validateParams(idSchema), getJobById);

// Update a job by ID
router.patch(
  "/:id",
  validateParams(idSchema),
  validateBody(jobSchema),
    updateJob
);

module.exports = router;
