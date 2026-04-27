import { Usuario, obtenerUsuarios } from '../ej1-usuarios/app.js';

async function renderizarUsuarios() {
    const lista = document.querySelector('#listaUsuarios') as HTMLUListElement;
    const carga = document.querySelector('#cargar') as HTMLElement;
    const errorD = document.querySelector('#errorVisual') as HTMLElement;

    carga.style.display = 'block';
    errorD.style.display = 'none';

    lista.innerHTML = '';
    try {
        const usuarios = await obtenerUsuarios();
        if (usuarios.length === 0) {
            errorD.innerText = "No se encontraron usuarios.";
            errorD.style.display = 'block';
        } else {
            usuarios.forEach(u => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${u.name}</strong> - ${u.email}`;
                lista.appendChild(li);
            });
        }

    } catch (error) {
        errorD.innerText = "Hubo un fallo al cargar los usuarios.";
        errorD.style.display = 'block';
    } finally {
        carga.style.display = 'none';
    }
}

renderizarUsuarios(); 