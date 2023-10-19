const tossButton = document.getElementById("tossButton");
const tossChoice = document.getElementById("tossChoice");
const userInput = document.getElementById("userInput");
const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");
const tossResult = document.getElementById("tossResult");
const resultMessage = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const oversDisplay = document.getElementById("overs");
const ballsFacedDisplay = document.getElementById("ballsFaced");
const runsScoredDisplay = document.getElementById("runsScored");
const milestoneMessage = document.getElementById("milestoneMessage");

let userScore = 0;
let isOut = false;
let ballsFaced = 0;
let oversRemaining = 10; // Default 10 overs

tossButton.addEventListener("click", tossCoin);
playButton.addEventListener("click", playCricket);
resetButton.addEventListener("click", resetGame);

function tossCoin() {
  const userTossChoice = tossChoice.value;
  const computerTossChoice = Math.random() < 0.5 ? "Heads" : "Tails";

  tossResult.innerText = `User: ${userTossChoice}, Computer: ${computerTossChoice}`;
  if (userTossChoice === computerTossChoice) {
    tossResult.innerText += "\nYou won the toss!";
    userInput.disabled = false;
    playButton.style.display = "inline-block";
    tossButton.disabled = true;
  } else {
    tossResult.innerText += "\nComputer won the toss!";
    userInput.disabled = true;
    playButton.style.display = "none";
    tossButton.disabled = true;
    resetButton.style.display = "inline-block";
  }
}

function playCricket() {
  if (!isOut) {
    const userChoice = parseInt(userInput.value);
    const computerChoice = Math.floor(Math.random() * 6) + 1;
    const result = `User: ${userChoice}, Computer: ${computerChoice}`;

    if (userChoice === computerChoice) {
      resultMessage.innerText = `Out! ${result}`;
      isOut = true;
      userInput.disabled = true;
      playButton.style.display = "none";
      resetButton.style.display = "inline-block";
    } else {
      resultMessage.innerText = `Not out. ${result}`;
      userScore += userChoice;
      ballsFaced++;
      if (ballsFaced % 6 === 0) {
        oversRemaining--;
      }
      if (userScore >= 50) {
        milestoneMessage.style.display = "block";
        milestoneMessage.innerText = "Congrats! Half century!";
      }
      updateDisplay();
    }
  }
}

function resetGame() {
  userInput.disabled = true;
  playButton.style.display = "none";
  resetButton.style.display = "none";
  tossButton.disabled = false;
  userScore = 0;
  isOut = false;
  ballsFaced = 0;
  oversRemaining = 10;
  milestoneMessage.style.display = "none";
  updateDisplay();
  tossResult.innerText = "";
  resultMessage.innerText = "";
}

function updateDisplay() {
  scoreDisplay.innerText = `Score: ${userScore}`;
  oversDisplay.innerText = `Overs: ${oversRemaining}`;
  ballsFacedDisplay.innerText = `Balls Faced: ${ballsFaced}`;
  runsScoredDisplay.innerText = `Runs Scored: ${userScore}`;
}