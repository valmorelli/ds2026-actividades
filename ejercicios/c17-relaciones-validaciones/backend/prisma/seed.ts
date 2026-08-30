import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Dan Brown", nacionalidad: "Estadounidense" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Julio Cortazar", nacionalidad: "Argentina" }
];

const categorias = [
  { nombre: "Ficcion" },
  { nombre: "Misterio" },
  { nombre: "Clasico" }
];

const libros = [
  {
    titulo: "El Codigo Da Vinci",
    autor: "Dan Brown",
    precio: 15000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/968.jpg",
    disponible: true,
    cats: ["Ficcion", "Misterio"]
  },
  {
    titulo: "Angeles y Demonios",
    autor: "Dan Brown",
    precio: 14000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1324869275i/960.jpg",
    disponible: true,
    cats: ["Misterio"]
  },
  {
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 12000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647463691i/60624021.jpg",
    disponible: false,
    cats: ["Clasico", "Ficcion"]
  }
];

async function main() {
  console.log("Iniciando seed...");
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map(nombre => ({ nombre })) }
      }
    });
  }
  console.log("Seed completado exitosamente!");
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });