/*
Xcreate canvas
Xcreate navbar
create high scores list
fetch high scores
display high scores
"sign-in" with fetches for user.name
render other graphics (hero, monster?)
assign buttons for movement and starting (and action?)
make game logic
save score with post fetch
update highscore list
start another game loop?
*/


// For easy debugging!
document.addEventListener("click", (event)=>{ console.log("You just peeped::", event.target) })


document.addEventListener("DOMContentLoaded", () => {



  // set canvas  

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);


  //draw background
  const backgroundImage = new Image();
  backgroundImage.src = 'images/map.png'
  backgroundImage.onload  = function() {
      ctx.drawImage(backgroundImage, 0, 0);
      console.log("this happened")
  }

  // game objects
  const jax = {
    speed: 100
  };
  const shed = {};
  const trees = {};
    //start postion
    jax.x = 550
    jax.y = 200

  // draw jax the hero
  const jaxImage = new Image();
  jaxImage.src = 'images/Jax.png'
  const drawBoard = function() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(jaxImage, jax.x , jax.y)
  }

  // move jax!
  var keysDown = {};

  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);

  // holding key functions for arrow keys
  var refresh = function (variable) {
    if (38 in keysDown) {
      jax.y -= jax.speed * variable;
    }
    if (40 in keysDown) {
      jax.y += jax.speed * variable;
    }
    if (37 in keysDown) {
      jax.x -= jax.speed * variable;
    }
    if (39 in keysDown) {
      jax.x += jax.speed * variable;
    }
  };

  // The game loop
  let gScore = 0
  const main = function () {
    let now = Date.now();
    let delta = now - then;

    refresh(delta / 1000);
    drawBoard();

    then = now;
    gScore +=1
    score = Math.ceil(((gScore+1)/10)*10/1000) 

    // Make this action a loop
    requestAnimationFrame(main);
  };

  //login form functionality and removal
  const loginForm = document.querySelector("#login-form")

  loginForm.addEventListener("submit", event =>{ event.preventDefault(); 
    const userName = event.target.name.value
    console.log("submitted values!:::", userName)
    USER
    document.getElementById("login-form").style.display = "none";

  })
  
  // Let's play this game!
  let then = Date.now();
  main();
})
