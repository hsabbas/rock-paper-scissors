function startGame() {
    const divs = document.querySelectorAll("div");
    divs.forEach((div) => {
        div.style.visibility = "visible";
    })
    document.getElementById("results-display").style.visibility = "hidden";

    document.getElementById("player-score").innerHTML = 0;
    document.getElementById("computer-score").innerHTML = 0;
}

function startRound(playerSelection) {
    let computerSelection = computerPlay();
    let result = playRound(playerSelection, computerSelection);
    updateScore(result);
}

function computerPlay(){
    let choice = Math.random() * 3;
    if(choice < 1) {
        return 'rock';
    } else if (choice < 2) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function playRound(playerSelection, computerSelection){
    displayImages(playerSelection, computerSelection);

    if(playerSelection == 'rock') {
        return playerChoosesRock(computerSelection);
    } else if (playerSelection == 'paper'){
        return playerChoosesPaper(computerSelection);
    } else {
        return playerChoosesScissors(computerSelection);
    }
}

function displayImages(playerSelection, computerSelection){
    document.getElementById("player-pic").src = `Images/${playerSelection}.png`;
    document.getElementById("computer-pic").src = `Images/${computerSelection}.png`;
}

function updateScore(result) {
    if (result == 'draw'){
        return;
    }

    const playerScore = document.getElementById("player-score");
    const computerScore = document.getElementById("computer-score");

    let playerScoreNum = parseInt(playerScore.innerHTML);
    let computerScoreNum = parseInt(computerScore.innerHTML);

    if(result == 'win') {
        playerScoreNum++;
    } else {
        computerScoreNum++;
    }

    if(playerScoreNum > computerScoreNum) {
        playerScore.className = "winner";
        computerScore.className = "loser";
    } else if (computerScoreNum > playerScoreNum) {
        playerScore.className = "loser";
        computerScore.className = "winner";
    } else {
        playerScore.className = "draw";
        computerScore.className = "draw";
    }

    playerScore.innerHTML = playerScoreNum;
    computerScore.innerHTML = computerScoreNum;

    if(playerScoreNum == 5 || computerScoreNum == 5){
        endGame(result);
    }
}

function endGame(result){
    document.getElementById("buttons").style.visibility = "hidden";
    
    const resultsDisplay = document.getElementById("results-display");
    resultsDisplay.style.visibility = "visible";

    if(result == "win"){
        resultsDisplay.className = "winner";
        resultsDisplay.innerHTML = "You Win!";
    } else {
        resultsDisplay.className = "loser";
        resultsDisplay.innerHTML = "Computer Wins!";
    }

    document.getElementById("play-btn").style.visibility = "visible";
}

function playerChoosesRock(computerSelection) {
    switch(computerSelection){
        case 'paper':
            return 'lose';
            break;
        case 'scissors':
            return 'win';
            break;
        default:
            return "draw";
            break;
    }
}

function playerChoosesPaper(computerSelection) {
    switch(computerSelection){
        case 'rock':
            return 'win';
            break;
        case 'scissors':
            return 'lose';
            break;
        default:
            return "draw";
            break;
    }
}

function playerChoosesScissors(computerSelection) {
    switch(computerSelection){
        case 'rock':
            return 'lose';
            break;
        case 'paper':
            return 'win';
            break;
        default:
            return "draw";
            break;
    }
}

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

rockButton.addEventListener('click', function() {startRound("rock")});
paperButton.addEventListener('click', function() {startRound("paper")});
scissorsButton.addEventListener('click', function () {startRound("scissors")});

const playButton = document.querySelector("#play-btn");
playButton.addEventListener('click', () => {
    playButton.style.visibility = "hidden";
    startGame();
})