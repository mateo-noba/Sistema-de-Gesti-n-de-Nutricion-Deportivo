import { Request } from "express";
import { RowDataPacket } from 'mysql2';

// Interface correspondiente a la tabla `usuario`
export interface IUsuarioDB {
  id_usuario: number;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  tipo_usuario: 'paciente' | 'profesional';
}

// Interface correspondiente a los datos del turno obtenidos con el JOIN
// Extendemos RowDataPacket
export interface ITurnoBD extends RowDataPacket {
  id_turno: number;
  id_paciente: number;
  fecha: string;
  hora: string;
  estado: string;
  profesional_nombre?: string;
  profesional_apellido?: string;
}

// Responses de Express
export interface ILoginRequestBody {
  email: string;
  password: string;
}

export interface ILoginResponseBody {
  mensaje: string;
  id_usuario?: number;
  nombre?: string;
  apellido?: string;
  tipo_usuario?: string;
}