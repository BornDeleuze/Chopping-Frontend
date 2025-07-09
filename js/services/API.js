class API {

  
  static API_BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://chopping-backend.onrender.com";

  static API_USER_TABLE_URL = `${this.API_BASE_URL}/users`
  static API_SCORES_TABLE_URL = `${this.API_BASE_URL}/games`

  // users get fetch
    static fetchAllUsers(){

        fetch(this.API_USER_TABLE_URL).then(response => response.json())
        .then(fetchedArray => {
          
          fetchedArray.forEach(user => { 
            
            // Backend user into  frontend user
            const newUser = new User(user)
            // Put user in DOM
            // newUser.renderUser(user)
          }) 
        })
    }

    // scores get fetch
    static fetchAllGames(){
      
        fetch(this.API_SCORES_TABLE_URL).then(response => response.json())
        .then(fetchedArray => {
          
            
            fetchedArray.slice(0, 10).forEach(game => {
            
            // Backend game into  frontend game
            const newGame = new Game(game)
            // Put game scores in DOM
            setTimeout(function(){ newGame.renderTopScores(game) }, 500);
            // newGame.renderTopScores(game)
            }) 
        })
    }

    // scores get fetch for given user
    static fetchAllUserGames(currentUser){
        fetch(this.API_SCORES_TABLE_URL).then(response => response.json())
        .then(fetchedArray => {
          let fetchedUserArray = fetchedArray.filter(game => game.user_id == currentUser.id);
            fetchedUserArray.slice(0, 10).forEach(game => {
            // Backend games into  frontend games
            const newGame = new Game(game)
            // Put game scores in DOM
            newGame.renderTopUserScores(game)
            }) 
        })
    }
}