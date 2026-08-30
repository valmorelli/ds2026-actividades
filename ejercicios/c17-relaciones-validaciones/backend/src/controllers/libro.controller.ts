import { Request, Response, NextFunction } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const disponibleQuery = req.query.disponible;
    let disponible: boolean | undefined = undefined;

    if (disponibleQuery === "true") {
      disponible = true;
    } else if (disponibleQuery === "false") {
      disponible = false;
    }

    const libros = await libroService.findAll(disponible);
    return res.json(libros);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const libro = await libroService.findById(id);

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    return res.json(libro);
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const nuevo = await libroService.create(req.body);
    return res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const actualizado = await libroService.update(id, req.body);
    return res.json(actualizado);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await libroService.remove(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}