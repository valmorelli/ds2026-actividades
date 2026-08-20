import { Libro } from '../types/libro.types';

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

let proximoId = 4;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) {
    return libros;
  }
  return libros.filter(l => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(l => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = {
    id: proximoId++,
    ...datos
  };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return undefined;
  }
  libros[index] = {
    id,
    ...datos
  };
  return libros[index];
}

export function remove(id: number): boolean {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) {
    return false;
  }
  libros.splice(index, 1);
  return true;
}