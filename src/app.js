import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// 1. Middleware Globales
app.use(express.json());

// 2. Documentación (SIEMPRE antes de los errores)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 3. Rutas
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/auth", authRoutes);

// 4. Middleware de Errores (SIEMPRE al final)
app.use(notFound);
app.use(errorHandler);

export default app; // Exportamos para testing o para el server
