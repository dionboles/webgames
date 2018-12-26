var canvas, ctx;
var ballX = 75
var ballY = 75
var ballSpeedX = 5;
var ballSpeedY = 7;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;


function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX -rect.left - root.scrollLeft;
    // var mouseY = evt.clientX -rect.top - root.scrollTop;
    paddleX = mouseX - PADDLE_WIDTH/2;
}
window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    var framesPerSecoud = 30;
    setInterval(updateAll,1000/framesPerSecoud);
    canvas.addEventListener("mousemove",updateMousePos);
}
    function updateAll(){
        moveAll();
        drawAll()
    }
    function drawAll(){
        colorRect(0,0,canvas.width,canvas.height,"#222");
        colorCircle(ballX,ballY,10,"red");
        colorRect(paddleX,canvas.height - PADDLE_DIST_FROM_EDGE,PADDLE_WIDTH,PADDLE_THICKNESS,"#fff");
    }
    function ballReset(){
        ballX = canvas.width/2;
        ballY = canvas.height /2;
    }
    function moveAll(){
        ballX+= ballSpeedX;
        ballY+= ballSpeedY;
        // left
        if(ballX > canvas.width){
            ballSpeedX *= -1;
        }
        // right
        if(ballX < 0){
            ballSpeedX *= -1;
        }
        // top
        if(ballY < 0){ 
            ballSpeedY *= -1;
        }
        // bottom
        if(ballY > canvas.height){
            ballReset()
        }
        var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
        var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
        var paddleLeftEdgeX = paddleX
        var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

        if(ballY > paddleTopEdgeY && // below the top of paddle
           ballY < paddleBottomEdgeY && // above the bottm of paddle
           ballX > paddleLeftEdgeX && // right of the left side of paddle
           ballX < paddleRightEdgeX){ // left of the right side of paddle
            ballSpeedY *= -1
            var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
            var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
            ballSpeedX = ballDistFromPaddleCenterX * 0.34;
           }
    }
    function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,fillColor){
        ctx.fillStyle = fillColor;
        ctx.fillRect(topLeftX,topLeftY,boxWidth,boxHeight,fillColor);
    }
    function colorCircle(centerX,centerY,radius,fillColor){
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX,centerY,radius,0,Math.PI*2,true);
        ctx.fill();
    }
