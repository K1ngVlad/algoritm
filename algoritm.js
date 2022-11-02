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
