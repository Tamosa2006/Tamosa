const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const tieScoreEl = document.getElementById("tie-score");
const userChoiceImgEl = document.getElementById("user-choice-img");
const computerChoiceImgEl = document.getElementById("computer-choice-img");
const resultEl = document.getElementById("result");
const exitButton = document.getElementById("exit-btn");

let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
let tieScore = parseInt(localStorage.getItem("tieScore")) || 0;

// Update scoreboard with stored values
userScoreEl.textContent = userScore;
computerScoreEl.textContent = computerScore;
tieScoreEl.textContent = tieScore;

// Function to get a random computer choice
function getComputerChoice() {
    const options = ["rock", "paper", "scissor"];
    return options[Math.floor(Math.random() * options.length)];
}

// Function to determine the winner and update scores
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        tieScore++;
        localStorage.setItem("tieScore", tieScore);
        return "It's a tie!";
    } else if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
    ) {
        userScore++;
        localStorage.setItem("userScore", userScore);
        return `You win! Your ${userChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        localStorage.setItem("computerScore", computerScore);
        return `You lost! ${computerChoice} beats your ${userChoice}`;
    }
}

// Function to play the game continuously
function playGame(userChoiceElement) {
    const userChoice = userChoiceElement.id;
    const computerChoice = getComputerChoice();

    // Update images based on choices
    userChoiceImgEl.src = `./pictures/${userChoice}.png`;
    computerChoiceImgEl.src = `./pictures/${computerChoice}.png`;

    // Apply shake effect
    userChoiceElement.classList.add("shake");

    setTimeout(() => {
        userChoiceElement.classList.remove("shake");

        // Determine winner & update scores
        const resultText = determineWinner(userChoice, computerChoice);
        resultEl.textContent = `Result: ${resultText}`;

        // Apply color based on outcome
        resultEl.style.color = resultText.includes("You win") ? "green" :
                              resultText.includes("You lost") ? "red" : "white";

        // Update scoreboard continuously
        userScoreEl.textContent = userScore;
        computerScoreEl.textContent = computerScore;
        tieScoreEl.textContent = tieScore;

    }, 500);
}

// Attach event listeners to choices for infinite gameplay
choices.forEach(choice => {
    choice.addEventListener("click", () => playGame(choice));
});

// Exit button functionality (Ensure final score saves)
document.addEventListener("DOMContentLoaded", () => {
    exitButton.addEventListener("click", () => {
        let finalResult;

        // Retrieve current scores properly
      //  userScore = parseInt(localStorage.getItem("userScore")) ;
       // computerScore = parseInt(localStorage.getItem("computerScore"));

      
        // Store final result before redirecting
        localStorage.setItem("userScore", userScore);
         localStorage.setItem("computerScore", computerScore);

        // Redirect to result.html
        window.location.href = "result.html";
    });
});
