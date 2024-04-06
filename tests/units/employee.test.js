// routes/department.test.js

const prisma = require("../mocks/mock");

describe("POST /api/employees", () => {
  it("should create a new employees", async () => {
    prisma.employees.create.mockResolvedValue({
      name: "Mahmud",
      email: "mahmud@gamil.com",
      image: "https://www.google.com",
    });
    const res = {
      statusCode: 201,
      body: {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
      },
      json(data) {
        this.body = data;
        return this;
      },
    };

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      name: "Mahmud",
      email: "mahmud@gamil.com",
      image: "https://www.google.com",
    });
  });
});

describe("GET /api/employees", () => {
  it("should return all employees", async () => {
    prisma.employees.findMany.mockResolvedValue([
      {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
      },
    ]);
    const res = {
      statusCode: 200,
      body: [
        {
          name: "Mahmud",
          email: "mahmud@gamil.com",
          image: "https://www.google.com",
        },
      ],
      json(data) {
        this.body = data;
        return this;
      },
    };

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
      },
    ]);
  });
});

describe("GET /api/employeess/:id", () => {
  it("should return a employees by id", async () => {
    prisma.employees.findUnique.mockResolvedValue({
      id: 1,
    });
    const res = {
      statusCode: 200,
      body: {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
      },
      json(data) {
        this.body = data;
        return this;
      },
    };

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      name: "Mahmud",
      email: "mahmud@gamil.com",
      image: "https://www.google.com",
    });
  });
});

describe("PATCH /api/employeess/:id/favorite", () => {
  it("should return a employees by id", async () => {
    prisma.employees.update.mockResolvedValue({
      id: 1,
      isFavorite: true,
    });
    const res = {
      statusCode: 200,
      body: {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
        isFavorite: true,
      },
      json(data) {
        this.body = data;
        return this;
      },
    };

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      name: "Mahmud",
      email: "mahmud@gamil.com",
      image: "https://www.google.com",
    isFavorite: true,
    });
  });
});

describe("PATCH /api/employeess/:id/favorite/remove", () => {
  it("should return a employees by id", async () => {
    prisma.employees.update.mockResolvedValue({
      id: 1,
      isFavorite: false,
    });
    const res = {
      statusCode: 200,
      body: {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
        isFavorite: false,
      },
      json(data) {
        this.body = data;
        return this;
      },
    };

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      name: "Mahmud",
      email: "mahmud@gamil.com",
      image: "https://www.google.com",
      isFavorite: false,
    });
  });
});

describe("GET /api/employees//favorites/all", () => {
  it("should return all employees", async () => {
    prisma.employees.findMany.mockResolvedValue([
      {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
        isFavorite: true,
      },
    ]);
    const res = {
      statusCode: 200,
      body: [
        {
          name: "Mahmud",
          email: "mahmud@gamil.com",
          image: "https://www.google.com",
          isFavorite: true,
        },
      ],
      json(data) {
        this.body = data;
        return this;
      },
    };

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        name: "Mahmud",
        email: "mahmud@gamil.com",
        image: "https://www.google.com",
        isFavorite: true,
      },
    ]);
  });
});