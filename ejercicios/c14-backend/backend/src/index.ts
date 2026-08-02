import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

const libros: Libro[] = [
  {
    id: 1,
    titulo: "El Codigo Da Vinci",
    autor: "Dan Brown",
    precio: 15000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/968.jpg",
    disponible: true
  },
  {
    id: 2,
    titulo: "Angeles y Demonios",
    autor: "Dan Brown",
    precio: 14000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1324869275i/960.jpg",
    disponible: true
  },
  {
    id: 3,
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 12000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647463691i/60624021.jpg",
    disponible: false
  }
];

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Libreria UTN funcionando en Docker" });
});

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});