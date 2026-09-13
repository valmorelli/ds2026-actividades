import { useState } from 'react';
import { Navbar, Container, Offcanvas, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

          <div style={{ width: '32px' }}></div>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start" className="sidebar-girly">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">🌸 Menu de Navegacion</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            <Nav.Link as={Link} to="/" onClick={handleClose} className="sidebar-link">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo" onClick={handleClose} className="sidebar-link">
              Catalogo
            </Nav.Link>
            <Nav.Link as={Link} to="/libros/nuevo" onClick={handleClose} className="sidebar-link">
            ➕ Agregar Libro
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}