const size = 20;

function createField(matrix) {
    let field = document.querySelector('.field');
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < size; j++) {
            let ceil = document.createElement('div');
            ceil.classList.add('ceil');
            ceil.setAttribute('x', i);
            ceil.setAttribute('y', j);
            ceil.addEventListener('click', function () {
                let x = ceil.getAttribute('x');
                let y = ceil.getAttribute('y');
                if (matrix[x][y] == 1) {
                    this.classList.add('bomb');
                    showAllField(matrix);
                } else {
                    matrix[x][y] = -1;
                    let ceilCount = fillInCeil(+x, +y, matrix, this);
                    this.textContent = ceilCount;
                    this.classList.add('emptyCeil');
                }
            });
            row.appendChild(ceil);
        }
        field.appendChild(row);
    }
}

function createMatrix() {
    let matrix = [];
    for (let i = 0; i < size; i++) {
        let matrixRow = [];
        for (let j = 0; j < size; j++) {
            matrixRow.push(0);
        }
        matrix.push(matrixRow)
    }
    return matrix;
}

function fillInMatrix(matrix) {
    for (let i = 0; i < size; i++) {
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 20);
        matrix[x][y] = 1;
    }
}

function fillInCeil(x, y, matrix) {
    let count = 0;
    let minI = x - 1 < 0 ? 0 : x - 1;
    let maxI = x + 2 > size ? size : x + 2;
    let minJ = y - 1 < 0 ? 0 : y - 1;
    let maxJ = y + 2 > size ? size : y + 2;
    for (i = minI; i < maxI; i++) {
        for (j = minJ; j < maxJ; j++) {
            if (matrix[i][j] == 1) {
                count++;
                foundBomb(i, j, matrix);
            }
        }
    }
    return count;
}

function foundBomb(x, y, matrix) {
    let emptyCeilCount = 0;
    let minI = x - 1 < 0 ? 0 : x - 1;
    let maxI = x + 2 > size ? size : x + 2;
    let minJ = y - 1 < 0 ? 0 : y - 1;
    let maxJ = y + 2 > size ? size : y + 2;

    for (let i = minI; i < maxI; i++) {
        for (let j = minJ; j < maxJ; j++) {
            if (matrix[i][j] == -1 || matrix[i][j] == undefined) {
                emptyCeilCount++;
            }
        }
    }
    if (emptyCeilCount >= 8) {
        document.querySelector(`[x='${x}'][y='${y}']`).classList.add('bomb');
    }
}

function showAllField(matrix) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[i][j] == 1) {
                document.querySelector(`[x='${i}'][y='${j}']`).classList.add('bomb');
            } else {
                let emptyCeil = document.querySelector(`[x='${i}'][y='${j}']`);
                let ceilCount = fillInCeil(i, j, matrix, emptyCeil);
                emptyCeil.textContent = ceilCount;
                emptyCeil.classList.add('emptyCeil');
            }
        }
    }
}

let matrix = createMatrix();
fillInMatrix(matrix);
createField(matrix);