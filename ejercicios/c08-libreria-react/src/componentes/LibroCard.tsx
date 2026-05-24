import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

interface LibroProps {
  titulo: string;
  autor: string;
  imagen: string;
  descripcion: string;
}

export default function LibroCard({ titulo, autor, imagen, descripcion }: LibroProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imagen} 
        alt={titulo} 
        style={{ height: '320px', objectFit: 'cover' }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5">{titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{autor}</Card.Subtitle>
        <Card.Text className="text-secondary small flex-grow-1">{descripcion}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button variant="outline-primary" size="sm">Ver Detalle</Button>
          <Button 
            variant={liked ? "danger" : "outline-danger"} 
            size="sm"
            onClick={() => setLiked(!liked)}
          >
            {liked ? '❤️ Favorito' : '🤍 Me gusta'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}