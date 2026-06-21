import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import type { Libro } from './types/libro';

export default function App() {
  const [libros, setLibros] = useState<Libro[]>([
    {
      id: 1,
      titulo: "El Codigo Da Vinci",
      autor: "Dan Brown",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/968.jpg",
      descripcion: "Un emocionante thriller que combina criptografia, arte y teorias de conspiracion historica."
    },
    {
      id: 2,
      titulo: "Angeles y Demonios",
      autor: "Dan Brown",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1324869275i/960.jpg",
      descripcion: "El profesor Robert Langdon se sumerge en una carrera contra el tiempo para detener a los Illuminati."
    },
    {
      id: 3,
      titulo: "El Aleph",
      autor: "Jorge Luis Borges",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647463691i/60624021.jpg",
      descripcion: "Una brillante coleccion de cuentos que exploran el infinito, la identidad y la eternidad."
    }
  ]);

  const agregarLibro = (nuevoLibro: Libro) => {
    setLibros([...libros, nuevoLibro]);
  };

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