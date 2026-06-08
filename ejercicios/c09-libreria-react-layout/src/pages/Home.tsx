import { Container, Row, Col } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import BienvenidaSection from '../components/BienvenidaSection';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

export function Home() {
  const librosDestacados: Libro[] = [
    {
      id: 1,
      titulo: "El Código Da Vinci",
      autor: "Dan Brown",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/968.jpg",
      descripcion: "Un emocionante thriller que combina criptografía, arte y teorías de conspiración histórica."
    },
    {
      id: 2,
      titulo: "Ángeles y Demonios",
      autor: "Dan Brown",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1324869275i/960.jpg",
      descripcion: "El profesor Robert Langdon se sumerge en una carrera contra el tiempo para detener a los Illuminati."
    },
    {
      id: 3,
      titulo: "El Aleph",
      autor: "Jorge Luis Borges",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647463691i/60624021.jpg",
      descripcion: "Una brillante colección de cuentos que exploran el infinito, la identidad y la eternidad."
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 w-100 m-0 p-0">
      <CustomNavbar />

      <BienvenidaSection />

      <Container id="catalogo" className="mb-5 flex-grow-1">
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

      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
          <p className="mb-0 small">&copy; 2026 Libreria UTN - Desarrollo de Software</p>
      </footer>
    </div>
  );
}