import { words, qwertyRows, overlayText } from './languageData.js';

let currentLanguage = 'english';

let bannedKeys = [];
const hangmanParts = [];

const languageOptions = document.querySelectorAll('.language-option');
const title = document.querySelector(".title");

languageOptions.forEach(option => {
  option.addEventListener('click', function() {
      currentLanguage = this.getAttribute('data-lang');
      console.log("Selected language:", currentLanguage);
      languageChange();
      
  });
});

function resetGame() {
  // Reset game variables
  currentWord = "";
  wrongGuesses = 0;
  correctLetter = 0;
  bannedKeys = [];

  word.innerHTML = "";
  gameArea.innerHTML = "";

  hangmanParts.forEach(part => {
    part.style.display = "";
  });

  instructions.style.display = "none";
  startButton.style.display = "";
}

// Inside the languageChange function
function languageChange(){
    startButton.innerHTML = overlayText[currentLanguage].start;
  instructions.innerHTML = overlayText[currentLanguage].instructions;
  title.innerHTML = overlayText[currentLanguage].title;
  document.title = overlayText[currentLanguage].title;
  resetGame();
 
}

const ground = document.getElementById("ground");
const head = document.getElementById("head");
const body = document.getElementById("body");
const arms = document.getElementById("arms");
const legs = document.getElementById("legs");
const scaffold = document.getElementById("scaffold");

ground.setAttribute("fill", "white");
head.setAttribute("stroke", "white");
head.setAttribute("fill", "rgb(56, 54, 58)");
body.setAttribute("stroke", "white");
arms.setAttribute("stroke", "white");
legs.setAttribute("fill", "white");
scaffold.setAttribute("fill", "white");
const instructions = document.querySelector("h2");
instructions.style.display = "none";

const startButton = document.querySelector(".play-game");

hangmanParts.push(ground, head, scaffold, body, arms, legs);
console.log(hangmanParts);
let currentWord = "";
const gameArea = document.createElement("div");
const playArea = document.querySelector(".play-area");
const word = document.querySelector(".word");


let wrongGuesses = 0;
let correctLetter = 0;

startButton.addEventListener("click", startGame);

function startGame() {
  bannedKeys = [];
  document.addEventListener("keydown", (e) => handleKeyPress(e));
  startButton.style.display = "none";
  hangmanParts.forEach((part) => {
    part.style.display = "none";
  });
  instructions.style.display = "";

  word.innerHTML = "";
  gameArea.innerHTML = "";

  addWordToGame();
  addLettersToPlayArea();
}

function playGame(key) {
  let guessedCorrectly = false;
  Array.from(word.children).forEach((child) => {
    if (child.getAttribute("data-letter") === key) {
      child.style.color = "white";
      child.textContent = key; 
      guessedCorrectly = true;
      correctLetter++;
    }
  });

  if (!guessedCorrectly) {
    hangmanParts[wrongGuesses].style.display = "";
    wrongGuesses++;
  }

  let win = correctLetter === currentWord.length;
  let lose = wrongGuesses === hangmanParts.length;
  let isGameOver = win || lose;
  if (isGameOver) {
    gameOver(win);
  }
}

function gameOver(win) {
  document.removeEventListener("keydown", (e) => handleKeyPress(e));
  wrongGuesses = 0;
  correctLetter = 0;
  startButton.innerHTML = win
    ? overlayText[currentLanguage].win
    : overlayText[currentLanguage].lose;
  startButton.style.display = "";  

  Array.from(word.children).forEach(child => {
    child.textContent = child.getAttribute("data-letter");
    child.style.color = "lightgray";
  })

  const buttons = document.querySelectorAll(".game-area button");
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.cursor = "default";
  });
}

function addWordToGame() {
  currentWord = words[currentLanguage][Math.floor(Math.random() * words[currentLanguage].length)].toUpperCase();
  currentWord.split("").forEach((letter) => {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    letterDiv.setAttribute("data-letter", letter);
    letterDiv.style.color = "#666";
    word.appendChild(letterDiv);
  });
}

function addLettersToPlayArea() {
  gameArea.classList.add("game-area"); 
  qwertyRows[currentLanguage].forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    row.split("").forEach((letter) => {
      const letterButton = document.createElement("button");
      letterButton.id = letter;
      letterButton.textContent = letter;

      function onLetterClick() {
        playGame(letter);
        letterButton.removeEventListener("click", onLetterClick);
        letterButton.disabled = true;
        letterButton.style.color = "gray";
      }

      letterButton.addEventListener("click", onLetterClick);
      rowDiv.appendChild(letterButton);
    });
    gameArea.appendChild(rowDiv);
  });

  playArea.appendChild(gameArea);
}

function handleKeyPress(e) {  
  let key = e.key.toUpperCase();
  if (isLetterString(key) && !bannedKeys.includes(key)) {
    playGame(key);
    bannedKeys.push(key);
    document.getElementById(`${key}`).style.color = "gray";
    document.getElementById(`${key}`).disabled = true;
  }
}

function isLetterString(str) {
    return str.match(/^[a-zA-Z]+$/);
}