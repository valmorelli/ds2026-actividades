import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env";
import { RegistroInput, LoginInput } from "../validations/auth.validation";

export async function registrar(datos: RegistroInput) {
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS); //[cite: 1]

  return prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash: hash,
    },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
    }, //[cite: 1]
  });
}

export async function login(datos: LoginInput) {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false }, // Desactiva el omit global para poder comparar la clave[cite: 1]
  });

  if (!usuario) return null; //[cite: 1]

  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash); //[cite: 1]
  if (!coincide) return null; // Mismo retorno genérico para evitar user enumeration[cite: 1]

  const payload = { id: usuario.id, rol: usuario.rol }; //[cite: 1]
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); //[cite: 1]

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    }, //[cite: 1]
  };
}

export async function findById(id: number) {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
      creadoEn: true,
    },
  });
}