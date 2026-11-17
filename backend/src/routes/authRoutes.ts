import { Router } from "express";
import { login, obtenerTurnoPorUsuario, registrarUsuario, cancelarTurno, obtenerAvancesPorUsuario } from "../controllers/authController";

const router: Router = Router();

// POST ${API_URL}/login
router.post("/login", login);

// GET ${API_URL}/turnos?clienteId=123
router.get("/mis-turnos", obtenerTurnoPorUsuario);

// ¡Agregamos la ruta de registro!
router.post('/registro', registrarUsuario);

router.put("/cancelar-turno", cancelarTurno);

router.get("/avances", obtenerAvancesPorUsuario);

export default router;