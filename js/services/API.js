// API.js
import Game from '../models/game.js';
import User from '../models/user.js';

const API_BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://chopping-backend.onrender.com";

class API {
  static API_USER_TABLE_URL = `${API_BASE_URL}/users`;
  static API_SCORES_TABLE_URL = `${API_BASE_URL}/games`;

  static createUser(userName) {
    return fetch(this.API_USER_TABLE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    }).then(res => res.json());
  }

  static fetchAllUsers() {
    return fetch(this.API_USER_TABLE_URL)
      .then(res => res.json())
      .then(users => users.forEach(user => new User(user)));
  }

  static submitScore(score, userId) {
    return fetch(this.API_SCORES_TABLE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: score,
        user_id: userId
      })
    }).then(res => res.json());
  }

  static fetchAllGames() {
    return fetch(this.API_SCORES_TABLE_URL)
      .then(res => res.json())
      .then(games => Game.renderTopScores(games));
  }

  static fetchAllUserGames(currentUser) {
    return fetch(this.API_SCORES_TABLE_URL)
      .then(res => res.json())
      .then(games => {
        const userGames = games.filter(game => game.user_id == currentUser.id);
        Game.renderTopUserScores(userGames);
      });
  }
}

export default API;
