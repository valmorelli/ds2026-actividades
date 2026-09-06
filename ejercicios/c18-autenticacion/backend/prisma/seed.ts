import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";
import { SALT_ROUNDS } from "../src/config/env";

const usuarios = [
  {
    email: "admin@libreria.test",
    nombre: "Admin",
    rol: "ADMIN" as const,
    password: "Admin1234",
  },
  {
    email: "cliente@libreria.test",
    nombre: "Cliente",
    rol: "CLIENTE" as const,
    password: "Cliente1234",
  },
];

const autores = [
  { nombre: "Dan Brown", nacionalidad: "Estadounidense" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Julio Cortazar", nacionalidad: "Argentina" },
];

const categorias = [
  { nombre: "Ficcion" },
  { nombre: "Misterio" },
  { nombre: "Clasico" },
];

const libros = [
  {
    titulo: "El Codigo Da Vinci",
    autor: "Dan Brown",
    precio: 15000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511288482i/968.jpg",
    disponible: true,
    cats: ["Ficcion", "Misterio"],
  },
  {
    titulo: "Angeles y Demonios",
    autor: "Dan Brown",
    precio: 14000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1324869275i/960.jpg",
    disponible: true,
    cats: ["Misterio"],
  },
  {
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    precio: 12000,
    imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647463691i/60624021.jpg",
    disponible: false,
    cats: ["Clasico", "Ficcion"],
  },
];

async function main() {
  console.log("Iniciando seed C18...");

  for (const { password, ...datos } of usuarios) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS); //
    await prisma.usuario.upsert({
      where: { email: datos.email }, //[cite: 1]
      update: {
        passwordHash, // Actualiza el hash si el usuario ya existía en la base
        nombre: datos.nombre,
        rol: datos.rol,
      },
      create: {
        ...datos,
        passwordHash,
      }, //[cite: 1]
    });
  }

  for (const autor of autores) {
    await prisma.autor.upsert({
      where: { nombre: autor.nombre },
      update: {},
      create: autor,
    });
  }

  for (const cat of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: cat.nombre },
      update: {},
      create: cat,
    });
  }

  for (const { autor, cats, ...datos } of libros) {
    const existe = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (!existe) {
      await prisma.libro.create({
        data: {
          ...datos,
          autor: { connect: { nombre: autor } },
          categorias: { connect: cats.map((nombre) => ({ nombre })) },
        },
      });
    }
  }

  console.log("¡Seed ejecutado con éxito!");
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });