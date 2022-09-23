var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatter = [];
var started = false;
var level = 0;

$(document).on("keypress", function () {
  if (started == false) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPatter.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPatter.length - 1);
});

function nextSequence() {
  userClickedPatter = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPatter[currentLevel]) {
    console.log("success");
    if (userClickedPatter.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
   
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
