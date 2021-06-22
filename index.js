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


  API.fetchAllUsers()
  API.fetchAllGames()

  // set canvas  

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);


  // game objects
  const jax = {
    speed: 100
  };
  const shed = {};
  // shed positions are
    // x= 498
    // x = 508
    // y = 108
    // y = 97
  const trees = {};
  const choppingBlock = {};
  let gScore = 0
  let scoreIncrease = false
  let sasquatchOut = false
  let gameOver = false

  // chopping block position is
  // 
  // x = 380-450
  // y = 290-330


  // start postions
    jax.x = 550
    jax.y = 200

  // DRAWING canvas which is called in loop
  // draw jax the hero
  const jaxImage = new Image();
  jaxImage.src = 'images/Jax.png'
  //draw background
  const backgroundImage = new Image();
  backgroundImage.src = 'images/map.png'
  const drawBoard = function() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(jaxImage, jax.x , jax.y)
  // DRAW THE Score!
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score " + gScore, 32, 32);
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
    	// scoring points on chopping position
    if (
      jax.x < 450
      && jax.x > 380
      && jax.y < 330
      && jax.y > 290
    )
    {
      scoreIncrease = true;
    } 
    else {
      scoreIncrease = false;
    }

    // losing game cuz of sasquatch when not in house
    if (
      jax.x > 508
      || jax.x < 498
      && jax.y > 108
      || jax.y < 97
      && sasquatchOut == true
    ){ gameOver = true
    }
  };

  // increase score function
  function increaseScore(){
    if (scoreIncrease == true){
      gScore+=1
    }
  }

  // The game loop
  
  function main() {
    let now = Date.now();
    let delta = now - then;

    refresh(delta / 1000);
    drawBoard();

    then = now;
    increaseScore()

    // Make this action a loop
    requestAnimationFrame(main);
  };


  // Let's play this game!
    const play=()=>{
      main();
  }

  //login form functionality and removal, which starts game
  const loginForm = document.querySelector("#login-form")
  loginForm.addEventListener("submit", event =>{ event.preventDefault(); 
    const userName = event.target.name.value
    console.log("submitted values!:::", userName);
    document.getElementById("login-form").style.display = "none";
    
    // find or create user
      //find
    
    const currentUser = User.all.filter(status => status.name == userName)[0];
    API.fetchAllUserGames(currentUser)

      // or create
    //if (request.length === 0) User.all.push({name : userName});
    // console.log(list)
    play()
  })
  let then = Date.now();




})

// hide and seek with the scores!
function displayTopScores() {
  document.getElementById("user_scores").style.display = "none";
  document.getElementById("leader_scores").style.display = "block";
}
function displayUserScores() {
  document.getElementById("user_scores").style.display = "block";
  document.getElementById("leader_scores").style.display = "none";
}
