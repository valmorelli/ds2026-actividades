interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        console.log('Obteniendo usuarios...');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.status}`);
        } 
        const usuarios: Usuario[] = await response.json();
        return usuarios;

    } catch (error) {
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
