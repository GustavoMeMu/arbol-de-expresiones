function generarArbol() {
    const expresion = document.getElementById("expresion").value.trim();
    const contenedorArbol = document.getElementById("arbol");
    contenedorArbol.innerHTML = "";

    // Expresión regular para validar números y operadores
    const expresionValida = /^[0-9]+(\.[0-9]+)?([+\-*/][0-9]+(\.[0-9]+)?)$/;
    
    // Comprobar si la expresión es válida
    if (!expresionValida.test(expresion)) {
        contenedorArbol.innerHTML = "<div class='error'>Expresión no válida.  Verifique los datos ingresados <br> Usa números y operadores +, -, *, /, <br> así como numeros postivos y enteros.</div>";
        return;
    }

    // Detectar el operador
    let operador;
    if (expresion.includes("+")) operador = "+";
    else if (expresion.includes("-")) operador = "-";
    else if (expresion.includes("*")) operador = "*";
    else if (expresion.includes("/")) operador = "/";

    if (operador) {
        const [izquierda, derecha] = expresion.split(operador);

        contenedorArbol.innerHTML = `
            <div class="nodo-operador">${operador}</div>
            <div class="contenedor-nodos">

                <div class="nodo">
                    <div class="nodo-expresion">${izquierda.trim()}</div>
                </div>
                <div class="nodo">
                    <div class="nodo-expresion">${derecha.trim()}</div>
                </div>
            </div>
            
        `;
    } else {
        contenedorArbol.innerHTML = `<div class="nodo-operador">${expresion.trim()}</div>`;
    }
}
// // <div class="flechas-container">
// <svg class="flecha" viewBox="0 0 100 100">
// <defs>
//     <marker id="arrowhead" markerWidth="10" markerHeight="7" 
//         refX="0" refY="3.5" orient="auto">
//         <polygon points="0 0, 10 3.5, 0 7" />
//     </marker>
// </defs>
// <line x1="150" y1="1" x2="100" y2="50" stroke="black" stroke-width="2" marker-end="url(#arrowhead)" />
// </svg>
// <svg class="flecha" viewBox="0 0 100 100">
// <defs>
//     <marker id="arrowhead" markerWidth="10" markerHeight="7" 
//         refX="0" refY="3.5" orient="auto">
//         <polygon points="0 0, 10 3.5, 0 7" />
//     </marker>
// </defs>
// <line x1="-50" y1="0" x2="100" y2="50" stroke="black" stroke-width="2" marker-end="url(#arrowhead)" />
// </svg>
// </div>