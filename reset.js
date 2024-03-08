"use strict";
function createResetButton() {
  const resetButton = document.createElement("button");
  resetButton.textContent = "Играть снова";
  resetButton.addEventListener("click", resetGame);
  const container = document.getElementById("container");
  container.appendChild(resetButton);
}
function resetGame() {
  rows.forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellDiv = document.getElementById(`cell${i}${j}`);
      if (cellDiv) {
        cellDiv.removeEventListener("click", cellDiv.clickHandler);
      }
      rows[i][j] = null;
    });
  });
  gameEnd = false;
  currentPlayer = "X";
  turnIndex = 0;
  renderRows();
  const turnIndexDiv = document.getElementById("turnIndex");
  turnIndexDiv.textContent = "";
  const resetButton = document.querySelector("button");
  if (resetButton) {
    resetButton.remove();
  }
}
