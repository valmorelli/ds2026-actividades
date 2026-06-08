import { Container, Row, Col } from 'react-bootstrap';
import BienvenidaSection from '../components/BienvenidaSection';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

export function Home() {
  const librosDestacados: Libro[] = [
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
  ];

  return (
    <>
      <BienvenidaSection />

      <Container id="catalogo" className="mb-5">
        <h2 className="text-center mb-4 fw-bold">Libros Destacados</h2>
        
        <Row xs={1} sm={2} lg={3} className="g-4">
          {librosDestacados.map((libro) => (
            <Col key={libro.id}>
              <LibroCard 
                titulo={libro.titulo}
                autor={libro.autor}
                imagen={libro.imagen}
                descripcion={libro.descripcion}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}