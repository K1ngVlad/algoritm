console.log('Скрипт работает');

const heightBoard = 5;
const widthBoard = 5;

const board = [];
const lengthMatrix = [];
const relationshipMatrix = [];
const algoritmHistory = [];

let h = 3;

const boardElem = document.querySelector('.board');
const startBtn = document.querySelector('.start');
const matrixBtn = document.querySelector('.seeMatrix');
const popUp = document.querySelector('.popUp');
const matrix = document.querySelector('.matrix');
const closeBtn = document.querySelector('.closeBtn');
const changeBtn = document.querySelector('.changeBtn');
const inputRange = document.querySelector('.inputRange');
const numberOfCycles = document.querySelector('.numberOfCycles');
const historyPopUp = document.querySelector('.historyPopUp');
const historyBtn = document.querySelector('.historyBtn');
const historyField = document.querySelector('.history');
const clearBtn = document.querySelector('.clearHistory');
const defaultBtn = document.querySelector('.defaultBtn');

const ranNum = (num) => Math.ceil(Math.random() * num);

const createElem = (id, num, parrent, matrix) => {
  const elem = document.createElement('div');
  elem.setAttribute('id', id);
  elem.classList.add(matrix);
  elem.textContent = num;
  parrent.appendChild(elem);
};

const createElems = () => {
  board.forEach((row, y) => {
    row.forEach((num, x) => {
      createElem(`elem_${y * widthBoard + x}`, num, boardElem, 'elem');
    });
  });
};

const createMatrixElems = () => {
  relationshipMatrix.forEach((row, y) => {
    row.forEach((num, x) => {
      createElem(
        `matrixElem_${y * widthBoard * heightBoard + x}`,
        num,
        matrix,
        'matrixElem'
      );
    });
  });
};

const changeElems = () => {
  board.forEach((row, y) => {
    row.forEach((num, x) => {
      const elem = document.getElementById(`elem_${y * widthBoard + x}`);
      elem.textContent = num;
    });
  });
};

const changeHistory = () => {
  algoritmHistory.forEach((e) => {
    const elem = document.createElement('div');
    elem.classList.add('historyElem');
    elem.textContent = e;
    historyField.appendChild(elem);
  });
};

const changeMatrixElems = () => {
  relationshipMatrix.forEach((row, y) => {
    row.forEach((num, x) => {
      const elem = document.getElementById(
        `matrixElem_${y * widthBoard * heightBoard + x}`
      );
      elem.textContent = num;
    });
  });
};

const feelBoard = () => {
  for (let y = 0; y < heightBoard; y++) {
    const row = [];
    for (let x = 0; x < widthBoard; x++) {
      row[x] = x + 1 + y * widthBoard;
    }
    board[y] = row;
  }
};

const createLengthMatrix = () => {
  for (let y_i = 0; y_i < heightBoard; y_i++) {
    for (let x_i = 0; x_i < widthBoard; x_i++) {
      const row = [];
      for (let y_j = 0; y_j < heightBoard; y_j++) {
        for (let x_j = 0; x_j < widthBoard; x_j++) {
          row[x_j + y_j * widthBoard] =
            Math.abs(x_i - x_j) + Math.abs(y_i - y_j);
        }
      }
      lengthMatrix[x_i + y_i * widthBoard] = row;
    }
  }
};

const createRelationshipMatrix = () => {
  for (let y_i = 0; y_i < heightBoard; y_i++) {
    for (let x_i = 0; x_i < widthBoard; x_i++) {
      const row = [];
      for (let y_j = 0; y_j < heightBoard; y_j++) {
        for (let x_j = 0; x_j < widthBoard; x_j++) {
          row[x_j + y_j * widthBoard] =
            x_j + y_j * widthBoard === x_i + y_i * widthBoard ? 0 : ranNum(10);
        }
      }
      relationshipMatrix[x_i + y_i * widthBoard] = row;
    }
  }
};

feelBoard();
createLengthMatrix();
createRelationshipMatrix();

createElems();
createMatrixElems();

const getAlgoritm = () => {
  for (let v = 0; v < h; v++) {
    algoritmHistory.push('Начало цикла');
    for (let i = 0; i < widthBoard * heightBoard; i++) {
      let maxF = 0;
      let f = null;
      let g = null;
      for (let j = 0; j < widthBoard * heightBoard; j++) {
        if (i === j) continue;
        let F =
          relationshipMatrix.reduce((sum, p) => {
            return (
              sum +
              p[board[Math.floor(i / widthBoard)][i % widthBoard] - 1] -
              p[board[Math.floor(j / widthBoard)][j % widthBoard] - 1]
            );
          }, 0) *
          lengthMatrix.reduce((sum, h) => {
            return sum + h[i] - h[j];
          }, 0);
        if (F > maxF) {
          maxF = F;
          f = i;
          g = j;
        }
      }
      if (f !== null) {
        const rowF = Math.floor(f / widthBoard);
        const columnF = f % widthBoard;
        const rowG = Math.floor(g / widthBoard);
        const columnG = g % widthBoard;

        const a = board[rowF][columnF];
        const b = board[rowG][columnG];

        board[rowF][columnF] = b;
        board[rowG][columnG] = a;

        const aRow = Array.from(relationshipMatrix[f]);
        const bRow = Array.from(relationshipMatrix[g]);

        relationshipMatrix[f] = bRow;
        relationshipMatrix[g] = aRow;

        relationshipMatrix.forEach((row) => {
          const columnElemA = row[f];
          const columnElemB = row[g];

          row[f] = columnElemB;
          row[g] = columnElemA;
        });

        algoritmHistory.push(
          `Перестановка элементов i (${columnF + 1}, ${rowF + 1}) и j (${
            columnG + 1
          }, ${rowG + 1}) ΔF = ${maxF}`
        );
      }
    }
  }
};

const changeRange = (range) => {
  h = range;
  numberOfCycles.textContent = `Количество циклов: ${range}`;
};

startBtn.addEventListener('click', () => {
  getAlgoritm();
  changeElems();
  changeHistory();
  algoritmHistory.length = 0;
});

matrixBtn.addEventListener('click', () => {
  popUp.style.display = 'flex';
});

popUp.addEventListener('click', (e) => {
  const classList = e.target.classList;
  if (classList.contains('popUp') || classList.contains('closeBtn')) {
    popUp.style.display = 'none';
  }
});

changeBtn.addEventListener('click', () => {
  createRelationshipMatrix();
  changeMatrixElems();
});

inputRange.addEventListener('input', (e) => {
  changeRange(e.target.value);
});

historyBtn.addEventListener('click', () => {
  historyPopUp.style.display = 'flex';
});

historyPopUp.addEventListener('click', (e) => {
  const classList = e.target.classList;
  if (classList.contains('historyPopUp') || classList.contains('closeBtn')) {
    historyPopUp.style.display = 'none';
  }
});

clearBtn.addEventListener('click', () => {
  historyField.innerHTML = '';
});

defaultBtn.addEventListener('click', () => {
  feelBoard();
  createRelationshipMatrix();

  boardElem.innerHTML = '';
  createElems();
  changeMatrixElems();
});
