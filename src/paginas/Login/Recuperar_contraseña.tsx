import React, { useState } from 'react';

type RequestStatus = 'idle' | 'Cargando' | 'Exitoso' | 'Error';

export function OlvidePassword() {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [errorMensaje, setErrorMessage] = useState<string>('');

  const AnotadoAMano = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Cargando');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('No se pudo procesar la solicitud. Intenta nuevamente.');
      }

      setStatus('Exitoso');
    } catch (err) {
      setStatus('Error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Ocurrió un error inesperado.'
      );
    }
  };

  if (status === 'Exitoso') {
    return (
      <div role="status">
        <h2>Revisa tu correo</h2>
        <p>
          Si existe una cuenta asociada a <strong>{email}</strong>,
          recibirás un enlace para restablecer tu contraseña en unos minutos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={AnotadoAMano}>
      <h2>Recuperar contraseña</h2>
      <p>Ingresa tu correo electrónico y te enviaremos un enlace de recuperación.</p>

      <label htmlFor="mail-de-recuperacion">Correo electrónico</label>
      <input
        id="mail-de-recuperacion"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        required
        disabled={status === 'Cargando'}
      />

      {status === 'Error' && (
        <p role="alert" style={{ color: 'red' }}>
          {errorMensaje}
        </p>
      )}

      <button type="submit" disabled={status === 'Cargando' || !email}>
        {status === 'Cargando' ? 'Enviando...' : 'Enviar enlace'}
      </button>
    </form>
  );
}