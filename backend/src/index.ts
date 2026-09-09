import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db';
import turnoRoutes from './routes/turnoRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Rutas
app.use('/api/turnos', turnoRoutes);
// Ruta de prueba
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    res.json({ status: 'ok', db: 'Conectado a MySQL', resultado: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', mensaje: 'Error al conectar con MySQL', error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});