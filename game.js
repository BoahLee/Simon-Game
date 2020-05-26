const buttonColors = ["red", "blue", "green", "blue"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let gameStarted = false;

function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // check if user have the same pattern length as game pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playAudio("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  playAudio(randomChosenColor);
  animatePress(randomChosenColor);
  gamePattern.push(randomChosenColor);
}

function playAudio(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
  $(`#${currentColor}`).fadeOut(10).fadeIn(10); // flash animation
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playAudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
