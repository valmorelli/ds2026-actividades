import { Container, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '500px', width: '100%' }} className="shadow-sm p-4 text-center border-0">
        <Alert variant="warning" className="mb-4 fw-bold">
          403 - Acceso denegado
        </Alert>
        <Card.Title className="h4 mb-3">No tenés permisos suficientes</Card.Title>
        <Card.Text className="text-secondary mb-4">
          Esta sección está reservada exclusivamente para administradores.
        </Card.Text>
        <div>
          <Link to="/catalogo" className="btn btn-outline-primary px-4">
            Volver al catálogo
          </Link>
        </div>
      </Card>
    </Container>
  );
}