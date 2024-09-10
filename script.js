// Función para analizar la expresión y dividirla en un árbol binario
function parseExpression(expression) {
    let operators = ['+', '-', '*', '/'];
    let stack = [];
    let lastOpIndex = -1;
    let lastOp = '';

    // Encontrar el operador de más bajo nivel fuera de los paréntesis
    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if (char === '(') {
            stack.push(i);
        } else if (char === ')') {
            stack.pop();
        } else if (operators.includes(char) && stack.length === 0) {
            lastOpIndex = i;
            lastOp = char;
        }
    }

    // Si no se encuentra operador fuera de paréntesis, tratar el contenido dentro de los paréntesis
    if (lastOpIndex === -1 && expression[0] === '(' && expression[expression.length - 1] === ')') {
        return parseExpression(expression.slice(1, -1).trim());
    }

    // Procesar los operadores internos
    if (lastOpIndex !== -1) {
        let left = expression.slice(0, lastOpIndex).trim();
        let right = expression.slice(lastOpIndex + 1).trim();

        return {
            operator: lastOp,
            left: parseExpression(left),
            right: parseExpression(right)
        };
    } else {
        return expression.trim();
    }
}

// Función para crear un nodo HTML
function createNode(value) {
    let node = document.createElement('div');
    node.className = 'nodo';
    node.textContent = value;
    return node;
}

// Función para construir el árbol visualmente en el contenedor
function buildTree(node, container) {
    if (typeof node === 'string') {
        let leafNode = createNode(node);
        container.appendChild(leafNode);
        return;
    }

    let rootNode = createNode(node.operator);
    container.appendChild(rootNode);

    let line = document.createElement('div');
    line.className = 'linea';
    container.appendChild(line);

    let leftRightContainer = document.createElement('div');
    leftRightContainer.style.display = 'flex';
    leftRightContainer.style.justifyContent = 'space-between';

    let leftContainer = document.createElement('div');
    let rightContainer = document.createElement('div');

    leftContainer.className = 'child-container';
    rightContainer.className = 'child-container';

    leftRightContainer.appendChild(leftContainer);
    leftRightContainer.appendChild(rightContainer);

    container.appendChild(leftRightContainer);

    buildTree(node.left, leftContainer);
    buildTree(node.right, rightContainer);
}

// Evento para generar el árbol cuando se presiona el botón
document.getElementById('generate-btn').addEventListener('click', () => {
    let expression = document.getElementById('expresion').value.trim();
    const treeContainer = document.getElementById('tree-container');
    const contenedorResultado = document.getElementById('resultado');
    treeContainer.innerHTML = ''; // Limpiar el árbol anterior
    contenedorResultado.innerHTML = ''; // Limpiar el resultado anterior

    // Validar la expresión ingresada
    const expresionValida = /^\s*[\d+\-*/().\s]+\s*$/;
    if (!expresionValida.test(expression)) {
        treeContainer.innerHTML = "<div class='error'>Expresión no válida. Verifique los datos ingresados.<br>Usa números, paréntesis y operadores (+, -, *, /).</div>";
        return;
    }

    let parsedExpression = parseExpression(expression);
    buildTree(parsedExpression, treeContainer);

    // Evaluar la expresión usando eval() y mostrar el resultado
    try {
        const resultado = eval(expression);
        contenedorResultado.innerHTML = `<div class='resultado'>Resultado: ${resultado}</div>`;
    } catch (error) {
        contenedorResultado.innerHTML = "<div class='error'>Error al evaluar la expresión.</div>";
    }
});

// Función para limpiar el árbol y la entrada
function limpiarArbol() {
    document.getElementById("expresion").value = "";
    document.getElementById("tree-container").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}
