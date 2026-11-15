import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { apiFetch } from '../services/api';
import type { Libro } from '../types/libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+UTN';

interface LibroNuevoProps {
  onAgregar: (libro: Libro) => void;
}

export default function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    autorId: '1',
    precio: '4500',
    descripcion: '',
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const err: Record<string, string> = {};
    if (!form.titulo.trim()) err.titulo = 'El título es obligatorio';
    if (!form.autorId.trim()) err.autorId = 'El ID del autor es obligatorio';
    if (!form.descripcion.trim() || form.descripcion.length < 10) {
      err.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorApi(null);

    const err = validar();
    if (Object.keys(err).length > 0) {
      setErrores(err);
      return;
    }

    setErrores({});
    setCargando(true);

    try {
      // POST a la API real: apiFetch manda el token en Authorization automáticamente
      const nuevoLibro = await apiFetch<Libro>('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: form.titulo,
          autorId: Number(form.autorId),
          precio: Number(form.precio) || 4500,
          imagen: IMG_PLACEHOLDER,
          disponible: true,
        }),
      });

      onAgregar(nuevoLibro);
      navigate('/catalogo');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorApi(err.message);
      } else {
        setErrorApi('Error al crear el libro');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '500px', width: '100%' }} className="shadow-sm p-4 border-0">
        <h2 className="text-center mb-4 fw-bold">Nuevo Libro</h2>

        {errorApi && (
          <Alert variant="danger" className="text-center">
            {errorApi}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              isInvalid={!!errores.titulo}
            />
            <Form.Control.Feedback type="invalid">{errores.titulo}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ID de Autor (por defecto 1)</Form.Label>
            <Form.Control
              type="number"
              name="autorId"
              value={form.autorId}
              onChange={handleChange}
              isInvalid={!!errores.autorId}
            />
            <Form.Control.Feedback type="invalid">{errores.autorId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Descripción o Reseña</Form.Label>
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

          <Button
            type="submit"
            className="w-100 py-2 fw-bold btn-girly-primary"
            disabled={cargando}
          >
            {cargando ? 'Guardando...' : 'Agregar Libro'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}