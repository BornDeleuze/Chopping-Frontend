import { setupCanvas, resetGame, gameLoop } from './engine.js';
import API from './services/API.js';
import User from './models/user.js';

let myMusic = document.getElementById("music");
myMusic.loop = true;

document.addEventListener("DOMContentLoaded", () => {
  setupCanvas();
  API.fetchAllUsers();
  API.fetchAllGames();

  let loggedUser = null;

  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const userName = event.target.name.value;
    // Hide login form and show canvas
    document.getElementById("login-form").style.display = "none";
    document.getElementById("game-wrapper").style.display = "block";
    let existingUser = User.all.find(u => u.name === userName);
    if (existingUser) {
      loggedUser = existingUser;
      loggedUser.renderUser(existingUser);
      startGame();
    } else {
      API.createUser(userName).then(user => {
        loggedUser = new User(user);
        API.fetchAllUserGames(loggedUser);
        startGame();
      });
    }
  }); 


  function startGame() {
    document.getElementById("play-again").style.display = "none";
    resetGame();
    myMusic.play();
    gameLoop((score) => {
      document.getElementById("play-again").style.display = "block";
      API.submitScore(score, loggedUser.id).then(() => {
        API.fetchAllGames();
        API.fetchAllUserGames(loggedUser);
      });
    });
  }

  document.getElementById("play-again-button").addEventListener("click", () => {
    document.getElementById("play-again").style.display = "none";
    startGame();
  });
});
