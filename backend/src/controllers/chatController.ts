import { Request, Response } from 'express';

const SYSTEM_PROMPT = `Sos el asistente virtual de un consultorio de nutrición deportiva.
Respondé en español rioplatense, de forma clara y breve.
Podés dar información general sobre alimentación, hidratación, suplementos y entrenamiento.
No hagas diagnósticos ni indiques medicación. Ante síntomas, lesiones o patologías, recomendá consultar con el profesional del consultorio.
Si te preguntan algo que no tiene relación con nutrición, deporte o el consultorio, explicá amablemente que no podés ayudar con eso.
Siempre responde en formato de texto plano.`;

interface MensajeChat {
  rol: 'user' | 'model';
  texto: string;
}

export const enviarMensaje = async (req: Request, res: Response): Promise<Response> => {
  try {
    const mensajes: MensajeChat[] = req.body?.mensajes;

    if (!Array.isArray(mensajes) || mensajes.length === 0) {
      return res.status(400).json({ mensaje: 'Falta enviar los mensajes' });
    }

    // Variables leídas acá porque dotenv se carga después de los imports
    const apiKey = process.env.GEMINI_API_KEY;
    const modelo = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

    if (!apiKey) {
      console.error('Falta GEMINI_API_KEY en el .env');
      return res.status(500).json({ mensaje: 'El chatbot no está configurado' });
    }

    // Solo los últimos 20 mensajes, para controlar el costo
    const contents = mensajes.slice(-20).map((m) => ({
      role: m.rol === 'model' ? 'model' : 'user',
      parts: [{ text: String(m.texto).slice(0, 2000) }],
    }));

    const respuesta = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
        }),
      }
    );

    const data: any = await respuesta.json();

    if (!respuesta.ok) {
      console.error('Error de Gemini:', JSON.stringify(data));
      return res.status(502).json({ mensaje: 'No se pudo obtener respuesta del asistente' });
    }

    const texto = data.candidates?.[0]?.content?.parts
      ?.map((p: any) => p.text ?? '')
      .join('');

    if (!texto) {
      return res.status(502).json({ mensaje: 'El asistente no pudo responder esa consulta' });
    }

    return res.status(200).json({ respuesta: texto });
  } catch (error) {
    console.error('Error en el chatbot:', error);
    return res.status(500).json({ mensaje: 'Error al consultar el chatbot' });
  }
};