import { Request, Response } from 'express';
import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { 
  ILoginRequestBody, 
  ILoginResponseBody, 
  IUsuarioDB, 
  ITurnoBD 
} from '../../../src/interfaces/auth.interface'; // Ajusté la ruta por si estás dentro de src/controllers
// ----------------------------------------------------
// 1. CONTROLADOR DE LOGIN
// ----------------------------------------------------
export const login = async (
  req: Request<{}, {}, ILoginRequestBody>,
  res: Response<ILoginResponseBody>
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
    }

    // Consulta SQL a la tabla `usuario`
    const query = 'SELECT * FROM usuario WHERE email = ? LIMIT 1';
    
    // Usamos IUsuarioDB[] directamente
    const [rows] = await pool.execute<IUsuarioDB[]>(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'El usuario no existe' });
    }

    const usuario = rows[0];

    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Retornamos el id_usuario para la app Expo
    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      tipo_usuario: usuario.tipo_usuario
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error al conectar con la base de datos' });
  }
};

// ----------------------------------------------------
// 2. CONTROLADOR PARA OBTENER TURNO DEL USUARIO
// ----------------------------------------------------
export const obtenerTurnoPorUsuario = async (
  req: Request,
  res: Response<ITurnoBD | { mensaje: string }>
): Promise<Response> => {
  try {
    // 1. Convertimos id_usuario a string explícitamente desde req.query
    const id_usuario = req.query.id_usuario as string;

    if (!id_usuario) {
      return res.status(400).json({ mensaje: 'Falta enviar el id_usuario' });
    }

    const query = `
      SELECT 
        t.id_turno,
        t.id_paciente,
        t.fecha,
        t.hora,
        t.estado,
        u_prof.nombre AS profesional_nombre,
        u_prof.apellido AS profesional_apellido
      FROM turno t
      INNER JOIN paciente p ON t.id_paciente = p.id_paciente
      INNER JOIN profesional prof ON t.id_profesional = prof.id_profesional
      INNER JOIN usuario u_prof ON prof.id_usuario = u_prof.id_usuario
      WHERE p.id_usuario = ? AND t.estado IN ('pendiente', 'confirmado')
      ORDER BY t.fecha ASC, t.hora ASC
      LIMIT 1;
    `;

    // 2. ¡LÍNEA 96 CORREGIDA!: Usamos Number(id_usuario) para que MySQL no se queje
    const [rows] = await pool.execute<ITurnoBD[]>(query, [Number(id_usuario)]);

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'No tenés turnos pendientes' });
    }

    return res.status(200).json(rows[0]);

  } catch (error) {
    console.error('Error al obtener turno:', error);
    return res.status(500).json({ mensaje: 'Error al consultar el turno en la base de datos' });
  }
};
// ----------------------------------------------------
// 2. CONTROLADOR PARA REGISTRAR USUARIO
// ----------------------------------------------------
export const registrarUsuario = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, apellido, dni, telefono, email, password } = req.body;

  // 1. Validamos que lleguen todos los datos obligatorios
  if (!nombre || !apellido || !dni || !email || !password) {
    return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser completados' });
  }

  // Obtenemos una conexión para manejar una transacción (así si falla una tabla, se cancela todo)
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 2. Verificamos si el email ya existe en la base de datos
    const [usuariosExistentes] = await connection.execute<ResultSetHeader[]>(
      'SELECT id_usuario FROM usuario WHERE email = ? LIMIT 1',
      [email]
    );

    if ((usuariosExistentes as any[]).length > 0) {
      await connection.rollback();
      return res.status(400).json({ mensaje: 'El email ya se encuentra registrado' });
    }

    // 3. Insertamos el nuevo usuario en la tabla `usuario`
    const [resultUsuario] = await connection.execute<ResultSetHeader>(
      `INSERT INTO usuario (nombre, apellido, email, password, dni, telefono, tipo_usuario, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [nombre, apellido, email, password, dni, telefono || null, 'paciente']
    );

    const id_usuario = resultUsuario.insertId;

    // 4. Insertamos los datos complementarios en la tabla `paciente`
    await connection.execute<ResultSetHeader>(
      'INSERT INTO paciente (id_usuario) VALUES (?)',
      [id_usuario]
    );

    // Confirmamos los cambios en la BD
    await connection.commit();

    // Devuelve el id_usuario para que la app inicie sesión automáticamente
    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      id_usuario: id_usuario
    });

  } catch (error) {
    // Si algo falla, cancelamos la operación para no dejar datos corruptos
    await connection.rollback();
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });
  } finally {
    // Liberamos la conexión
    connection.release();
  }
};

export const cancelarTurno = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id_turno, id_usuario } = req.body;

    if (!id_turno || !id_usuario) {
      return res.status(400).json({ mensaje: 'Faltan datos para cancelar el turno' });
    }

    // Solo se cancela si el turno pertenece al usuario logueado
    const [resultado] = await pool.execute<ResultSetHeader>(
      `UPDATE turno t
       INNER JOIN paciente p ON t.id_paciente = p.id_paciente
       SET t.estado = 'cancelado'
       WHERE t.id_turno = ? AND p.id_usuario = ? AND t.estado IN ('pendiente', 'confirmado')`,
      [Number(id_turno), Number(id_usuario)]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No se encontró un turno para cancelar' });
    }

    return res.status(200).json({ mensaje: 'Turno cancelado correctamente' });
  } catch (error) {
    console.error('Error al cancelar turno:', error);
    return res.status(500).json({ mensaje: 'Error al cancelar el turno' });
  }
};

export const obtenerAvancesPorUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = Number(req.query.id_usuario);

    if (!id_usuario) {
      return res.status(400).json({ mensaje: 'Falta enviar el id_usuario' });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT
         a.id_avance AS id,
         a.titulo,
         DATE_FORMAT(a.fecha, '%Y-%m-%d') AS fecha,
         a.peso,
         COALESCE(a.notas, '') AS contenido
       FROM avance a
       INNER JOIN paciente p ON a.id_paciente = p.id_paciente
       WHERE p.id_usuario = ?
       ORDER BY a.fecha DESC, a.id_avance DESC`,
      [id_usuario]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener avances:', error);
    return res.status(500).json({ mensaje: 'Error al consultar los avances' });
  }
};