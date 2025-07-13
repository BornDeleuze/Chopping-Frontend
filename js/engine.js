import { Jax } from './jax.js';
import { Sasquatch } from './sasquatch.js';

let canvas, ctx;
let backgroundImage = new Image();
backgroundImage.src = 'images/map.png';
let sasquatchImage = new Image();
sasquatchImage.src = 'images/sasquatch.png';


let gScore = 0;
let gameOver = false;
let scoreIncrease = false;
let then = Date.now();

const jax = new Jax();
const sasquatch = new Sasquatch();

const keysDown = {};

// Setup keyboard events
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
  canvas.style.display = 'block';
  // document.body.appendChild(canvas);
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0);
  jax.draw(ctx);
  sasquatch.draw(ctx, sasquatchImage);

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + gScore, 32, 32);
}

function refresh(delta) {
  jax.move(keysDown, delta);
  sasquatch.update(gScore, delta);
  sasquatch.maybeTrigger(gScore);

  scoreIncrease = jax.x > 380 && jax.x < 450 && jax.y > 290 && jax.y < 330;

  // Danger logic:
  if (!jax.isInDoor() && sasquatch.isInDangerZone()) {
    gameOver = true;
  }
}


function drawGameOver() {
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!!!!! YOUR SCORE: " + gScore, canvas.width / 2, canvas.height / 2);
}

export function gameLoop(onGameOver) {
  let now = Date.now();
  let delta = (now - then) / 1000;
  refresh(delta);
  drawBoard();
  then = now;

  if (scoreIncrease) gScore += 1;
  if (gameOver) {
    drawGameOver();
    onGameOver(gScore);
  } else {
    requestAnimationFrame(() => gameLoop(onGameOver));
  }
}

export function resetGame() {
  jax.reset();
  sasquatch.reset();
  gScore = 0;
  gameOver = false;
  scoreIncrease = false;
}