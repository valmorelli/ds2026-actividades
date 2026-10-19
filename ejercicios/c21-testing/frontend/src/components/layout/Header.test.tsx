import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Header from './Header';
import { AuthContext } from '../../context/AuthContext';
import type { Usuario, Rol } from '../../types/sesionType';

// Limpiamos el DOM después de cada test para que no se superpongan
afterEach(() => {
  cleanup();
});

function renderHeader(usuario: Usuario | null) {
  const auth = { 
    usuario, 
    cargando: false, 
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol, 
    login: vi.fn(), 
    logout: vi.fn() 
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('Header Component', () => {
  it('CLIENTE: saluda por nombre y NO ve "Nuevo libro"', () => {
    renderHeader({ id: 2, email: 'cliente@test.com', nombre: 'Cliente', rol: 'CLIENTE' });
    
    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.queryByText('➕ Agregar Libro')).not.toBeInTheDocument();
  });

  it('ADMIN: ve la opción "Nuevo libro"', () => {
    renderHeader({ id: 1, email: 'admin@test.com', nombre: 'Admin', rol: 'ADMIN' });
    
    const botonMenu = screen.getByRole('button', { name: 'Abrir menu' });
    fireEvent.click(botonMenu);
    
    expect(screen.getByText('➕ Agregar Libro')).toBeInTheDocument();
  });
});