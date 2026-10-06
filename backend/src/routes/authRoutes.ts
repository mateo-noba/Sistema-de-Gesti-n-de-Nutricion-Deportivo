import { Router } from "express";
import { login, obtenerTurnoPorUsuario, registrarUsuario } from "../controllers/authController";

const router: Router = Router();

// POST ${API_URL}/login
router.post("/login", login);

// GET ${API_URL}/turnos?clienteId=123
router.get("/turnos", obtenerTurnoPorUsuario);

// ¡Agregamos la ruta de registro!
router.post('/registro', registrarUsuario);

export default router;