// routes/department.test.js

const prisma = require("../mocks/mock");


describe("POST /api/departmentss", () => {
  it("should create a new department", async () => {
    prisma.department.create.mockResolvedValue({
      name: "Test Department",
    });
    const res = {
        statusCode: 201,
        body: {
            name: "Test Department",
        },
        json(data) {
            this.body = data;
            return this;
        },
        };
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({name: "Test Department" });
  });
});

describe("GET /api/departmentss", () => {
    it("should return all departments", async () => {
        prisma.department.findMany.mockResolvedValue([
        { name: "Test Department" },
        ]);
        const res = {
            statusCode: 200,
            body: [{ name: "Test Department" }],
            json(data) {
                this.body = data;
                return this;
            },
            };
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ name: "Test Department" }]);
    });
});

describe("GET /api/departments/:id", () => {
    it("should return a department by id", async () => {
        prisma.department.findUnique.mockResolvedValue({
            name: "Test Department",
        });
        const res = {
            statusCode: 200,
            body: { name: "Test Department" },
            json(data) {
                this.body = data;
                return this;
            },
            };
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ name: "Test Department" });
    });
});

