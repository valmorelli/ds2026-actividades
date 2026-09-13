import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/loginSchema';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';

interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: 'ADMIN' | 'CLIENTE';
  };
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validacion = loginSchema.safeParse({ email, password });
    if (!validacion.success) {
      setError(validacion.error.issues[0].message);
      return;
    }

    try {
      setCargando(true);
      const res = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(validacion.data),
      });

      guardarToken(res.token);
      navigate('/catalogo');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al iniciar sesión');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '450px' }}>
      <Card className="shadow-sm p-4">
        <Card.Title className="h3 mb-4 text-center">Iniciar Sesión</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="nombre@libreria.test"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 py-2" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Entrar'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}