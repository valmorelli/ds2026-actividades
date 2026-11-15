import { describe, it, expect } from "vitest";
import { libroCreateSchema } from "./libro.validation";

describe("libroCreateSchema", () => {
  const libroValido = { titulo: "Rayuela", precio: 7000, imagen: "img.jpg", autorId: 1 };

  it("rechaza precio negativo", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, precio: -5 });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toEqual(["precio"]);
  });

  it("recorta espacios del titulo", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, titulo: "   Rayuela   " });
    if (r.success) expect(r.data.titulo).toBe("Rayuela");
  });
});