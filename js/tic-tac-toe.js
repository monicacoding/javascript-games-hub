// DOM Element references:
const btnRef = document.querySelectorAll(".button__option");
const popupRef = document.querySelector(".popup");
const newGameBtn = document.querySelector(".button__new");
const restartBtn = document.querySelector(".button__restart");
const msgRef = document.getElementById("message");

// Winning patterns:
const winningPatterns = [
  [0, 1, 2], [0, 3, 6], [2, 5, 8], [6, 7, 8],
  [3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6],
];

let isXTurn = true; // Player 'X' starts.
let moveCount = 0;  // Total number of moves.

// Disable all buttons and show the popup:
const disableButtons = () => {
  btnRef.forEach(button => button.disabled = true);
  popupRef.classList.remove("hide");
};

// Enable all buttons and reset the board for a new game or restart:
const resetBoard = () => {
  btnRef.forEach(button => {
    button.innerText = "";
    button.disabled = false;
  });
  popupRef.classList.add("hide");
  isXTurn = true;
  moveCount = 0;
};

// Show confetti animation for a win:
const triggerConfetti = () => {
  const confettiConfig = { particleCount: 200, spread: 70 };
  confetti({ ...confettiConfig, angle: 60, origin: { x: 0 } });
  confetti({ ...confettiConfig, angle: 120, origin: { x: 1 } });
};

// Display win message and handle the win event:
const handleWin = (player) => {
  disableButtons();
  msgRef.innerHTML = `${player} Wins!`;
  triggerConfetti();
};

// Handle a draw event:
const handleDraw = () => {
  disableButtons();
  msgRef.innerHTML = "It's a Draw!";
};

// Check if the current board state matches a winning pattern:
const checkForWin = () => {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const [val1, val2, val3] = [btnRef[a].innerText, btnRef[b].innerText, btnRef[c].innerText];

    if (val1 && val1 === val2 && val2 === val3) {
      handleWin(val1);
      return true;
    }
  }
  return false;
};

// Handle button click for a player's move:
const handleMove = (button) => {
  button.innerText = isXTurn ? "X" : "O";
  button.disabled = true;
  isXTurn = !isXTurn;
  moveCount++;

  // Check for a win or draw after each move:
  if (!checkForWin() && moveCount === 9) {
    handleDraw();
  }
};

// Add event listeners for each game button:
btnRef.forEach(button => {
  button.addEventListener("click", () => handleMove(button));
});

// Restart and New Game buttons perform the same action:
[newGameBtn, restartBtn].forEach(button => {
  button.addEventListener("click", resetBoard);
});

// Initialize the game board on window load:
window.onload = resetBoard;
