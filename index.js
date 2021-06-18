

/*
create canvas
create navbar
create dropdown for high scores
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

// set canvas  
const canvas = document.getElementById("canvas");
canvas.width = 640;
canvas.height = 480;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);


//draw background
const backgroundImage = new Image();
backgroundImage.src = 'images/map.png'
backgroundImage.onload  = function() {
    ctx.drawImage(backgroundImage, 0, 0);
    console.log("this happened")
}

// draw jax the hero
const jaxImage = new Image();
jaxImage.src = 'images/Jax.png'
jaxImage.onload = function() {
    ctx.drawImage(jaxImage, 250,250)
}

// game objects
const jax = {
	speed: 150
};
const shed = {};
const trees = {};

// move jax``
function moveJaxLeft() {
  let leftNumbers = jax.style.left.replace("px", "");
  let left = parseInt(leftNumbers, 10);
  
    if (left > 0) {
      jax.style.left = `${left - 10}px`;
    }
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") {
      moveJaxLeft();
    }
  });

  function moveJaxRight() {
    let leftNumbers = jax.style.left.replace("px", "");
    let left = parseInt(leftNumbers, 10);
  
    if (left > 0) {
      jax.style.left = `${left + 10}px`;
    }

  }
  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") {
      moveJaxRight();
    }
  });

  function moveJaxUp() {
    let upNumbers = jax.style.bottom.replace("px", "");
    let up = parseInt(upNumbers, 10);
  
    if (up > 0) {
      jax.style.bottom = `${up + 10}px`;
    }
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp") {
      moveJaxUp();
    }
  });

  function moveJaxDown() {
    let upNumbers = jax.style.bottom.replace("px", "");
    let up = parseInt(upNumbers, 10);
  
    if (up > 0) {
      jax.style.bottom = `${up - 10}px`;
    }
  }

  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowDown") {
      moveJaxDown();
    }
  });
