let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const restartBtn = document.querySelector("#restart-btn");
const darkModeToggle = document.querySelector("#dark-mode-toggle");

// Generate computer's choice
const genCompChoice = () => {
    const options = ["Rock", "Paper", "Scissor"];
    return options[Math.floor(Math.random() * options.length)];
};

// Handle draw case
const drawGame = () => {
    msg.innerText = "It's a Tie! Play Again.";
    msg.style.backgroundColor = "rgb(75, 44, 75)";
};

// Handle win/lose case
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

// Main game logic with countdown
const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    choices.forEach(choice => choice.style.pointerEvents = "none");
    
    let countdown = 3;
    msg.innerText = `Revealing result in ${countdown}...`;
    msg.style.backgroundColor = "#ffa500"; // Orange for suspense
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            msg.innerText = `Revealing result in ${countdown}...`;
        } else {
            clearInterval(countdownInterval);
            revealResult(userChoice, compChoice);
        }
    }, 1000);
};

// Function to reveal the result after countdown
const revealResult = (userChoice, compChoice) => {
    let userWin = true;
    if (userChoice === compChoice) {
        drawGame();
    } else {
        if (userChoice === "Rock") {
            userWin = compChoice === "Paper" ? false : true;
        } else if (userChoice === "Paper") {
            userWin = compChoice === "Scissor" ? false : true;
        } else {
            userWin = compChoice === "Rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
    choices.forEach(choice => choice.style.pointerEvents = "auto");
};

// Attach click event to choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Restart button resets game
restartBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Make your move!";
    msg.style.backgroundColor = "rgb(75, 44, 75)";
});

// Dark mode toggle with icon change
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    // Change icon dynamically
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.innerHTML = "☀️";
    } else {
        darkModeToggle.innerHTML = "🌙";
    }
});
