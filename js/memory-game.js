// DOM Elements
const moves = document.getElementById("counter");
const timeValue = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".container__game");
const result = document.getElementById("result");
const controls = document.querySelector(".container__controls");

// Game state:
let cards;
let interval;
let firstCard = null;
let secondCard = null;
let seconds = 0;
let minutes = 0;
let movesCount = 0;
let winCount = 0;

// Game items:
const items = [
  { name: "bee", image: "../assets/img/memory-game/bee.png" },
  { name: "crocodile", image: "../assets/img/memory-game/crocodile.png" },
  { name: "macaw", image: "../assets/img/memory-game/macaw.png" },
  { name: "gorilla", image: "../assets/img/memory-game/gorilla.png" },
  { name: "tiger", image: "../assets/img/memory-game/tiger.png" },
  { name: "monkey", image: "../assets/img/memory-game/monkey.png" },
  { name: "chameleon", image: "../assets/img/memory-game/chameleon.png" },
  { name: "piranha", image: "../assets/img/memory-game/piranha.png" },
  { name: "anaconda", image: "../assets/img/memory-game/anaconda.png" },
  { name: "sloth", image: "../assets/img/memory-game/sloth.png" },
  { name: "cockatoo", image: "../assets/img/memory-game/cockatoo.png" },
  { name: "toucan", image: "../assets/img/memory-game/toucan.png" },
];

// Timer function:
const updateTimer = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  const secondsValue = seconds.toString().padStart(2, '0');
  const minutesValue = minutes.toString().padStart(2, '0');
  timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};

// Move counter:
const incrementMoves = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves: </span>${movesCount}`;
};

// Generate random card values:
const generateRandomCards = (size = 4) => {
  const tempArray = [...items];
  const cardValues = [];
  const pairCount = (size * size) / 2;
  
  for (let i = 0; i < pairCount; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  
  return cardValues;
};

// Generate game matrix:
const generateGameMatrix = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  const shuffledCards = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
  
  shuffledCards.forEach((card) => {
    const cardElement = `
      <div class="container__card" data-card-value="${card.name}">
        <div class="card__before">?</div>
        <div class="card__after">
          <img src="${card.image}" class="image" alt="${card.name}"/>
        </div>
      </div>
    `;
    gameContainer.innerHTML += cardElement;
  });
  
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  
  // Add click event listeners to cards:
  cards = document.querySelectorAll(".container__card");
  cards.forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
  });
};

// Handle card click:
const handleCardClick = (card) => {
  if (!card.classList.contains("matched")) {
    card.classList.add("flipped");
    
    if (!firstCard) {
      firstCard = card;
    } else {
      incrementMoves();
      secondCard = card;
      checkForMatch();
    }
  }
};

// Function to trigger confetti:
const triggerConfetti = () => {
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

// Check for card match:
const checkForMatch = () => {
  const firstCardValue = firstCard.getAttribute("data-card-value");
  const secondCardValue = secondCard.getAttribute("data-card-value");
  
  if (firstCardValue === secondCardValue) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard = null;
    winCount += 1;
    
    if (winCount === cards.length / 2) {
      result.innerHTML = "<h2>YOU WON</h2>";
      triggerConfetti();
      stopGame();
    }
  } else {
    const tempFirst = firstCard;
    const tempSecond = secondCard;
    firstCard = null;
    secondCard = null;
    
    setTimeout(() => {
      tempFirst.classList.remove("flipped");
      tempSecond.classList.remove("flipped");
    }, 900);
  }
};

// Start game:
const startGame = () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(updateTimer, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializeGame();
};

// Stop game:
const stopGame = () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
};

// Initialize game:
const initializeGame = () => {
  result.innerText = "";
  winCount = 0;
  const cardValues = generateRandomCards();
  generateGameMatrix(cardValues);
};

// Event listeners:
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

// Initialize the game when the script loads:
initializeGame();