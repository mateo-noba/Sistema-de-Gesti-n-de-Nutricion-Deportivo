import fs from "fs";
import path from "path";
import { pool } from "../src/config/db";

// Uso: npx ts-node subirPlan.ts <id_paciente> <id_profesional> <ruta_imagen>
const [idPaciente, idProfesional, ruta] = process.argv.slice(2);

(async () => {
  const ext = path.extname(ruta).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  const base64 = fs.readFileSync(ruta).toString("base64");

  await pool.execute(
    "INSERT INTO plan_nutricional (id_paciente, id_profesional, imagen) VALUES (?, ?, ?)",
    [Number(idPaciente), Number(idProfesional), `data:${mime};base64,${base64}`]
  );

  console.log("Plan cargado");
  process.exit(0);
})();