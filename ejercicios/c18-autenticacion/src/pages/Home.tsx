// Así tiene que verse tu archivo src/pages/Home.tsx para que muestre la bienvenida:
import { Container, Row, Col } from 'react-bootstrap';
import BienvenidaSection from '../components/BienvenidaSection';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

interface HomeProps {
  libros: Libro[];
}

export function Home({ libros }: HomeProps) {
  return (
    <>
      <BienvenidaSection />
      <Container id="catalogo" className="mb-5">
        <h2 className="text-center mb-4 fw-bold titulo-catalogo-default">Libros Destacados</h2>
        <Row xs={1} sm={2} lg={3} className="g-4">
          {libros.map((libro) => (
            <Col key={libro.id}>
              <LibroCard 
                id={libro.id}
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