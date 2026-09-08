import { Request, Response } from 'express';
import { pool } from '../config/db';

// Obtener todos los turnos
export const obtenerTurnos = async (req: Request, res: Response) => {
  try {
    const [turnos] = await pool.query('SELECT * FROM turno');
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los turnos', error });
  }
};

// Obtener un turno por ID
export const obtenerTurno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [turnos]: any = await pool.query('SELECT * FROM turno WHERE id_turno = ?', [id]);
    
    if (turnos.length === 0) {
      return res.status(404).json({ mensaje: 'Turno no encontrado' });
    }
    
    res.json(turnos[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el turno', error });
  }
};

// Crear un nuevo turno
export const crearTurno = async (req: Request, res: Response) => {
  try {
    const { id_paciente, id_profesional, fecha, hora, estado } = req.body;
    const estadoFinal = estado || 'pendiente';

    const [resultado]: any = await pool.query(
      'INSERT INTO turno (id_paciente, id_profesional, fecha, hora, estado) VALUES (?, ?, ?, ?, ?)',
      [id_paciente, id_profesional, fecha, hora, estadoFinal]
    );

    res.status(201).json({
      id_turno: resultado.insertId,
      id_paciente,
      id_profesional,
      fecha,
      hora,
      estado: estadoFinal
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el turno', error });
  }
};

// Editar un turno
export const editarTurno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id_paciente, id_profesional, fecha, hora, estado } = req.body;

    await pool.query(
      'UPDATE turno SET id_paciente = ?, id_profesional = ?, fecha = ?, hora = ?, estado = ? WHERE id_turno = ?',
      [id_paciente, id_profesional, fecha, hora, estado, id]
    );

    res.json({ mensaje: 'Turno actualizado correctamente', id_turno: id });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar el turno', error });
  }
};

// Borrar un turno
export const borrarTurno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM turno WHERE id_turno = ?', [id]);
    res.json({ mensaje: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al borrar el turno', error });
  }
};