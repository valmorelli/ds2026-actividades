const numeros = [8, 6, 2, 7, 3, 11, 52, 1, 65, 99];
let cont = 0;
let max = numeros[0];
let min = numeros[0];

for (const num of numeros) {
    cont += num;
    if (num > max) {
        max = num;
    }
    
    if (num < min) {
        min = num;
    }
}

const prom = cont / numeros.length;
console.log(`---pruebas 1---`);
console.log(`suma total: ${cont}`);
console.log(`promedio: ${prom}`);
console.log(`numero MAYOR: ${max}`);
console.log(`numero MENOR: ${min}`);

function generarAsteriscos(n) {
    let asteriscos = "";
    for (let i = 0; i < n; i++) {
        asteriscos += "*";
    }
    return asteriscos;
}

console.log(`---pruebas 2---`);
console.log(`5 asteriscos: ${generarAsteriscos(5)}`);
console.log(`2 asteriscos: ${generarAsteriscos(2)}`);