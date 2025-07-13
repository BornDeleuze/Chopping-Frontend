import { User } from './user.js';

class Game {
  static all = [];

  constructor({ id, score, user_id }) {
    this.id = id;
    this.score = score;
    this.user_id = user_id;
    Game.all.push(this);
  }

  makeAScore() {
    let gameUser = User.all.find(user => user.id == this.user_id);
    return `<p> ${gameUser?.name || 'Unknown'}  :  ${this.score}</p>`;
  }

  makeAUserScore() {
    let gameUser = User.all.find(user => user.id == this.user_id);
    return `<p> ${gameUser?.name || 'Unknown'}  :  ${this.score}</p>`;
  }

  static renderTopScores(games) {
    const leaderScores = document.getElementById("leader-scores");
    leaderScores.innerHTML = "";

    games
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .forEach(gameData => {
        let game = new Game(gameData);
        let leaderScoreElement = document.createElement("h5");
        leaderScoreElement.classList.add("score");
        leaderScoreElement.id = game.id;
        leaderScoreElement.innerHTML = game.makeAScore();
        leaderScores.appendChild(leaderScoreElement);
      });
  }

  static renderTopUserScores(games) {
    const userScores = document.getElementById("user-scores");
    userScores.innerHTML = "";

    games
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .forEach(gameData => {
        let game = new Game(gameData);
        let userScoreElement = document.createElement("h5");
        userScoreElement.classList.add("score");
        userScoreElement.id = game.id;
        userScoreElement.innerHTML = game.makeAUserScore();
        userScores.appendChild(userScoreElement);
      });
  }
}

export default Game;