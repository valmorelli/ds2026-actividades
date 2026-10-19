import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = obtenerToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opciones.headers,
  };

  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers,
  });

  const cuerpo = await res.json().catch(() => null);

  // Si da 401 y tenia un token enviado, la sesion expiro en el servidor
  if (res.status === 401 && token) {
    window.dispatchEvent(new Event("sesion-expirada"));
  }

  if (!res.ok) {
    throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}