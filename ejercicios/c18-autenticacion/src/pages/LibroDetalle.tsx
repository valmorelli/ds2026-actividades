import { useParams, Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import type { Libro } from '../types/libro';

interface LibroDetalleProps {
  libros: Libro[];
}

export function LibroDetalle({ libros }: LibroDetalleProps) {
  const { id } = useParams<{ id: string }>();
  const libroActual = libros.find(l => l.id === Number(id));
  if (!libroActual) {
    return (
      <Container className="my-5 text-center">
        <Card className="shadow-sm p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <Card.Title className="text-danger h3 mb-3">Libro no encontrado</Card.Title>
          <Card.Text className="text-secondary mb-4">
            Lo sentimos, el libro con el ID especificado no se encuentra en nuestro catalogo actual.
          </Card.Text>
          <Button as={Link} to="/catalogo" variant="primary">
            Volver al Catalogo
          </Button>
        </Card>
      </Container>
    );
  }


  return (
    <Container className="my-5">
      <Card className="shadow-sm p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <Row className="g-4 align-items-center">
          <Col md={4} className="text-center">
            <Card.Img 
              src={libroActual.imagen} 
              alt={libroActual.titulo} 
              style={{ maxHeight: '350px', objectFit: 'contain' }}
              className="rounded shadow-sm"
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <span className="text-primary fw-bold text-uppercase small">Detalle del Producto (ID: {id})</span>
              <Card.Title className="display-6 fw-bold mt-1 mb-2">{libroActual.titulo}</Card.Title>
              <Card.Subtitle className="mb-4 text-muted h5">{libroActual.autor}</Card.Subtitle>
              
              <Card.Text className="text-secondary lh-lg mb-4">
                {libroActual.descripcion}
              </Card.Text>
              
              <div className="d-flex gap-2">
                <Button as={Link} to="/catalogo" variant="outline-primary">
                  Volver al Catalogo
                </Button>
                <Button variant="success" onClick={() => alert('¡Libro reservado con exito!')}>
                  Reservar Libro
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}