import { Router } from 'express';
import {
  obtenerTurnos,
  obtenerTurno,
  crearTurno,
  editarTurno,
  borrarTurno
} from '../controllers/turnoController';

const router = Router();

router.get('/', obtenerTurnos);
router.get('/:id', obtenerTurno);
router.post('/', crearTurno);
router.put('/:id', editarTurno);
router.delete('/:id', borrarTurno);

export default router;