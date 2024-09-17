let [computerScore, userScore] = [0, 0];
const resultRef = document.getElementById("result");
const choices = ["rock", "paper", "scissors"];
const choicesObject = {
    rock: { rock: 'draw', scissors: 'win', paper: 'lose' },
    scissors: { rock: 'lose', scissors: 'draw', paper: 'win' },
    paper: { rock: 'win', scissors: 'lose', paper: 'draw' }
};

// Constants for styles.
const styles = {
    win: "background-color: #cefdce; color: #689f38",
    lose: "background-color: #ffdde0; color: #d32f2f",
    draw: "background-color: #e5e5e5; color: #808080"
};

// Function to handle confetti when user wins.
function triggerConfetti() {
    const confettiConfig = {
        particleCount: 200,
        spread: 70
    };
    confetti({ ...confettiConfig, angle: 60, origin: { x: 0 } });
    confetti({ ...confettiConfig, angle: 120, origin: { x: 1 } });
}

// Main function to check the outcome.
function checker(userChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Update choices for computer and user.
    document.getElementById("choice__computer").innerHTML = `COMPUTER CHOSE <span>${computerChoice.toUpperCase()}</span>`;
    document.getElementById("choice__user").innerHTML = `YOU CHOSE <span>${userChoice.toUpperCase()}</span>`;

    // Determine the result.
    const result = choicesObject[userChoice][computerChoice];

    // Update result display and scores.
    switch (result) {
        case 'win':
            resultRef.style.cssText = styles.win;
            resultRef.innerHTML = "YOU WIN";
            userScore++;
            triggerConfetti();
            break;
        case 'lose':
            resultRef.style.cssText = styles.lose;
            resultRef.innerHTML = "YOU LOSE";
            computerScore++;
            break;
        default:
            resultRef.style.cssText = styles.draw;
            resultRef.innerHTML = "DRAW";
            break;
    }

    // Update score display.
    document.getElementById("score__computer").innerHTML = computerScore;
    document.getElementById("score__user").innerHTML = userScore;
}
