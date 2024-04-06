const prisma = require("../db/connection");

/**
 * Create a new department with the provided name.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Created jobs object.
 * */

const createJob = async (req, res) => {
    const { name,description } = req.body;
    console.log(req.body,'req.body');
    const { id } = req.params;
    console.log(id,'id');
    try {
        const job = await prisma.jobs.create({
            data: {
                name,
                departmentId:id,
                description,

            }
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

/**
 * Retrieve a list of all jobs.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of jobs objects.
 */

const getJobs = async (req, res) => {
    try {
        const jobs = await prisma.jobs.findMany({
            include: {
                department: true,
                employees: true,
            },
        });
        res.json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

/**
 * Retrieve a job by its unique identifier.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Job object with the specified ID.
 */

const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await prisma.jobs.findUnique({
            where: { id },
        });
        res.json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Update the name of a job with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Updated job object.
 */

const updateJob = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedJob = await prisma.jobs.update({
            where: { id },
            data: { name },
        });
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
};