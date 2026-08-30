import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import { LibroCreateInput, LibroUpdateInput } from "../validations/libro.validation";

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true };
}>;

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  if (disponible === undefined) {
    return prisma.libro.findMany({ include: { autor: true } });
  }
  return prisma.libro.findMany({
    where: { disponible },
    include: { autor: true }
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true }
  });
}

export async function create(datos: LibroCreateInput): Promise<LibroConAutor> {
  return prisma.libro.create({
    data: datos,
    include: { autor: true }
  });
}

export async function update(id: number, datos: LibroUpdateInput): Promise<LibroConAutor> {
  return prisma.libro.update({
    where: { id },
    data: datos,
    include: { autor: true }
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.libro.delete({
    where: { id }
  });
}