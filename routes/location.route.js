const express = require("express");
const router = express.Router();
const {
  validateBody,
  validateParams,
  locationSchema,
  idSchema,
} = require("../middleware/validationMiddleware");
const {createLocation , getLocationById, getLocations} = require("../controllers/location.controller");

// Create a new location
router.post("/", validateBody(locationSchema), createLocation);

// Retrieve all locations
router.get("/", getLocations);

// Retrieve a location by ID
router.get("/:id", validateParams(idSchema), getLocationById);

module.exports = router;