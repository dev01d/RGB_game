var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// init on page load --> make sure all aspects of game are reset.

init();

// Logic

function init() {
  modeButtonListners();
  setUpSquares();
  reset();
}

function modeButtonListners() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  }
}

function setUpSquares() {
  // Handle square colors and W/L
  for (var i = 0; i < squares.length; i++) {
    //add click listener to squares
    squares[i].addEventListener("click", function() {
      // Grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      // Compare color to pcked color.
      if (clickedColor === pickedColor) {
        messageDisplay.innerHTML = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.innerHTML = "Try again!";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked Color
  colorDisplay.innerHTML = pickedColor;
  resetButton.innerHTML = "New Colors";
  messageDisplay.innerHTML = "";
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
  reset();
});

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make arr and add num random to arr
  var arr = [];
  // repeat num times
  for (var i = 0; i < num; i++) {
    // Get random num and push into arr
    arr.push(randomColor());
  }
  console.table(arr);
  return arr;
}

function randomColor() {
  // pick a red 0 - 255 and blue and green
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
