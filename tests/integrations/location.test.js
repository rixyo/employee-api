// Description: Test cases for location routes.
const request = require("supertest");
const prisma = require("../../db/connection");

require("dotenv").config();

beforeEach(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await prisma.$disconnect();
});

async function cleanDatabase() {
  return await prisma.location.deleteMany(); // Deleting all departments
}
afterAll(async () => {
    cleanDatabase(); // Deleting all departments after all tests
});

// Test case for creating a new location using POST /api/locations
describe("POST /api/location", () => {
  it("should create a new location", async () => {
    const res = await request("http://localhost:3002")
      .post("/api/locations")
      .send({ name: "Lebanon" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Lebanon");
  });
});

// Test case for retrieving all locations using GET /api/locations
describe("GET /api/location", () => {
  it("should return all locations", async () => {
    const res = await request("http://localhost:3002").get("/api/locations");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// Test case for retrieving a location by ID using GET /api/locations/:id
describe("GET /api/location/:id", () => {
  it("should return a location by id", async () => {
    // Create a new location
    const createRes = await request("http://localhost:3002")
      .post("/api/locations")
      .send({ name: "Lebanon" });

    // Retrieve the created location by ID
    const res = await request("http://localhost:3002").get(
      `/api/locations/${createRes.body.id}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Lebanon");
  });
});
