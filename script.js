const speedDisplay = document.querySelector("#speedDisplay");
const gameBorad = document.querySelector("#gameBoard");
const ctx = gameBorad.getContext("2d");

const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBorad.width;
const gameheight = gameBorad.height;
const boardBackground = "White";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]
let speed = 150;

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

ctx.font = "30px Permanent Marker";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Press Enter to start!", gameWidth/2, gameheight/2);
running = false;

window.addEventListener("keypress", (event) =>{
    if(event.key === "Enter"){
        resetGame();
    }
})

function gameStart(){
    running = true;
    scoreText.textContent = score;


    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
     if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, ((speed)));
     }else{
        displayGameOver();
     }
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameheight);
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    };
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameheight - unitSize);
   
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize,unitSize);
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                    y: snake[0].y + yVelocity};
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score ++;
        speed -= 5;
        scoreText.textContent = score;
        createFood();
        speedDisplay.height += 10;
    }else{
        snake.pop();
    }
};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.stokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};

function changeDirection(event){
    const keypressed = event.keyCode;
    const eventKey = event.key


    console.log(keypressed);
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    
    switch(true){
        case(keypressed == LEFT  && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keypressed == UP  && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keypressed == RIGHT  && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keypressed == DOWN  && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
    

};

function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y >= gameheight):
            running = false;
            break;
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = "40px Permanent Marker";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`GAME OVER!`, gameWidth/2, gameheight/2);
    ctx.fillText(`press Enter to restart`, gameWidth/2, (gameheight/1.5));
    
    running = false;
};

function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}];
    gameStart();
    speed = 150;
    speedDisplay.height = 25;
};