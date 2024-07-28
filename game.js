var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        $("#your-level").hide();
        $("#text-detail").hide();
        $(".playButton").hide();

        nextSequence();
        started = true;
    }
});

$(".playButton").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        $("#your-level").hide();
        $("#text-detail").hide();
        $(".playButton").hide();

        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


// ---FUNCTIONS--- //
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("👾 GAME OVER 👾");
        $("#your-level").show();
        $("#your-level").text("You died at Lev. " + level);
        $("#text-detail").show();
        $("#text-detail").text("(press any key or click play again to restart)");
        $(".playButton").show();
        $(".playButton").text("Play again");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}