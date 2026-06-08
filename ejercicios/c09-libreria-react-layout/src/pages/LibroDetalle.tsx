import { useParams, Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();

  const descripciones: Record<string, { titulo: string; autor: string; texto: string; imagen: string }> = {
    "1": {
      titulo: "El Codigo Da Vinci",
      autor: "Dan Brown",
      texto: "Un emocionante thriller que combina criptografia, arte y teorias de conspiracion historica. El profesor Robert Langdon se ve envuelto en un misterio ancestral tras un asesinato en el Museo del Louvre.",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/968.jpg"
    },
    "2": {
      titulo: "Angeles y Demonios",
      autor: "Dan Brown",
      texto: "El profesor Robert Langdon se sumerge en una carrera contra el tiempo para detener a los Illuminati, una antigua hermandad secreta que amenaza con destruir la Ciudad del Vaticano utilizando una nueva y peligrosa arma.",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1324869275i/960.jpg"
    },
    "3": {
      titulo: "El Aleph",
      autor: "Jorge Luis Borges",
      texto: "Una brillante coleccion de cuentos que exploran el infinito, la identidad y la eternidad. El cuento principal describe un punto en el espacio que contiene todos los demas puntos del universo simultaneamente.",
      imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647463691i/60624021.jpg"
    }
  };

  const libroKey = id ? String(id).trim() : "";
  
  const libroActual = descripciones[libroKey] ? descripciones[libroKey] : {
    titulo: "Libro no encontrado",
    autor: "Desconocido",
    texto: "Lo sentimos, el libro con el ID especificado no se encuentra en nuestro catalogo actual.",
    imagen: "https://via.placeholder.com/300x450?text=No+disponible"
  };

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
                {libroActual.texto}
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