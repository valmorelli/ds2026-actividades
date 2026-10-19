import { useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [show, setShow] = useState(false);
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const manejarSesion = () => {
    handleClose();
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar style={{ backgroundColor: '#840869' }} className="navbar-girly py-3" sticky="top">
        <Container fluid className="d-flex align-items-center justify-content-between px-3 position-relative">
          <Button
            variant="link"
            onClick={handleShow}
            className="p-0 border-0 bg-transparent navbar-toggler-btn text-white fs-2"
            aria-label="Abrir menu"
          >
            ☰
          </Button>

          <Navbar.Brand
            as={Link}
            to="/"
            className="brand-regality mx-auto text-center position-absolute start-50 translate-middle-x text-white"
          >
            ⭑ Libreria UTN ⭑
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-2">
            {usuario ? (
              <span className="text-white small d-none d-md-inline fw-semibold">
                Hola, {usuario.nombre}
              </span>
            ) : null}
            <Button
              variant="outline-light"
              size="sm"
              onClick={manejarSesion}
              className="px-3"
            >
              {usuario ? 'Salir' : 'Ingresar'}
            </Button>
          </div>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start" className="sidebar-girly">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">🌸 Menú de Navegación</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            {usuario && (
              <div className="p-2 mb-2 bg-light rounded text-center">
                <span className="text-muted small">Conectado como:</span>
                <div className="fw-bold">{usuario.nombre}</div>
                <span className="badge bg-secondary">{usuario.rol}</span>
              </div>
            )}
            <Nav.Link as={Link} to="/" onClick={handleClose} className="sidebar-link">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo" onClick={handleClose} className="sidebar-link">
              Catálogo
            </Nav.Link>
            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo" onClick={handleClose} className="sidebar-link">
                ➕ Agregar Libro
              </Nav.Link>
            )}
            <hr className="my-2" />
            <Button
              variant={usuario ? 'outline-danger' : 'outline-primary'}
              size="sm"
              onClick={manejarSesion}
              className="w-100 mt-2"
            >
              {usuario ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}