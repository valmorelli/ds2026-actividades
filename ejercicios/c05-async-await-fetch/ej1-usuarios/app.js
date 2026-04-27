"use strict";
async function obtenerUsuarios() {
    try {
        console.log('Obteniendo usuarios...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}
async function mostrarUsuarios() {
    const lista = await obtenerUsuarios();
    lista.forEach(u => {
        console.log(`Nombre: ${u.name}, Email: ${u.email}`);
    });
}
mostrarUsuarios();
