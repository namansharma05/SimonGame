var buttonColor = ["green","red","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

var count = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".squares").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    check(userClickedPattern.length-1);
});

function check(number){
    // for(var i=0;i<gamePattern.length;i++){
    //     if(gamePattern[i] == userClickedPattern[i]){
    //         setTimeout(function(){
    //             nextSequence();
    //         },1000);
    //     } else {
    //         $("h1").text("Game Over, Press Any Key to Restart");
    //         playSound("wrong");
    //         backgroundAnimation();
    //         startOver();
    //         break;
    //     }
    // }
    if(gamePattern[number] == userClickedPattern[number]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        backgroundAnimation();
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    count++;
    $("h1").text("Level "+count);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChooseColor = buttonColor[randomNumber];
    gamePattern.push(randomChooseColor);

    $("."+randomChooseColor).fadeOut("fast").fadeIn("fast");
    playSound(randomChooseColor);
}

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },200);
}
function backgroundAnimation(){
    $("body").addClass("gameover");
    setTimeout(function(){
        $("body").removeClass("gameover");
    },100);
}
function startOver(){
    count = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}