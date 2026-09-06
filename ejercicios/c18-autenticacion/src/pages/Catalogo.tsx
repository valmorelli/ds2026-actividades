import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import BienvenidaSection from '../components/BienvenidaSection';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  return (
    <>
      <BienvenidaSection />
      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold titulo-catalogo-default">Catalogo Completo</h2>

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="primary" style={{ color: '#840869' }} />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="my-4 text-center fw-bold">
            {error}
          </Alert>
        )}

        {!loading && !error && libros && (
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
        )}
      </Container>
    </>
  );
}