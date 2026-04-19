const calcularPrecioFinal = (monto, medioPago) => {
      if (monto < 200) {
            return monto;
      } else if (monto >= 200 && monto <= 400) {
            
            if (medioPago === "E") {
                  return monto - (monto * 0.3);
            } else if (medioPago === "D") {
                  return monto - (monto *0.2);
            } else if (medioPago === "C") {
                  return monto - (monto * 0.1);
            }

      } else if (monto > 400) {
            return monto - (monto * 0.4);
      }
}

console.log("---Pruebas---");

console.log(`monto: $150 | pago: E | FINAL: $${calcularPrecioFinal(150, "E")}`);
console.log(`monto: $300 | pago: E | FINAL: $${calcularPrecioFinal(300, "E")}`);
console.log(`monto: $400 | pago: D | FINAL: $${calcularPrecioFinal(400, "D")}`);
console.log(`monto: $200 | pago: C | FINAL: $${calcularPrecioFinal(200, "C")}`);
console.log(`monto: $500 | pago: C | FINAL: $${calcularPrecioFinal(500, "C")}`);