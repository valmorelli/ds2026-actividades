import { Request, Response, NextFunction } from "express";
import * as autorService from "../services/autor.service";

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const autores = await autorService.findAll();
    return res.json(autores);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const autor = await autorService.findById(id);

    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    return res.json(autor);
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const nuevo = await autorService.create(req.body);
    return res.status(201).json(nuevo);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const actualizado = await autorService.update(id, req.body);
    return res.json(actualizado);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await autorService.remove(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}