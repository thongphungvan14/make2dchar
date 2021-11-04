let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

canvas.width = 570;
canvas.height = 570;


document.body.appendChild(canvas);

let backgroundReady = false;

let backgroundImg = new Image();

backgroundImg.src = "NaUX7.png";

backgroundImg.onload = function() {
    backgroundReady = true;
}

let heroReady = false;
let heroImg = new Image();

heroImg.src = "Green-Cap-Character-16x18.png";

heroImg.onload = function() {
    heroReady = true;
}

let hero = {
    speed: 3,
    x: 0,
    y: 0
}



function loadImage() {
    if(backgroundReady) {
        context.drawImage(backgroundImg, 0, 0);
    }

}

let keysDown = {};

addEventListener(
    "keydown",
    function(e) {
        keysDown[e.keyCode] = true;
    },
    false
);

addEventListener(
    "keyup",
    function(e) {
        delete keysDown[e.keyCode];
    },
    false
);

let DOWN = 0;
let UP = 1;
let LEFT = 2;
let RIGHT = 3;


let walkCycle = [0, 1, 0, 2];
let walkIndex = 0;

let width = 16;
let height = 18;
let SCALE = 2;
let SCALED_WIDTH = SCALE * width;
let SCALED_HEIGHT = SCALE * height;
let frameCount = 0;
let FRAME_LIMIT = 12;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    context.drawImage(heroImg, frameX * width, frameY * height, width, height,
        canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}


function moveHero() {
    let hasMoved = false;

    if(38 in keysDown) {
        moveChar(0, -1, UP);
        hasMoved = true;
    }

    if(40 in keysDown) {
        moveChar(0, 1, DOWN);
        hasMoved = true;

    }

    if(37 in keysDown) {
        moveChar(-1, 0, LEFT);
        hasMoved = true;

    }

    if(39 in keysDown) {
        moveChar(1, 0, RIGHT);
        hasMoved = true;

    }

    if(!hasMoved) {
        walkIndex = 0;
    }

    if (hasMoved) {
        frameCount++;
        if (frameCount >= FRAME_LIMIT) {
            frameCount = 0;
            walkIndex ++;
            if(walkIndex >= walkCycle.length) {
            walkIndex = 0;
            }
        }
        drawFrame(walkCycle[walkIndex], currentDirection, hero.x, hero.y);
    }

}

function moveChar(deltaX, deltaY, direction) {
    if (hero.x + deltaX > 0 && hero.x + SCALED_WIDTH + deltaX < canvas.width) {
        hero.x += deltaX * hero.speed;
    }

    if (hero.y + deltaY > 0 && hero.y + SCALED_HEIGHT + deltaY <canvas.height) {
        hero.y += deltaY * hero.speed;
    }
    currentDirection = direction;
}

function gameLoop() {
    
    loadImage();
    moveHero();
    requestAnimationFrame(gameLoop);
}

gameLoop();