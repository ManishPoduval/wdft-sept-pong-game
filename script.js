const canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#262522'
const ctx = canvas.getContext('2d')

let ballX = 100;
let ballY = 100;
let ballRadius = 20
let intervalId = 0;
let ballXIncrement = 1
let ballYIncrement = 1
let score = 0;
let paddleX = 100
let paddleY = canvas.height - 30
let paddleWidth = 50
let paddleHeight = 30
let paddleIncrement = 5
let isRightArrow = false;
let isLeftArrow = false;

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39 || event.key == 'ArrowRight' ) {
        isRightArrow = true;
        isLeftArrow = false;
    }
    else if (event.keyCode == 37 || event.key == 'ArrowLeft' ) {
        isRightArrow = false;
        isLeftArrow = true;
    }
})

document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
})


function drawBall(){
    ctx.beginPath()
    ctx.fillStyle = '#ed9507'
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}

function ballCollision() {
    //right
    if (ballX > canvas.width - ballRadius) {
        ballXIncrement = -1
    }

    //bottom
    if ( ballY > canvas.height - ballRadius){
        if ( ballX > paddleX && (ballX < paddleX + paddleWidth) ) {
            ballYIncrement = -1
            score++
        }
        else {
            clearInterval(intervalId)
            alert('GAME OVER')
        }
    }

    //left
    if (ballX - ballRadius< 0) {
        ballXIncrement = 1
    }

    //top
    if (ballY < 0 + ballRadius) {
        ballYIncrement = 1
    }
}

function drawPaddle(){
    ctx.beginPath()
    ctx.fillStyle = '#17c7eb'
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight)
    ctx.closePath()
}

function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '26px Verdana'
    ctx.fillText('Score: ' + score, 10, 30)
    drawBall()
    drawPaddle()
    ballCollision()
    ballX += ballXIncrement
    ballY += ballYIncrement
    if (isRightArrow && (paddleX + paddleWidth < canvas.width) ) {
        paddleX += paddleIncrement
    }
    else if ( isLeftArrow && (paddleX > 0) ) {
        paddleX -= paddleIncrement
    }
}

intervalId = setInterval(() => {
    requestAnimationFrame(startGame)
}, 5)
