const hangmanPartsArr = ["ground", "head", "body", "arms", "legs", "scaffold"];
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "å",
  "ä",
  "ö",
];
const words = [
  "tvålen",
  "zebra",
  "omständigheter",
  "sommar",
  "flingor",
  "urmakare",
  "bajs",
];
let hangmanParts = [];
let round = 0;
let correctGuesses = [];
let secretWord;
let buttons = document.getElementsByClassName("letter-button");
class hangmanPart {
  constructor(element, display, index) {
    this.element = element;
    this.display = display;
    this.index = index;
  }
}
let wordSection = document.querySelector(".hangman-word");
let letterSection = document.querySelector(".hangman-letters");
function resetGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = [];
  round = 0;
  hangmanParts = [];
}
function failGame() {
  console.log("you failed. The secret word was " + secretWord);
  gameOver();
}
function winGame() {
  console.log("you won! The secret word was " + secretWord);
  gameOver();
}
function gameOver() {
  Array.from(buttons).forEach((element) => {
    element.disabled = true;
  });
}
function startGame() {
  resetGame();
  hangmanPartsArr.forEach((e, index) => {
    let part = document.getElementById(e);
    let a = new hangmanPart(part, false, index);
    hangmanParts.push(a);
  });
  console.log("Game started");
  letterSection.innerHTML = "";
  refreshLetters();
  wordSection.innerHTML = "";
  refreshSecretWord();
}
function refreshLetters() {
  letters.forEach((e) => {
    let p = document.createElement("button");
    p.setAttribute("class", "letter-" + e + ", letter-button");
    p.innerText = e;
    letterSection.appendChild(p);
  });
  Array.from(buttons).forEach((element) => {
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
    if (correctGuesses.includes(secretLetter)) {
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
  correctGuesses.push(element.innerText.toLowerCase());
  console.log("correct guess.");
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
  } else {
    console.log("The hangman is successfully refreshed");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".reset-button")
    .addEventListener("click", function () {
      console.log("restarting game");
      startGame();
    });
  console.log("Starting a new game");
  startGame();
});
