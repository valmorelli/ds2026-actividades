"use strict";
let catalogo = [
    { isbn: "9781", titulo: "El Aleph", autor: "Borges", precio: 5000, disponible: true },
    { isbn: "9782", titulo: "Rayuela", autor: "Cortazar", precio: 4500, disponible: false },
    { isbn: "9785", titulo: "El Código Da Vinci", autor: "Dan Brown", precio: 5500, disponible: true },
];
function agregarLibro(libro) {
    if (catalogo.some(l => l.isbn === libro.isbn)) {
        alert("Ya existe un libro con ese ISBN");
        return;
    }
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const nom = document.querySelector('#nombre').value;
    const aut = document.querySelector('#autor').value;
    const pre = parseFloat(document.querySelector('#precio').value);
    const dis = document.querySelector('#disponible').checked;
    const gen = document.querySelector('#genero').value;
    if (nom.trim() === "" || aut.trim() === "" || isNaN(pre) || pre <= 0) {
        return null;
    }
    return {
        isbn: "AUTO-" + Date.now(),
        titulo: nom,
        autor: aut,
        precio: pre,
        disponible: dis,
        genero: gen ? gen : undefined
    };
}
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const total = libros.reduce((suma, libro) => suma + libro.precio, 0);
    return total / libros.length;
}
function renderizar(libros) {
    const listaUl = document.querySelector('#listado');
    const statsP = document.querySelector('#stats');
    listaUl.innerHTML = "";
    libros.forEach(l => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${l.titulo}</strong> - ${l.autor} ${l.genero ? `[${l.genero}]` : ''}
            (ISBN: ${l.isbn}) | $${l.precio} 
            <button class="borrar" data-id="${l.isbn}">Eliminar</button>
        `;
        li.querySelector('.borrar')?.addEventListener('click', () => {
            eliminarLibro(l.isbn);
        });
        listaUl.appendChild(li);
    });
    const prom = precioPromedio(libros);
    statsP.innerText = `Cantidad: ${libros.length} | Precio Promedio: $${prom.toFixed(2)}`;
}
document.querySelector('#botonAgregar')?.addEventListener('click', () => {
    const errorDiv = document.querySelector('#error');
    const nuevo = validarFormulario();
    if (!nuevo) {
        errorDiv.innerHTML = "<strong>Error: Completar todos los campos correctamente.</strong>";
    }
    else {
        errorDiv.innerHTML = "";
        agregarLibro(nuevo);
        document.querySelector('#nombre').value = "";
        document.querySelector('#autor').value = "";
        document.querySelector('#precio').value = "";
        document.querySelector('#genero').value = "";
    }
});
document.querySelector('#filtrar')?.addEventListener('click', () => {
    const input = document.querySelector('#filtroAutor');
    renderizar(buscarPorAutor(input.value));
});
document.querySelector('#mostrarDisponibles')?.addEventListener('click', () => {
    renderizar(librosDisponibles());
});
document.querySelector('#mostrarTodos')?.addEventListener('click', () => {
    renderizar(catalogo);
});
renderizar(catalogo);
