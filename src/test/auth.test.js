import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv"; // 1. Importa dotenv

dotenv.config(); // 2. Carga las variables de entorno antes de los tests

beforeAll(async () => {
  // Ahora process.env.MONGO_URI ya tendrá el valor de tu archivo .env
  const uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/v1/auth/register", () => {
  it("Debería registrar un nuevo usuario y devolver un token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`, // Email único para cada test
        password: "Password123!",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.name).toBe("Test User");
  });
});

describe("POST /api/v1/auth/login", () => {
  it("Debería fallar con 401 si el usuario no existe en la DB", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "no-existente@gmail.com",
      password: "CualquierPassword",
    });

    // Esperamos un 401 (Unauthorized)
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch("Email o contraseña incorrectos");
  });
});
