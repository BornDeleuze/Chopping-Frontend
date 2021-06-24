
// For easy debugging!
document.addEventListener("click", (event)=>{ console.log("You just peeped::", event.target) })


document.addEventListener("DOMContentLoaded", () => {

  //logged in user
  let loggedUser = {}
  function setUser (user){
    loggedUser = new User(user)
    console.log(loggedUser)
  }

  const API_DATABASE_URL = "http://localhost:3000/users"
  const API_GAMES_URL = "http://localhost:3000/games"
  API.fetchAllUsers()
  API.fetchAllGames()

  // set canvas  

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 480;
  document.body.appendChild(canvas);


  
  // score variables
  let gScore = 0
  let scoreIncrease = false

  //sasquatch things
  let sasquatchOut = false
  let gameOver = false
  let sasquatchActive = false

  // game objects
  const jax = {
    speed: 100
  };

  const sasquatch = {};
  const sasquatchImage = new Image();
  sasquatchImage.src = 'images/sasquatch.png'


  // play again button for when the game is over
  function showPlayAgain(){
    const playAgainDiv = document.getElementById("play-again")
    playAgainDiv.style.display="block"
  }
  // play again button functionality
  const playAgainButton = document.getElementById("play-again-button")
  playAgainButton.addEventListener("click", function(){
    console.log("hello world")
    playAgainButton.style.display="none"
    play()

  });

  // reset/start gamestate variables.
  function resetGame(){
    jax.x = 550
    jax.y = 200
    gScore = 0
    gameOver = false
    sasquatchActive = false
    sasquatchOut = false
    sasquatch.x =-300
    sasquatch.y =0
  }
  

  //draw game over screen
  const drawGameOver = function(){
    console.log("we hit the game over")
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("GAME OVER!!!!! YOUR SCORE: " + gScore, 300, 300);
  }
  // DRAWING canvas which is called in loop
  // draw jax the hero
  const jaxImage = new Image();
  jaxImage.src = 'images/Jax.png'
  //draw background
  const backgroundImage = new Image();
  backgroundImage.src = 'images/map.png'

  // draw board function
  const drawBoard = function() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(jaxImage, jax.x , jax.y);
    if (sasquatchActive == true){ctx.drawImage(sasquatchImage, sasquatch.x, sasquatch.y);}

    // DRAW THE Score!
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score " + gScore, 32, 32);
  }

  // move jax!
  // keydown for smooth holding movement
  var keysDown = {};

  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);

  // refresh game state which is called in the game loop
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
    // move and removing sasquatch
    if (sasquatchActive == true){
      sasquatch.x += (gScore/2) * variable;
    }
    if (sasquatch.x > 155){
      sasquatchOut = true;
    }
    if (sasquatch.x > 600){
      sasquatchActive = false;
      sasquatchOut = false;
      sasquatch.x = -300;
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
      jax.x < 508
      && jax.x > 498
      && jax.y < 108
      && jax.y > 97
    ){}else if (
      sasquatchOut == true
    ){ console.log("gameOver") 
      gameOver = true
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
    increaseScore();
    if (gScore == 100 || gScore == 350 || gScore ==400 || gScore == 500 || gScore == 600 || gScore == 625 || gScore== 15000) {
      sasquatchActive = true
    }
    // game over actions
    if (gameOver == true){
      drawGameOver();
      showPlayAgain();
      //post fetch for GAME SCORE ********************************
      console.log(loggedUser)
      fetch(API_GAMES_URL, {        
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          "score": gScore,
          "user_id": loggedUser.id       
        })
      })
      .then(response => response.json())
      .then(theThingWePosted => console.log("Hey! This is what is sent! ", theThingWePosted))
      clearScores()
      API.fetchAllGames()
      API.fetchAllUserGames(loggedUser)
    }
    
    // Make this action a loop
    if (!gameOver){
      requestAnimationFrame(main)
    }

  }

  // POST FETCH 
  //login form functionality and removal, which starts game, and calls the post fetch
  const loginForm = document.querySelector("#login-form")
  loginForm.addEventListener("submit", event =>{ event.preventDefault(); 
    const userName = event.target.name.value
    document.getElementById("login-form").style.display = "none";

    //find or create by name
    //find
    var currentUser = null
    let currentUserExists = User.all.some(function (elem) {
      if (elem.name === userName) {
        currentUser = elem;
        currentUser.renderUser(elem);
        setUser(currentUser)
        return true;
      }
    });

    //create
    if(!currentUserExists) {
      fetch(API_DATABASE_URL, {        
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            "name": userName,       
          })
        })
        .then(response => response.json())
        // .then(theThingFromServer => console.log(theThingFromServer))
        .then(theThingWePosted => {
          currentUser = theThingWePosted
          console.log(currentUser)
          console.log(theThingWePosted)
          setUser(currentUser)
        })
    }
    API.fetchAllUserGames(loggedUser)
    // renderUser(loggedUser)
    resetGame()
    play()
  })

  // Let's play this game!
  let play=()=>{
    resetGame()
    main();
  }
  let then = Date.now();


  //Clear the scores!
  function clearScores(){
    const leaderScores = document.getElementById("leader-scores")
    leaderScores.textContent = ""
    const userScores = document.getElementById("user-scores")
    userScores.textContent = ""
  }
});

// hide and seek with the scores!
function displayTopScores() {
  document.getElementById("user-scores-card").style.display = "none";
  document.getElementById("leader-scores-card").style.display = "block";
}
function displayUserScores() {
  document.getElementById("user-scores-card").style.display = "block";
  document.getElementById("leader-scores-card").style.display = "none";
}
