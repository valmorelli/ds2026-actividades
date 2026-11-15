import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import { Login } from './pages/Login';
import { SinPermiso } from './pages/SinPermiso';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { useFetch } from './hooks/useFetch';
import { Spinner, Alert, Container } from 'react-bootstrap';
import type { Libro } from './types/libro';

function AppContent() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const { data, loading, error } = useFetch<Libro[]>('/libros');

  useEffect(() => {
    if (data) {
      setLibros(data);
    }
  }, [data]);

  const agregarLibro = (nuevoLibro: Libro) => {
    setLibros([...libros, nuevoLibro]);
  };

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center flex-grow-1 my-5">
          <Spinner animation="border" style={{ color: '#840869' }} />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="my-5">
          <Alert variant="danger" className="text-center fw-bold">
            {error}
          </Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sin-permiso" element={<SinPermiso />} />

        {/* Rutas protegidas exclusivas para ADMIN */}
        <Route element={<PrivateRoute rol="ADMIN" />}>
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}