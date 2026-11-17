import { Router } from 'express';
import {
  obtenerPacientes,
  obtenerPaciente,
  borrarPaciente
} from '../controllers/pacienteController';

const router = Router();

router.get('/', obtenerPacientes);
router.get('/:id', obtenerPaciente);
router.delete('/:id', borrarPaciente);

export default router;