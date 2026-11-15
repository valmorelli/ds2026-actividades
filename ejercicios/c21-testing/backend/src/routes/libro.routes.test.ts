import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, it, expect } from "vitest";
import app from "../app";

const JWT_SECRET = process.env.JWT_SECRET || "secreto-solo-para-tests";

describe("Libro Routes (Matriz de Permisos)", () => {
  const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
  const libroNuevo = { titulo: "Libro Test", precio: 5000, imagen: "img.jpg", autorId: 1 };

  it("con token de CLIENTE creando libro -> 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);
    
    expect(res.status).toBe(403);
  });
});