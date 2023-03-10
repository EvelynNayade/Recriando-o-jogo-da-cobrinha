let canvas = document.getElementById("cobrinha");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let comida = {
    x: Math.floor(Math.random()*15 +1)*box,
    y: Math.floor(Math.random()*15 + 1)*box
}
snake[0]={
    x: 8*box,
    y: 8*box 
}
snake[1]={
    x: 7*box,
    y: 8*box 
}
snake[2]={
    x: 6*box,
    y: 8*box 
}

document.addEventListener('keydown',update);

function update(event){
    if(event.keyCode == 37 && direction!="right") direction = "left";
    if(event.keyCode == 38 && direction!="down") direction = "up";
    if(event.keyCode == 39 && direction!="left") direction = "right";
    if(event.keyCode == 40 && direction!="up") direction = "down";
}

function cirarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16*box,16*box);
}

function criarCobrinha(){   
    for(i=0; i <snake.length;i++){
        context.fillStyle = "green"
        context.fillRect(snake[i].x,snake[i].y,box,box);
    }
}

function desenharComida(){
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

function iniciarJogo(){

    if(snake[0].x > 15*box && direction=="right") snake[0].x = 0;
    if(snake[0].x < 0 && direction=="left") snake[0].x = 16*box;
    if(snake[0].y > 15*box && direction=="down") snake[0].y = 0;
    if(snake[0].y < 0 && direction=="up") snake[0].y = 16*box ;
    
    let pontos;

    for(i=1; i<snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            pontos = snake.length-3;
            alert("Game Over :(\n Sua pontuação: "+ pontos);
        }   
    }
    
    cirarBG();
    criarCobrinha();
    desenharComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction=="right") snakeX +=box;
    if(direction=="left") snakeX -=box;
    if(direction=="up") snakeY -=box;
    if(direction=="down") snakeY +=box;

    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random()*15 + 1)*box;
        comida.y = Math.floor(Math.random()*15 + 1)*box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

}

let jogo = setInterval(iniciarJogo, 100);