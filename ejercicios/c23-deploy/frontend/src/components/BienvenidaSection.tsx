import { Container, Button } from 'react-bootstrap';

export default function BienvenidaSection() {
  return (
    <div style={{ backgroundColor: '#c490ba' }} className="text-center py-5 mb-5 border-bottom w-100 shadow-sm">
      <Container className="py-5">
        <h1 className="display-3 fw-bold mb-3" style={{ fontStyle: 'italic', color: '#402e36' }}>
          Explora nuestras historias
        </h1>
        <p className="lead fs-5 max-width-600 mx-auto" style={{ color: '#5c4a52' }}>
          Sumergite en nuestro catalogo seleccionado con las mejores obras destacadas, relatos increibles y mucho mas.
        </p>
        <Button href="#catalogo" size="lg" className="btn-girly-primary mt-4 px-4 py-2 shadow-sm border-0">
          Ver Catalogo
        </Button>
      </Container>
    </div>
  );
}