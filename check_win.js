"use strict";
const winLength = 3;
function checkWin(player) {
  let winGame = false;
  rows.forEach((row, i) => {
    row.slice(0, fieldSize - winLength + 1).forEach((cell, j) => {
      if (row.slice(j, j + winLength).every((cell) => cell === player)) {
        winGame = true;
      }
    });
  });
  if (!winGame) {
    rows[0].forEach((cell, j) => {
      rows.slice(0, fieldSize - winLength + 1).forEach((row, i) => {
        if (rows.slice(i, i + winLength).every((row) => row[j] === player)) {
          winGame = true;
        }
      });
    });
  }
  if (!winGame) {
    rows.slice(0, fieldSize - winLength + 1).forEach((row, i) => {
      row.slice(0, fieldSize - winLength + 1).forEach((cell, j) => {
        let mainDiagonal = [],
          sideDiagonal = [];
        Array.from({ length: winLength }).forEach((_, k) => {
          mainDiagonal.push(rows[i + k][j + k]);
          sideDiagonal.push(rows[i + k][j + winLength - k - 1]);
        });
        if (
          mainDiagonal.every((cell) => cell === player) ||
          sideDiagonal.every((cell) => cell === player)
        ) {
          winGame = true;
        }
      });
    });
  }
  return winGame;
}
