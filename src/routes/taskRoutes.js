import express from "express";
import { body } from "express-validator";
import {
  getTasks,
  createTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

// Reglas de validación (puedes moverlas a otro archivo si quieres aún más orden)
const taskRules = [
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .trim()
    .isLength({ min: 3 }),
];

router.get("/", protect, getTasks);

router.post("/", protect, taskRules, validate, createTask);

router.delete("/:id", protect, deleteTask);

export default router;
