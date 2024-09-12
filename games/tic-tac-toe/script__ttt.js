let btnRef = document.querySelectorAll(".button__option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.querySelector(".button__new");
let restartBtn = document.querySelector(".button__restart");
let msgRef = document.getElementById("message");

//Winning Pattern Array:
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

//Player 'X' Plays First:
let xTurn = true;
let count = 0;

//Disable All Buttons:
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//Enable All Buttons (For New Game and Restart):
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};

//Player Wins:
const winFunction = (letter) => {
  disableButtons();

  msgRef.innerHTML = `${letter} Wins!`;

  const confettiConfig = {
    particleCount: 200,
    spread: 70
  };

  confetti({
    ...confettiConfig,
    angle: 60,
    origin: { x: 0 }
  });

  confetti({
    ...confettiConfig,
    angle: 120,
    origin: { x: 1 }
  });
};


//Function for Draw:
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "It's a Draw!";
};

//New Game:
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Win Logic:
const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

//Display X/O on Click:
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      element.innerText = "O";
      element.disabled = true;
    }
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for Win on Every Click:
    winChecker();
  });
});

window.onload = enableButtons;