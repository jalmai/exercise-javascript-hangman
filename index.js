const hangmanPartsArr = ["ground", "head", "body", "arms", "legs", "scaffold"];
let hangmanParts = [];
let correctLetters = [];
let round = 0;
let secretWord;
let letterButtons = document.getElementsByClassName("letter-button");

let wordSection = document.querySelector(".hangman-word");
let letterSection = document.querySelector(".hangman-letters");
let resetButton = document.querySelector(".reset-button");

class hangmanPart {
  constructor(element, display, index) {
    this.element = element;
    this.display = display;
    this.index = index;
  }
}

function resetGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  console.log("The new secret word is " + secretWord.toUpperCase());
  correctLetters = [];
  round = 0;
  hangmanParts = [];
  resetButton.classList.remove("failed");
}
function failGame() {
  console.log("You failed. The secret word was " + secretWord.toUpperCase());
  gameOver();
}
function winGame() {
  console.log("you won! The secret word was " + secretWord.toUpperCase());
  gameOver();
}
function gameOver() {
  resetButton.classList.add("failed");
  Array.from(letterButtons).forEach((element) => {
    element.disabled = true;
  });
}
function startGame() {
  console.log("----- STARTING GAME ------");
  resetGame();
  hangmanPartsArr.forEach((e, index) => {
    let part = document.getElementById(e);
    let a = new hangmanPart(part, false, index);
    hangmanParts.push(a);
  });
  letterSection.innerHTML = "";
  refreshLetters();
  wordSection.innerHTML = "";
  refreshSecretWord();
  console.log("Game started");
}
function refreshLetters() {
  letters.forEach((letter) => {
    let p = document.createElement("button");
    p.setAttribute("class", "letter-" + letter + ", letter-button");
    p.innerText = letter;
    letterSection.appendChild(p);
  });
  Array.from(letterButtons).forEach((element) => {
    element.addEventListener("click", function () {
      checkLetter(element);
    });
  });
}
function refreshSecretWord() {
  wordSection.innerHTML = "";
  let wincount = 0;
  for (let index = 0; index < secretWord.length; index++) {
    let secretLetter = secretWord.charAt(index);
    if (correctLetters.includes(secretLetter)) {
      wordSection.append(secretWord.charAt(index));
      wincount++;
    } else {
      wordSection.append("_");
    }
  }
  if (wincount === secretWord.length) {
    winGame();
  } else {
    refreshHangman();
  }
}
function checkLetter(element) {
  let letter = element.innerText.toLowerCase();
  if (secretWord.includes(letter)) {
    correctLetter(element);
  } else {
    wrongLetter(element);
  }
}
function wrongLetter(element) {
  element.classList.add("wrong-letter");
  element.disabled = true;
  Array.from(hangmanParts)[round].display = true;
  round++;

  console.log("Wrong guess.");
  refreshSecretWord();
}
function correctLetter(element) {
  element.classList.add("correct-letter");
  element.disabled = true;
  let corrLetter = element.innerText.toLowerCase();
  correctLetters.push(corrLetter);
  console.log("Correct guess!");
  refreshSecretWord();
}
function refreshHangman() {
  let failcount = 0;

  hangmanParts.forEach((e) => {
    if (e.display) {
      e.element.setAttribute("opacity", 1);
      failcount++;
    } else {
      e.element.setAttribute("opacity", 0);
    }
  });
  if (failcount === hangmanParts.length) {
    failGame();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  resetButton.addEventListener("click", function () {
    console.log("--- restart button pushed ---");
    startGame();
  });
  startGame();
});
