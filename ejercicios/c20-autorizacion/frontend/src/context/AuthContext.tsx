import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Usuario, Rol, Credenciales, Sesion } from '../types/sesionType';
import { apiFetch } from '../services/api';
import { obtenerToken, guardarToken, borrarToken } from '../services/sesion';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(obtenerToken() !== null);

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  useEffect(() => {
    const token = obtenerToken();
    if (!token) {
      setCargando(false);
      return;
    }

    apiFetch<Usuario>('/auth/yo')
      .then((data) => {
        setUsuario(data);
      })
      .catch(() => {
        borrarToken();
        setUsuario(null);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => {
      window.removeEventListener('sesion-expirada', logout);
    };
  }, []);

  const login = async (credenciales: Credenciales): Promise<void> => {
    const res = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    guardarToken(res.token);
    setUsuario(res.usuario);
  };

  const estaAutenticado = usuario !== null;

  const tieneRol = (rol: Rol): boolean => {
    return usuario?.rol === rol;
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado,
        tieneRol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}