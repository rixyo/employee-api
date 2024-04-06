
// Description: Test cases for department routes.
const request = require("supertest"); // Importing supertest for making HTTP requests
const prisma = require("../../db/connection"); // Importing the Prisma client for database interactions

require("dotenv").config(); // Loading environment variables

/* Connecting to the database before each test. */
beforeEach(async () => {
  await prisma.$connect(); // Connecting to the database
 // Deleting all departments before each test to maintain a clean state
});

async function cleanDatabase() {
  return await prisma.department.deleteMany(); // Deleting all departments

}
afterAll(async () => {
  cleanDatabase(); // Deleting all departments after all tests
 
});

// Test case for creating a new department using POST /api/departments
describe("POST /api/department", () => {
  it("should create a new department", async () => {
    const res = await request("http://localhost:3002") // Making a POST request to create a department
      .post("/api/departments")
      .send({ name: "Test Department2" }); // Sending data for creating the department
    expect(res.statusCode).toBe(201); // Expecting the response status code to be 201 (Created)
    expect(res.body.name).toBe("Test Department2"); // Expecting the response body to contain the created department's name
  });
});

// Test case for retrieving all departments using GET /api/departments
describe("GET /api/department", () => {
  it("should return all deparment", async () => {
    const res = await request("http://localhost:3002").get("/api/departments"); // Making a GET request to retrieve all departments
    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
    expect(res.body.length).toBeGreaterThan(0); // Expecting the response body to contain at least one department
  });
});

// Test case for retrieving a department by ID using GET /api/departments/:id
describe("GET /api/department/:id", () => {
  it("should return a department by id", async () => {
    const department = await prisma.department.create({
      // Creating a department in the database
      data: { name: "Test Department" },
    });
    const res = await request("http://localhost:3002").get(
      // Making a GET request to retrieve the created department
      `/api/departments/${department.id}`
    );
    expect(res.statusCode).toBe(200); // Expecting the response status code to be 200 (OK)
    expect(res.body.name).toBe("Test Department"); // Expecting the response body to contain the correct department name
  });
});