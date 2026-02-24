import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

describe("GET /api/v1/tasks", () => {
  let token = "";

  beforeAll(async () => {
    // Conectamos a la DB si no hay conexión activa
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGO_URI_TEST || process.env.MONGO_URI,
      );
    }

    // Intentamos login
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "kevin@gmail.com",
      password: "123456",
    });

    // VALIDACIÓN: Si el usuario no existe, el login fallará.
    // Forzamos el fallo del test aquí mismo si no hay token.
    if (!res.body.token) {
      throw new Error(
        "❌ Error en beforeAll: El usuario de prueba no existe o las credenciales fallaron.",
      );
    }

    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Debería fallar con 401 si no se envía token", async () => {
    const res = await request(app).get("/api/v1/tasks");
    expect(res.statusCode).toBe(401);
  });

  it("Debería obtener las tareas si el token es válido", async () => {
    const res = await request(app)
      .get("/api/v1/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
