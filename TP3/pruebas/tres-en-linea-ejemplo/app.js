const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 80;
const cols = 7;
const rows = 6;
const board = Array.from({ length: cols }, () => Array(rows).fill(0));
let currentPlayer = 1;
let currentCol = Math.floor(cols / 2);
let isDropping = false;
let isWin = false;

function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawBoard() {
  checkWin();
  if (isWin) {
    return;
  }
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const color = board[col][row] === 1 ? "red" : board[col][row] === 2 ? "yellow" : "white";
      ctx.fillStyle = color;
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      ctx.strokeStyle = "black";
      ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
  drawCircle((currentCol + 0.5) * cellSize, cellSize * 0.5, cellSize * 0.4, currentPlayer === 1 ? "red" : "yellow");
  console.log(board);
}

function dropPiece(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (board[col][row] === 0) {
      board[col][row] = currentPlayer;
      currentPlayer = 3 - currentPlayer;
      isDropping = false;
      drawBoard();
      return;
    }
  }
}

function handleKeyEvents(event) {

  if (!isDropping) {
    if (event.key === "ArrowLeft" && currentCol > 0) {
      currentCol--;
    } else if (event.key === "ArrowRight" && currentCol < cols - 1) {
      currentCol++;
    } else if (event.key === " ") {
      isDropping = true;
      dropPiece(currentCol);
    }
    drawBoard();
  }
}

function handleMouseClick(event) {
  if (!isDropping) {
    const col = Math.floor(event.offsetX / cellSize);
    if (col >= 0 && col < cols) {
      dropPiece(col);
      isDropping = true;
    }
  }
}

function checkWin() {
  console.log(board);
  // Check Horizontal Wins
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - 4; col++) {
      if (
        board[col][row] === currentPlayer &&
        board[col + 1][row] === currentPlayer &&
        board[col + 2][row] === currentPlayer &&
        board[col + 3][row] === currentPlayer
      ) {
        // Player wins horizontally
        console.log("Gano: ", currentPlayer);
        isWin = true;
        return true;
      }
    }
  }

  // Check Vertical Wins
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row <= rows - 4; row++) {
      if (
        board[col][row] === currentPlayer &&
        board[col][row + 1] === currentPlayer &&
        board[col][row + 2] === currentPlayer &&
        board[col][row + 3] === currentPlayer
      ) {
        // Player wins vertically
        console.log("Gano: ", currentPlayer);
        isWin = true;
        return true;
      }
    }
  }

  // Check Diagonal Wins
  for (let col = 0; col <= cols - 4; col++) {
    for (let row = 0; row <= rows - 4; row++) {
      if (
        board[col][row] === currentPlayer &&
        board[col + 1][row + 1] === currentPlayer &&
        board[col + 2][row + 2] === currentPlayer &&
        board[col + 3][row + 3] === currentPlayer
      ) {
        // Player wins diagonally (from top-left to bottom-right)
        console.log("Gano: ", currentPlayer);
        isWin = true;
        return true;
      }

      if (
        board[col + 3][row] === currentPlayer &&
        board[col + 2][row + 1] === currentPlayer &&
        board[col + 1][row + 2] === currentPlayer &&
        board[col][row + 3] === currentPlayer
      ) {
        // Player wins diagonally (from top-right to bottom-left)
        console.log("Gano: ", currentPlayer);
        isWin = true;
        return true;
      }
    }
  }
  console.log("No gano: ");
  return false; // No winner yet
}

canvas.addEventListener("mousedown", handleMouseClick);
window.addEventListener("keydown", handleKeyEvents);

drawBoard();