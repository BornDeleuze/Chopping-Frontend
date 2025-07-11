import { jax, drawJax, isJaxInDoor } from './hero.js';
import { sasquatch, sasquatchActive, sasquatchOut, updateSasquatch, triggerSasquatch } from './sasquatch.js';

let canvas, ctx;
let jaxImage = new Image();
jaxImage.src = 'images/Jax.png';

let backgroundImage = new Image();
backgroundImage.src = 'images/map.png';

let sasquatchImage = new Image();
sasquatchImage.src = 'images/sasquatch.png';

let gScore = 0;
let gameOver = false;
let scoreIncrease = false;
let then = Date.now();

const keysDown = {};

window.addEventListener("keydown", (e) => {
  keysDown[e.keyCode] = true;
});

window.addEventListener("keyup", (e) => {
  delete keysDown[e.keyCode];
});

export function setupCanvas() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0);
  drawJax(ctx, jaxImage);

  if (sasquatchActive) {
    ctx.drawImage(sasquatchImage, sasquatch.x, sasquatch.y);
  }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score " + gScore, 32, 32);
}

export function refresh(delta) {
  if (38 in keysDown) jax.y -= jax.speed * delta;
  if (40 in keysDown) jax.y += jax.speed * delta;
  if (37 in keysDown) jax.x -= jax.speed * delta;
  if (39 in keysDown) jax.x += jax.speed * delta;

  updateSasquatch(gScore, delta);

  scoreIncrease = jax.x > 380 && jax.x < 450 && jax.y > 290 && jax.y < 330;

  if (!isJaxInDoor(jax) && sasquatchOut) {
    gameOver = true;
  }
}

function drawGameOver() {
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("GAME OVER!!!!! YOUR SCORE: " + gScore, 300, 300);
}

export function gameLoop(onGameOver) {
  console.log("hi im in setup canvas")
  let now = Date.now();
  let delta = (now - then) / 1000;

  refresh(delta);
  drawBoard();
  then = now;

  if (scoreIncrease) gScore += 1;
  triggerSasquatch(gScore);

  if (gameOver) {
    drawGameOver();
    onGameOver(gScore);
  } else {
    requestAnimationFrame(() => gameLoop(onGameOver));
  }
}

export function resetGame() {
  jax.x = 550;
  jax.y = 200;
  gScore = 0;
  gameOver = false;
  scoreIncrease = false;
  sasquatch.x = -300;
  sasquatch.y = 0;
}
