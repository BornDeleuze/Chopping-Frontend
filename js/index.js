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

  const loginForm = document.querySelector("#login-form form");
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const userName = event.target.name.value;
    loginForm.style.display = "none";

    let existingUser = User.all.find(u => u.name === userName);
    if (existingUser) {
      loggedUser = existingUser;
      loggedUser.renderUser(existingUser);
      startGame();
    } else {
      asd
      API.createUser(userName).then(user => {
        loggedUser = new User(user);
        API.fetchAllUserGames(loggedUser);
        startGame();
      });
    }
  });

  function startGame() {
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
