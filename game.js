var canvas, ctx;
window.onload = function(){

    var ballX = 75
    var ballY = 75
    var ballSpeedX = 5;
    var ballSpeedY = 7;
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    var framesPerSecoud = 30;
    setInterval(updateAll,1000/framesPerSecoud);

    function updateAll(){
        moveAll();
        drawAll()
    }
    function drawAll(){
        colorRect(0,0,canvas.width,canvas.height,"#222");
        colorCircle(ballX,ballY,10,"red");
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
        if(ballY > canvas.height){
            ballSpeedY *= -1;
        }
        if(ballY < 0){
            ballSpeedY *= -1;
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
}