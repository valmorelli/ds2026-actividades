import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface LibroCardProps {
  id: number;
  titulo: string;
  autor: string;
  imagen: string;
  descripcion: string;
}

export default function LibroCard({ id, titulo, autor, imagen, descripcion }: LibroCardProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Card className="h-100 card-girly border-0 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imagen} 
        alt={titulo} 
        style={{ height: '340px', objectFit: 'cover' }} 
      />
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="h4 mb-2 fw-bold titulo-libro-yrguma">{titulo}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted small">
          Por {autor}
        </Card.Subtitle>
        <Card.Text className="text-secondary small flex-grow-1 lh-base">{descripcion}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Button as={Link} to={`/libros/${id}`} className="btn-girly-primary btn-sm px-4 py-2">
            Ver mas
          </Button>
          <Button 
            variant={liked ? "danger" : "outline-danger"} 
            size="sm"
            style={{ borderRadius: '12px', padding: '6px 10px' }}
            onClick={() => setLiked(!liked)}
          >
            {liked ? '❤️' : '🤍'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}