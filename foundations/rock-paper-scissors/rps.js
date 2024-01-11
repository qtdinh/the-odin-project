let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    //use length of array to make a random choice
    const random = Math.floor(Math.random() * choices.length);
    return choices[random];
}

function playRound(playerSelection, computerSelection) {

    //case-insensitive
    playerSelection = playerSelection.toLowerCase();
    let matchConcluded = false;
    //match conditionals
    do {
        if (playerSelection === "rock" && computerSelection === "paper") {
            matchConcluded = true;
            computerScore++;
            return "You lose! Paper beats Rock";
        } else if (playerSelection === "rock" && computerSelection ==="scissors") {
            matchConcluded = true;
            playerScore++;
            return "You win! Rock beats Scissors";
        } else if (playerSelection === "paper" && computerSelection === "rock") {
            matchConcluded = true;
            playerScore++;
            return "You win! Paper beats Rock";
        } else if (playerSelection === "paper" && computerSelection === "scissors") {
            matchConcluded = true;
            computerScore++;
            return "You lose! Scissors beats Paper";
        } else if (playerSelection === "scissors" && computerSelection === "rock") {
            matchConcluded = true;
            computerScore++;
            return "You lose! Rock beats Scissors";
        } else if (playerSelection === "scissors" && computerSelection === "paper") {
            matchConcluded = true;
            playerScore++;
            return "You win! Scissors beats Paper";
        } else {
            console.log("It's a tie! Let's play again.");
            // Get new player input
            playerSelection = prompt("Enter your choice (rock, paper, or scissors): ").toLowerCase();
            // Generate new computer selection
            computerSelection = getComputerChoice();
        }
    } while (!matchConcluded)
}

function game() {
    const rounds = 5
    for (let i = 0; i < rounds; i++) {
        playerSelection = prompt("Enter your choice (rock, paper, or scissors): ").toLowerCase();
        const computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection))
    }
    if (playerScore > computerScore)
        console.log(`You won the whole game of Rock Paper Scissors with a score of ${playerScore} out of 5!`)
    else if (computerScore > playerScore)
        console.log(`You lost with a score of ${playerScore} out of 5!`)
}