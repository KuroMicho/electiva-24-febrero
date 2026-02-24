import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📝 Documentación en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error(`Error al iniciar: ${error.message}`);
    process.exit(1);
  }
};

startServer();
