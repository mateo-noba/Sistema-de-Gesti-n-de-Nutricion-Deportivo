import { Request, Response } from 'express';
import { pool } from '../config/db';
import { ResultSetHeader } from 'mysql2';

const SELECT_PACIENTE = `
  SELECT 
    CAST(p.id_paciente AS CHAR) AS id,
    p.id_paciente,
    p.id_usuario,
    u.nombre,
    u.apellido,
    u.dni,
    u.email,
    COALESCE(u.telefono, '') AS telefono,
    p.fecha_nacimiento,
    p.obra_social,
    COALESCE(ea.peso, 0) AS peso,
    COALESCE(ea.altura, 0) AS altura,
    COALESCE(ea.imc, 0) AS imc,
    'Activo' AS estado
  FROM paciente p
  INNER JOIN usuario u ON p.id_usuario = u.id_usuario
  LEFT JOIN estudio_antropometrico ea ON ea.id_estudio = (
    SELECT id_estudio 
    FROM estudio_antropometrico 
    WHERE id_paciente = p.id_paciente 
    ORDER BY fecha DESC, id_estudio DESC 
    LIMIT 1
  )
`;

// Obtener todos los pacientes
export const obtenerPacientes = async (req: Request, res: Response) => {
  try {
    const [pacientes] = await pool.query(`${SELECT_PACIENTE} ORDER BY u.apellido ASC, u.nombre ASC`);
    res.json(pacientes);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ mensaje: 'Error al obtener los pacientes', error });
  }
};

// Obtener un paciente por ID
export const obtenerPaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [pacientes]: any = await pool.query(`${SELECT_PACIENTE} WHERE p.id_paciente = ?`, [id]);

    if (pacientes.length === 0) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    res.json(pacientes[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el paciente', error });
  }
};

// Eliminar un paciente (borra usuario y paciente en transacción)
export const borrarPaciente = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    await connection.beginTransaction();

    const [rows]: any = await connection.query(
      'SELECT id_usuario FROM paciente WHERE id_paciente = ?',
      [id]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    const idUsuario = rows[0].id_usuario;

    await connection.query('DELETE FROM paciente WHERE id_paciente = ?', [id]);
    await connection.query('DELETE FROM usuario WHERE id_usuario = ?', [idUsuario]);

    await connection.commit();
    res.json({ mensaje: 'Paciente eliminado correctamente' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el paciente', error });
  } finally {
    connection.release();
  }
};