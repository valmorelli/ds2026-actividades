import { Container, Button } from 'react-bootstrap';

export default function BienvenidaSection() {
  return (
    <div className="bg-light text-center py-5 mb-4 border-bottom w-100">
      <Container className="py-4">
        <h1 className="display-4 fw-bold text-dark">Bienvenidos a Libreria UTN</h1>
        <p className="lead text-muted">Explora nuestro catalogo con los mejores libros destacados de Dan Brown, Borges y muchos mas</p>
        <Button variant="primary" size="lg" href="#catalogo" className="mt-4">Ver Catalogo</Button>
      </Container>
    </div>
  );
}