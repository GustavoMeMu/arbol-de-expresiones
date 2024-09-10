// Función para analizar una expresión matemática y construir su estructura
function analizarExpresion(expresion) {
    let operadores = ['+', '-', '*', '/'];  // Operadores permitidos
    let pila = [];  // Pila para manejar paréntesis
    let indiceUltimoOperador = -1;  // Índice del último operador fuera de paréntesis
    let ultimoOperador = '';  // Último operador encontrado
    
    // Buscar el operador de más bajo nivel fuera de los paréntesis
    for (let i = 0; i < expresion.length; i++) {
        let caracter = expresion[i];
        if (caracter === '(') {
            pila.push(i);  // Añadir el índice de apertura de paréntesis a la pila
        } else if (caracter === ')') {
            pila.pop();  // Quitar el índice de cierre de paréntesis
        } else if (operadores.includes(caracter) && pila.length === 0) {
            indiceUltimoOperador = i;  // Guardar el índice del operador
            ultimoOperador = caracter;  // Guardar el operador
        }
    }

    // Si no se encuentra un operador fuera de paréntesis, analizar el contenido dentro de ellos
    if (indiceUltimoOperador === -1 && expresion[0] === '(' && expresion[expresion.length - 1] === ')') {
        return analizarExpresion(expresion.slice(1, -1).trim());  // Recursividad para eliminar paréntesis exteriores
    }

    // Procesar los operadores internos
    if (indiceUltimoOperador !== -1) {
        let izquierda = expresion.slice(0, indiceUltimoOperador).trim();  // Parte izquierda de la expresión
        let derecha = expresion.slice(indiceUltimoOperador + 1).trim();  // Parte derecha de la expresión
        
        return {
            operador: ultimoOperador,  // El operador encontrado
            izquierda: analizarExpresion(izquierda),  // Recursividad para la parte izquierda
            derecha: analizarExpresion(derecha)  // Recursividad para la parte derecha
        };
    } else {
        return expresion.trim();  // Si no hay más operadores, retornar la expresión como está
    }
}

// Función para crear un nodo visual en el árbol
function crearNodo(valor) {
    let nodo = document.createElement('div');  // Crear un elemento div
    nodo.className = 'nodo';  // Asignar la clase 'nodo'
    nodo.textContent = valor;  // Asignar el valor al nodo
    return nodo;
}

// Función para construir el árbol visualmente
function construirArbol(nodo, contenedor) {
    if (typeof nodo === 'string') {  // Si el nodo es una hoja (número)
        let nodoHoja = crearNodo(nodo);  // Crear el nodo de la hoja
        contenedor.appendChild(nodoHoja);  // Añadirlo al contenedor
        return;
    }

    // Crear el nodo raíz (operador)
    let nodoRaiz = crearNodo(nodo.operador);  
    contenedor.appendChild(nodoRaiz);  // Añadir el nodo raíz al contenedor

    // Crear la línea que conecta los nodos
    let linea = document.createElement('div');
    linea.className = 'linea';
    contenedor.appendChild(linea);

    // Contenedor para los nodos hijos
    let contenedorIzqDer = document.createElement('div');
    contenedorIzqDer.style.display = 'flex';
    contenedorIzqDer.style.justifyContent = 'space-between';

    let contenedorIzquierda = document.createElement('div');
    let contenedorDerecha = document.createElement('div');

    contenedorIzquierda.className = 'contenedor-hijo';
    contenedorDerecha.className = 'contenedor-hijo';

    contenedorIzqDer.appendChild(contenedorIzquierda);
    contenedorIzqDer.appendChild(contenedorDerecha);

    contenedor.appendChild(contenedorIzqDer);

    // Construir recursivamente los subárboles izquierdo y derecho
    construirArbol(nodo.izquierda, contenedorIzquierda);
    construirArbol(nodo.derecha, contenedorDerecha);
}

// Evento al hacer clic en el botón para generar el árbol
document.getElementById('boton-generar').addEventListener('click', () => {
    let expresion = document.getElementById('entrada-expresion').value;  // Obtener la expresión del campo de texto
    let expresionAnalizada = analizarExpresion(expresion);  // Analizar la expresión
    let contenedorArbol = document.getElementById('contenedor-arbol');  
    contenedorArbol.innerHTML = '';  // Limpiar el árbol anterior
    construirArbol(expresionAnalizada, contenedorArbol);  // Construir el nuevo árbol
});
