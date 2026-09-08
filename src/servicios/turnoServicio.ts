// Si estás probando en la Web o emulador:
const URL = "http://localhost:3000/api/turnos";

// NOTA: Si usás la app en un CELULAR FÍSICO con Expo Go,
// reemplazá 'localhost' por la IP local de tu PC (ej: "http://192.168.1.50:3000/api/turnos"

export const obtenerTurnos = async () => {
  const respuesta = await fetch(URL);
  return respuesta.json();
};

export const obtenerTurno = async (id: string) => {
  const respuesta = await fetch(`${URL}/${id}`);
  return respuesta.json();
};

export const crearTurno = async (datos: any) => {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  return respuesta.json();
};

export const editarTurno = async (id: string, datos: any) => {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  return respuesta.json();
};

export const borrarTurno = async (id: string) => {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) {
    throw new Error("Error al borrar el turno");
  }

  return true;
};