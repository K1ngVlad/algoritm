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

// inputRange.addEventListener('input', (e) => {
//   changeRange(e.target.value);
// });

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
