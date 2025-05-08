const filas = 11;
const columnas = 11;
const tabla = document.getElementById("miTabla");

let xHeaders = ["-0.5", "-0.4", "-0.3", "-0.2", "-0.1", "0", "0.1", "0.2", "0.3", "0.4", "0.5"];
let yHeaders = ["0.5", "0.4", "0.3", "0.2", "0.1", "0", "-0.1", "-0.2", "-0.3", "-0.4", "-0.5"];

// Generar valores automáticamente usando f(x, y) = x² / (x² + y²)
let valores = [];

for (let i = 0; i < yHeaders.length; i++) {
  let fila = [];
  let y = parseFloat(yHeaders[i]);
  for (let j = 0; j < xHeaders.length; j++) {
    let x = parseFloat(xHeaders[j]);
    let denominador = x * x + y * y;

    // Evitar división entre cero

    let raw = x * x / denominador;
    let valor = denominador === 0 ? "" : parseFloat(raw.toFixed(3)).toString();

    fila.push(valor);
  }
  valores.push(fila);
}

//let valores = Array(filas).fill(0).map(() =>
  Array(columnas).fill("0.0")
//);

// Ejemplos de valores asignados manualmente
//valores[0][0] = "1.5";
//valores[5][7] = "9.81";

function crearTabla() {
  tabla.innerHTML = "";

  for (let i = 0; i <= filas; i++) {
    let fila = tabla.insertRow();
    for (let j = 0; j <= columnas; j++) {
      let celda = fila.insertCell();

      if (i === 0 && j === 0) {
        celda.textContent = "y|x";
        celda.classList.add("static");
      } else if (i === 0) {
        celda.classList.add("static");
        celda.textContent = xHeaders[j - 1];
      } 
      else if (j === 0) {
        celda.classList.add("static");
        celda.textContent = yHeaders[i - 1];
      }
       
      else {
        const valor = valores[i - 1][j - 1];
        celda.dataset.valor = valor;
        celda.dataset.i = i - 1;
        celda.dataset.j = j - 1;
        celda.textContent = valor;
        celda.classList.add("interactiva");
        if (valor === "0" || valor === "1" || valor === "") {
          celda.classList.add("especial");
        }
      if (valor=="0.5"){
          celda.classList.add("especialdosh")
      }

        celda.onclick = () => {
          let xi = xHeaders[j - 1];
          let yi = yHeaders[i - 1];

          if (celda.textContent.startsWith("(")) {
            celda.textContent = celda.dataset.valor;
            celda.classList.remove("flip");
          } else {
            celda.textContent = `(${xi},${yi})`;
            celda.classList.add("flip");
          }
        };
      }
    }
  }
}

crearTabla();

