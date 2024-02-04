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
let gameOver = true;
let correctGuesses = [];
let secretWord = "banan";

class hangmanPart {
  constructor(element, display, index) {
    this.element = element;
    this.display = display;
    this.index = index;
  }
}

function endGame() {
  hangmanPartsArr.forEach((e) => {
    let part = document.getElementById(e);
    part.setAttribute("opacity", 1);
    console.log("display hangman part: " + e);
  });
}
function startGame() {
  hangmanPartsArr.forEach((e, index) => {
    let part = document.getElementById(e);
    let a = new hangmanPart(part, false, index);
    hangmanParts.push(a);
  });
}
function refreshLetters() {
  let letterSection = document.querySelector(".hangman-letters");
  letters.forEach((e) => {
    let p = document.createElement("button");
    p.setAttribute("class", "letter-" + e + ", letter-button");
    p.innerText = e;
    letterSection.appendChild(p);
  });
  let buttons = document.getElementsByClassName("letter-button");
  console.log(buttons);
  Array.from(buttons).forEach((element) => {
    element.addEventListener("click", function () {
      checkLetter(element);
    });
  });
}
function refreshSecretWord() {
  let wordSection = document.querySelector(".hangman-word");
  wordSection.innerHTML = "";
  for (let index = 0; index < secretWord.length; index++) {
    let secretLetter = secretWord.charAt(index);
    console.log(correctGuesses);
    console.log(secretLetter);
    if (correctGuesses.includes(secretLetter)) {
      wordSection.append(secretWord.charAt(index));
    } else {
      wordSection.append("_");
    }
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
  Array.from(hangmanParts)[round].display = true;
  console.log(hangmanParts[round]);
  round++;
  console.log(round);
  refreshHangman();
  refreshSecretWord();
}
function correctLetter(element) {
  element.classList.add("correct-letter");
  correctGuesses.push(element.innerText.toLowerCase());
  console.log(correctGuesses);
  refreshHangman();
  refreshSecretWord();
}
function refreshHangman() {
  console.log("refresh hangman");
  hangmanParts.forEach((e) => {
    if (e.display) {
      e.element.setAttribute("opacity", 1);
    } else {
      e.element.setAttribute("opacity", 0);
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  startGame();
  refreshHangman();
  refreshLetters();
  refreshSecretWord();
});
