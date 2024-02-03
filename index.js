let hangmanPartsArr = ["ground", "head", "body", "arms", "legs", "scaffold"];
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
});
