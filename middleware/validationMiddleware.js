const Joi = require("joi");

// Middleware function for validating request body using Joi schema
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Example Joi schema for validating request body
const departmentSchema = Joi.object({
  name: Joi.string().min(3).required(),
});
const locationSchema = Joi.object({
  name: Joi.string().min(3).required(),
});
const jobSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
});

const employeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  image: Joi.string().uri().required(),
});

const employeeSchemaPagination = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
});

const employeeSchemaSearch = Joi.object({
  queryparms: Joi.string().min(1).required(),
});


// Middleware function for validating request parameters using Joi schema
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Example Joi schema for validating request parameters
const idSchema = Joi.object({
  id: Joi.string().alphanum().required(),
});

const employeePramsSchema = Joi.object({
  departmentId: Joi.string().alphanum().required(),
  locationId: Joi.string().alphanum().required(),
  jobId: Joi.string().alphanum().required(),

});
const employeeUpdateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  validateBody,
  validateParams,
  departmentSchema,
  locationSchema,
  jobSchema,
  employeeSchema,
  idSchema,
  employeePramsSchema,
  employeeUpdateSchema,
  employeeSchemaPagination,
  employeeSchemaSearch,
};
