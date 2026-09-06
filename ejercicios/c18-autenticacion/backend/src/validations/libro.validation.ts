import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El titulo es obligatorio").max(200),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  imagen: z.string().min(1, "La imagen es obligatoria"),
  disponible: z.boolean().optional(),
  autorId: z.number().int().positive("El autor es obligatorio")
});

export const libroUpdateSchema = libroCreateSchema.partial();

export type LibroCreateInput = z.infer<typeof libroCreateSchema>;
export type LibroUpdateInput = z.infer<typeof libroUpdateSchema>;