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
    let p = document.createElement("label");
    p.setAttribute("class", "letter-" + e);
    p.innerText = e;
    console.log(p);
    letterSection.appendChild(p);
  });
}
function refreshHangman() {
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
});
