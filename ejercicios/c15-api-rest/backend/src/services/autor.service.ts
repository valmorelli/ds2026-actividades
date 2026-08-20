import { Autor } from '../types/autor.types';

const autores: Autor[] = [
  {
    id: 1,
    nombre: "Dan Brown",
    nacionalidad: "Estadounidense",
    biografia: "Autor de novelas de suspenso y misterio reconocidas internacionalmente."
  },
  {
    id: 2,
    nombre: "Jorge Luis Borges",
    nacionalidad: "Argentina",
    biografia: "Uno de los autores mas destacados de la literatura del siglo XX."
  },
  {
    id: 3,
    nombre: "Julio Cortazar",
    nacionalidad: "Argentina",
    biografia: "Maestro del relato corto, la prosa poetica y la narracion desestructurada."
  }
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find(a => a.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = {
    id: proximoId++,
    ...datos
  };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const index = autores.findIndex(a => a.id === id);
  if (index === -1) {
    return undefined;
  }
  autores[index] = {
    id,
    ...datos
  };
  return autores[index];
}

export function remove(id: number): boolean {
  const index = autores.findIndex(a => a.id === id);
  if (index === -1) {
    return false;
  }
  autores.splice(index, 1);
  return true;
}