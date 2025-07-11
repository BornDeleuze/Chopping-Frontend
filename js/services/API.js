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

  static fetchAllGames() {
    return fetch(this.API_SCORES_TABLE_URL)
      .then(res => res.json())
      .then(games => {
        games.slice(0, 10).forEach(game => {
          const newGame = new Game(game);
          setTimeout(() => newGame.renderTopScores(game), 500);
        });
      });
  }

  static fetchAllUserGames(currentUser) {
    return fetch(this.API_SCORES_TABLE_URL)
      .then(res => res.json())
      .then(games => {
        games
          .filter(game => game.user_id == currentUser.id)
          .slice(0, 10)
          .forEach(game => new Game(game).renderTopUserScores(game));
      });
  }
}

export default API;
