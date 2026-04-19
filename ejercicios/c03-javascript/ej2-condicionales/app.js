function clasificarNota (nota){
      if (nota < 4) {
            return "desaprobado";
      } else if (nota >= 8) {
            return "promocionado";
      } else if (nota >= 4 && nota <= 7) {
            return "aprobado";
      }
}

function diaDeLaSemana(numero) {
      switch (numero) {
            case 1: return "Lunes"; break;
            case 2: return "Martes"; break;
            case 3: return "Miercoles"; break;
            case 4: return "Jueves"; break;
            case 5: return "Viernes"; break;
            case 6: return "Sabado (fin de semana)"; break;
            case 7: return "Domingo (fin de semana)"; break;
            default: return "Dia inválido";
      }
}

console.log (`-- pruebas en consola --`);

console.log(`nota 2: ${clasificarNota(2)}`);
console.log(`nota 5: ${clasificarNota(5)}`);
console.log(`nota 8: ${clasificarNota(8)}`);

console.log(`dia 1: ${diaDeLaSemana(1)}`);
console.log(`dia 6: ${diaDeLaSemana(6)}`);
console.log(`dia 10: ${diaDeLaSemana(10)}`);
