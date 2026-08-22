import { prisma } from "../src/config/prisma";

const libros = [
  {
    titulo: "El Codigo Da Vinci",
    autor: "Dan Brown",
    precio: 15000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/968.jpg",
    disponible: true,
  },
  {
    titulo: "Angeles y Demonios",
    autor: "Dan Brown",
    precio: 14000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1324869275i/960.jpg",
    disponible: true,
  },
  {
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 12000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647463691i/60624021.jpg",
    disponible: false,
  },
];

const autores = [
  {
    nombre: "Dan Brown",
    nacionalidad: "Estadounidense",
    biografia: "Autor de novelas de suspenso y misterio reconocidas internacionalmente.",
  },
  {
    nombre: "Jorge Luis Borges",
    nacionalidad: "Argentina",
    biografia: "Uno de los autores mas destacados de la literatura del siglo XX.",
  },
  {
    nombre: "Julio Cortazar",
    nacionalidad: "Argentina",
    biografia: "Maestro del relato corto, la prosa poetica y la narracion desestructurada.",
  },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();