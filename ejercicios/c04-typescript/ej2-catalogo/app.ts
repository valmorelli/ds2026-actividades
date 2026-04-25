interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    disponible: boolean;
    precio: number;
    genero?: string;
}

const catalogo: Libro[] = [
    { isbn: "9781", titulo: "El Aleph", autor: "Borges", precio: 5000, disponible: true },
    { isbn: "9782", titulo: "Rayuela", autor: "Cortazar", precio: 4500, disponible: false },
    { isbn: "9783", titulo: "Ficciones", autor: "Borges", precio: 3800, disponible: true },
    { isbn: "9784", titulo: "Bestiario", autor: "Cortazar", precio: 4200, disponible: true },
    { isbn: "9785", titulo: "El Código Da Vinci", autor: "Dan Brown", precio: 5500, disponible: true },
    { isbn: "9786", titulo: "Ángeles y Demonios", autor: "Dan Brown", precio: 5200, disponible: true },
    { isbn: "9787", titulo: "Inferno", autor: "Dan Brown", precio: 5800, disponible: false },
    { isbn: "9789", titulo: "It", autor: "Stephen King", precio: 7000, disponible: true }
];

function buscarPorAutor(autor: string):Libro [] {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if(libros.length === 0) return 0;
    const total = libros.reduce((suma, libro) => suma + libro.precio, 0);
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listaUl = document.querySelector('#listado') as HTMLUListElement;
    const statsP = document.querySelector('#stats') as HTMLParagraphElement;
    
    listaUl.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${libro.titulo}</strong> - ${libro.autor} 
            (ISBN: ${libro.isbn}) | $${libro.precio} 
            [${libro.disponible ? 'EN STOCK' : 'AGOTADO'}]
        `;
        listaUl.appendChild(li);
    });
    const prom = precioPromedio(libros);
    statsP.innerText = `Cantidad: ${libros.length} | Precio Promedio: $${prom.toFixed(2)}`;

}

document.querySelector('#filtrar')?.addEventListener('click', () => {
    const input = document.querySelector('#filtroAutor') as HTMLInputElement;
    renderizar(buscarPorAutor(input.value));
});

document.querySelector('#mostrarDisponibles')?.addEventListener('click', () => {
    renderizar(librosDisponibles());
});

document.querySelector('#mostrarTodos')?.addEventListener('click', () => {
    renderizar(catalogo);
});


renderizar(catalogo);