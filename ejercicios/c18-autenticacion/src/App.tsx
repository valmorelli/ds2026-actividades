import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import { useFetch } from './hooks/useFetch';
import { Spinner, Alert, Container } from 'react-bootstrap';
import type { Libro } from './types/libro';

export default function App() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const { data, loading, error } = useFetch<Libro[]>('/libros.json');

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
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  );
}