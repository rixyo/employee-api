const express = require("express");
const router = express.Router();
const { createDepartment, getDepartmentById , getDepartments, updateDepartment} = require("../controllers/department.controller");
const {
  validateBody,
  validateParams,
  departmentSchema,
  idSchema,
} = require("../middleware/validationMiddleware");

// Create a new department
router.post("", validateBody(departmentSchema), createDepartment);

// Retrieve all departments
router.get("/", getDepartments);

// Retrieve a department by ID
router.get(
  "/:id",
  validateParams(idSchema),
  getDepartmentById
);

// Update a department by ID
router.patch("/:id", validateParams(idSchema), validateBody(departmentSchema), updateDepartment);

module.exports = router;
