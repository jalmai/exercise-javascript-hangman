let hangmanParts = ["ground", "head", "body", "arms", "legs", "scaffold"];

function endGame() {
  hangmanParts.forEach((e) => {
    let part = document.getElementById(e);
    part.setAttribute("opacity", 1);
    console.log("display hangman part: " + e);
  });
}
function startGame() {
  hangmanParts.forEach((e) => {
    let part = document.getElementById(e);
    part.setAttribute("opacity", 0);
    console.log("hiding bodypart: " + e);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  startGame();
});
