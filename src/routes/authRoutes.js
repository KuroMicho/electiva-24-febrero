import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

// Reglas de validación (puedes moverlas a otro archivo si quieres aún más orden)
const registerRules = [
  body("name", "El nombre es obligatorio").notEmpty().trim(),
  body("email", "Email no válido").isEmail().normalizeEmail(),
  body("password", "Mínimo 6 caracteres").isLength({ min: 6 }),
];

const loginRules = [
  body("email", "Email no válido").isEmail().normalizeEmail(),
  body("password", "La contraseña es obligatoria").exists(),
];

// Rutas
router.post("/register", registerRules, validate, registerUser);
router.post("/login", loginRules, validate, loginUser);

export default router;
