import Game from '../models/game.js';
import User from '../models/user.js';
import { fetchWithRetry } from '../helpers.js';

const API_BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : 
  "https://chopping-backend.onrender.com";

class API {
  static API_USER_TABLE_URL = `${API_BASE_URL}/users`;
  static API_SCORES_TABLE_URL = `${API_BASE_URL}/games`;

  static createUser(userName) {
    return fetchWithRetry(this.API_USER_TABLE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    }).catch(err => {
      alert("Failed to create user. Try again.");
      console.error(err);
    });
  }

  static fetchAllUsers() {
    return fetchWithRetry(this.API_USER_TABLE_URL)
      .then(users => users.forEach(user => new User(user)))
      .catch(err => {
        alert("Error connecting to server. Try refreshing in a moment.");
        console.error(err);
      });
  }

  static submitScore(score, userId) {
    return fetchWithRetry(this.API_SCORES_TABLE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: score,
        user_id: userId
      })
    }).catch(err => {
      console.error("Failed to submit score:", err);
    });
  }

  static fetchAllGames() {
    return fetchWithRetry(this.API_SCORES_TABLE_URL)
      .then(games => Game.renderTopScores(games))
      .catch(err => {
        console.error("Failed to fetch games:", err);
      });
  }

  static fetchAllUserGames(currentUser) {
    return fetchWithRetry(this.API_SCORES_TABLE_URL)
      .then(games => {
        const userGames = games.filter(game => game.user_id == currentUser.id);
        Game.renderTopUserScores(userGames);
      })
      .catch(err => {
        console.error("Failed to fetch user games:", err);
      });
  }

  static fetchAllUsers() {
    return fetchWithRetry(this.API_USER_TABLE_URL)
      .then(users => users.forEach(user => new User(user)))
      .catch(err => {
        console.error("Failed to fetch user games:", err);
      });
  }
}

export default API;
