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

// const createRelationshipMatrix = () => {
//   for (let y_i = 0; y_i < heightBoard; y_i++) {
//     for (let x_i = 0; x_i < widthBoard; x_i++) {
//       const row = [];
//       for (let y_j = 0; y_j < heightBoard; y_j++) {
//         for (let x_j = 0; x_j < widthBoard; x_j++) {
//           row[x_j + y_j * widthBoard] =
//             x_j + y_j * widthBoard === x_i + y_i * widthBoard ? 0 : ranNum(10);
//         }
//       }
//       relationshipMatrix[x_i + y_i * widthBoard] = row;
//     }
//   }
// };

const funcNumGo = () => {
  sum = 0;
  for (i = 0; i < widthBoard * heightBoard; i++) {
    for (j = 0; j < widthBoard * heightBoard; j++) {
      sum += relationshipMatrix[i][j] * lengthMatrix[i][j];
    }
  }
  funcNum.textContent = `F = ${sum}`;
};

const createRelationshipMatrix = () => {
  for (let i = 0; i < heightBoard * widthBoard; i++) {
    if (relationshipMatrix[i] === undefined) relationshipMatrix[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === i) {
        relationshipMatrix[i][j] = 0;
        continue;
      }
      const num = ranNum(10);
      // console.log(`${i} ${j}`);
      relationshipMatrix[i][j] = num;
      if (relationshipMatrix[j] === undefined) relationshipMatrix[i] = [];
      relationshipMatrix[j][i] = num;
    }
  }
  console.log(relationshipMatrix);
};

const changeRange = (range) => {
  h = range;
  numberOfCycles.textContent = `Количество циклов: ${range}`;
};
