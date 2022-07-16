var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highScore = 0;

// Starts the game
$(document).keydown(function (e) { 
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Game sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    buttonFlash(randomChosenColour);
    playSound(randomChosenColour);

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (highScore < (currentLevel + 1)) {
            highScore = (currentLevel +1);
            setHighScore(highScore);
        }
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    level = 0;
    gamePattern = [];
    started = false;
}

// Button actions
$(".btn").click(function (e) { 
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function buttonFlash(button) {
    $("#" + button).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function setHighScore(highScore) {
    $("#score").text(highScore);
}