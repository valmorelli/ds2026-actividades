import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import type { Libro } from '../types/libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+UTN';

interface LibroNuevoProps {
  onAgregar: (libro: Libro) => void;
}

export default function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    descripcion: ''
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const err: Record<string, string> = {};
    if (!form.titulo.trim()) err.titulo = 'El titulo es obligatorio';
    if (!form.autor.trim()) err.autor = 'El autor es obligatorio';
    if (!form.descripcion.trim() || form.descripcion.length < 10) {
      err.descripcion = 'La descripcion debe tener al menos 10 caracteres';
    }
    return err;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validar();

    if (Object.keys(err).length > 0) {
      setErrores(err);
      return;
    }

    setErrores({});
    onAgregar({
      id: Date.now(),
      titulo: form.titulo,
      autor: form.autor,
      descripcion: form.descripcion,
      imagen: IMG_PLACEHOLDER
    });
    navigate('/catalogo');
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '500px', width: '100%' }} className="shadow-sm p-4 border-0">
        <h2 className="text-center mb-4 fw-bold">Nuevo Libro</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Titulo</Form.Label>
            <Form.Control 
              name="titulo" 
              value={form.titulo}
              onChange={handleChange} 
              isInvalid={!!errores.titulo} 
            />
            <Form.Control.Feedback type="invalid">{errores.titulo}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control 
              name="autor" 
              value={form.autor}
              onChange={handleChange} 
              isInvalid={!!errores.autor} 
            />
            <Form.Control.Feedback type="invalid">{errores.autor}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Descripcion o Resena</Form.Label>
            <Form.Control 
              as="textarea"
              rows={3}
              name="descripcion" 
              value={form.descripcion}
              onChange={handleChange} 
              isInvalid={!!errores.descripcion} 
            />
            <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100 py-2 fw-bold btn-girly-primary">
            Agregar Libro
          </Button>
        </Form>
      </Card>
    </Container>
  );
}