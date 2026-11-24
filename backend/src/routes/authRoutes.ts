import { Router } from "express";
import { login, obtenerTurnoPorUsuario, registrarUsuario, cancelarTurno, obtenerAvancesPorUsuario, obtenerPlanNutricional, descargarPlanPDF, obtenerRutinaEjercicios, descargarRutinaPDF } from "../controllers/authController";
import { enviarMensaje } from "../controllers/chatController";

const router: Router = Router();

// POST ${API_URL}/login
router.post("/login", login);

// GET ${API_URL}/turnos?clienteId=123
router.get("/mis-turnos", obtenerTurnoPorUsuario);

// ¡Agregamos la ruta de registro!
router.post('/registro', registrarUsuario);

router.put("/cancelar-turno", cancelarTurno);

router.get("/avances", obtenerAvancesPorUsuario);

router.get("/plan-nutricional", obtenerPlanNutricional);

router.get("/plan-nutricional/pdf", descargarPlanPDF);

router.get("/rutina-ejercicios", obtenerRutinaEjercicios);

router.get("/rutina-ejercicios/pdf", descargarRutinaPDF);

router.post("/chatbot", enviarMensaje);

export default router;