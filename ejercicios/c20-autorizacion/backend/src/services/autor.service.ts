import { prisma } from "../config/prisma";
import { Autor } from "../types/autor.types";
import { AutorCreateInput, AutorUpdateInput } from "../validations/autor.validation";

export async function findAll(): Promise<Autor[]> {
  return prisma.autor.findMany();
}

export async function findById(id: number): Promise<Autor | null> {
  return prisma.autor.findUnique({ where: { id } });
}

export async function create(datos: AutorCreateInput): Promise<Autor> {
  return prisma.autor.create({ data: datos });
}

export async function update(id: number, datos: AutorUpdateInput): Promise<Autor> {
  return prisma.autor.update({
    where: { id },
    data: datos
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.autor.delete({ where: { id } });
}