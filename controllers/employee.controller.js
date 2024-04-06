const prisma = require("../db/connection");

/**
 * Create a new employee with the provided name.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Created employee object.
 */
const createEmployee = async (req, res) => {
    const { name, image,email } = req.body;
    console.log(req.body,'req.body');
    const { departmentId, locationId, jobId } = req.params;
    console.log(departmentId, locationId, jobId,'departmentId, locationId, jobId');
    try {
        const employee = await prisma.employees.create({
            data: {
                email,
                name,
                departmentId,
                locationId,
                jobId,
            }
        });
        await prisma.picture.create({
            data: {
                url: image,
                employeeId: employee.id,
            },
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Retrieve a list of all employees.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of employee objects.
 */
const getEmployees = async (req, res) => {
    const { page, limit } = req.params;

    try {
        const employees = await prisma.employees.findMany({
            include: {
              department: {
                select: { name: true },
              },
              location: {
                select: { name: true },
              },
              job: {
                select: {
                  name: true,
                  description: true,
                },
              },
              picture: {
                select: { url: true },
              },
          },
            skip: (page - 1) * limit,
        });
        const total = await prisma.employees.count();
        const totalPage = Math.ceil(total / limit);
        res.json({ employees, totalPage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Retrieve an employee by its unique identifier.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Employee object with the specified ID.
 */
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employees.findUnique({
          where: { id },
          include: {
            department: {
              select: { name: true },
            },
            location: {
              select: { name: true },
            },
            job: {
              select: {
                name: true,
                description: true,
              },
            },
            picture: {
              select: { url: true },
            },
          },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Update the name of an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated employee object.
 */
const addIsFavorite = async (req, res) => {
    const { id } = req.params;
    console.log(id,'id');
    try {
        const employee = await prisma.employees.update({
            where: { id },
            data: { isFavorite: true },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
/**
 * Update the name of an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated employee object.
 */

const removeIsFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employees.update({
            where: { id },
            data: { isFavorite: false },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Retrieve a list of all favorite employees.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of favorite employee objects.
 */

const getFavorites = async (req, res) => {
    
 const { page, limit } = req.params;
    try {
        const employees = await prisma.employees.findMany({
            where: {
                isFavorite: true,
            },
            include: {
                department: {
                    select: { name: true },
                },
                location: {
                    select: { name: true },
                },
                job: {
                    select: {
                        name: true,
                        description: true,
                    }
                
                },
                picture: {
                    select: { url: true },
                },
            },
            skip: (page - 1) * limit,
            
        });
        const total = await prisma.employees.count({
            where: {
                isFavorite: true,
            },

        });
        const totalPage = Math.ceil(total / limit);
        res.json({ employees, totalPage });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

/**
 * Update the name and email of an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated employee object.
 */
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    console.log(id,'id');
    console.log(req.body,'req.body');
    const { name,email } = req.body;
    try {
        const employee = await prisma.employees.update({
            where: { id },
            data: { name,email },
        });
        console.log(employee,'employee');
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

/**
 * Delete an employee with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Deleted employee object.
 */
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employees.delete({
            where: { id },
        });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}
/**
 * Search for an employee by name, email, job, department, or location.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of employee objects.
 */
const searchEmployee = async (req, res) => {
    const { queryparams } = req.params;
    console.log(queryparams, 'queryparams');

    try {
        const employees = await prisma.employees.findMany({
          where: {
            OR: [
              { name: { contains: queryparams, mode: "insensitive" } },
              { email: { contains: queryparams, mode: "insensitive" } },
              { job: { name: { contains: queryparams, mode: "insensitive" } } },
              {
                department: {
                  name: { contains: queryparams, mode: "insensitive" },
                },
              },
              {
                location: {
                  name: { contains: queryparams, mode: "insensitive" },
                },
              },
            ],
          },
        });

        res.json(employees);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    addIsFavorite,
    removeIsFavorite,
    getFavorites,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
};