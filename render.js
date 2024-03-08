"use strict";
const fieldSize = 4;
const rows = Array.from({ length: fieldSize }, () =>
  Array(fieldSize).fill(null)
);
renderRows();
function renderRows() {
  const rowsDiv = document.querySelector(".rows");
  rowsDiv.innerHTML = "";
  rows.forEach((row, i) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowsDiv.appendChild(rowDiv);
    row.forEach((cell, j) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.id = `cell${i}${j}`;
      cellDiv.clickHandler = () => handleCellClick(i, j);
      cellDiv.addEventListener("click", cellDiv.clickHandler);
      rowDiv.appendChild(cellDiv);
    });
    rowsDiv.style.setProperty("--fieldSize", fieldSize);
  });
}
let gameEnd = false;
let currentPlayer = "X";
let turnIndex = 0;
function handleCellClick(i, j) {
  if (rows[i][j] || gameEnd) {
    const cellDiv = document.getElementById(`cell${i}${j}`);
    cellDiv.style.cursor = "not-allowed";
    return;
  }
  currentPlayer = turnIndex % 2 === 0 ? "X" : "O";
  rows[i][j] = currentPlayer;
  turnIndex++;
  updateCellDisplay(i, j);
  if (checkWin(currentPlayer)) {
    gameEnd = true;
    const turnIndexDiv = document.getElementById("turnIndex");
    turnIndexDiv.textContent = `Игрок ${currentPlayer} выиграл на ходу ${turnIndex}`;
    createResetButton();
  } else if (turnIndex === fieldSize * fieldSize) {
    gameEnd = true;
    const turnIndexDiv = document.getElementById("turnIndex");
    turnIndexDiv.textContent = `Ничья на ходу ${turnIndex}`;
    createResetButton();
  } else {
    const nextPlayer = turnIndex % 2 === 0 ? "X" : "O";
    const turnIndexDiv = document.getElementById("turnIndex");
    turnIndexDiv.textContent = `Ход ${turnIndex}, ходит ${nextPlayer}`;
  }
}
function updateCellDisplay(i, j) {
  const cellDiv = document.getElementById(`cell${i}${j}`);
  if (cellDiv) {
    cellDiv.textContent = rows[i][j];
    cellDiv.style.userSelect = "none";
  }
}
