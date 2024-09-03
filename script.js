function generarArbol() {
    // Obtiene la expresión matemática ingresada por el usuario
    const expresion = document.getElementById("expresion").value.trim();
    // Obtiene el contenedor donde se mostrará el árbol
    const contenedorArbol = document.getElementById("arbol");
    // Limpia el contenido del contenedor
    contenedorArbol.innerHTML = "";

    // Expresión regular para validar números, operadores y paréntesis
    const expresionValida = /^[0-9 ()]+([-*+/]{1}[0-9 ()]+)*$/;

    // Comprobar si la expresión es válida usando la expresión regular
    if (!expresionValida.test(expresion)) {
        contenedorArbol.innerHTML = "<div class='error'>Expresión no válida. Verifique los datos ingresados.<br>Usa números, paréntesis y operadores (+, -, *, /).</div>";
        return; 
    }

    // Función recursiva para construir el árbol de expresiones
    function construirArbol(exp) {
        // Elimina paréntesis exteriores de la expresión
        exp = exp.trim();
        if (exp.startsWith("(") && exp.endsWith(")")) {
            exp = exp.slice(1, -1);
        }

        // Detecta el operador principal en la expresión
        let operador;
        let nivel = 0; // Nivel de los paréntesis
        let indexOperador = -1; // Índice del operador principal

        // Recorre la expresión para encontrar el operador principal
        for (let i = 0; i < exp.length; i++) {
            if (exp[i] === "(") nivel++; // Aumenta el nivel al encontrar un paréntesis izquierdo
            if (exp[i] === ")") nivel--; // Disminuye el nivel al encontrar un paréntesis derecho
            if (nivel === 0 && ["+", "-", "*", "/"].includes(exp[i])) {
                operador = exp[i];
                indexOperador = i;
                break; // Sale del bucle una vez encontrado el operador principal
            }
        }

        // Si se encontró un operador principal
        if (operador) {
            // Divide la expresión en dos partes, izquierda y derecha del operador
            const izquierda = exp.slice(0, indexOperador);
            const derecha = exp.slice(indexOperador + 1);
            // Devuelve el HTML para el nodo del operador y los nodos hijos
            return `
                <div class="nodo-operador">${operador}</div>
                <div class="contenedor-nodos">
                    <div class="nodo">${construirArbol(izquierda)}</div>
                    <div class="nodo">${construirArbol(derecha)}</div>
                </div>
            `;
        } else {
            // Si no hay operador, devuelve la expresión como un nodo hoja
            return `<div class="nodo-expresion">${exp.trim()}</div>`;
        }
    }

    // Genera el árbol a partir de la expresión proporcionada
    contenedorArbol.innerHTML = construirArbol(expresion);
}

function limpiarArbol() {
    // Limpia el campo de entrada de la expresión
    document.getElementById("expresion").value = "";
    // Limpia el contenedor del árbol
    document.getElementById("arbol").innerHTML = "";
}
