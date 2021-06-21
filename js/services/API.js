class API {

    // users get fetch
    static API_USER_TABLE_URL = "http://localhost:3000/users"
    static fetchAllUsers(){

        fetch(this.API_USER_TABLE_URL).then(response => response.json())
        .then(fetchedArray => { console.log(fetchedArray);
          
          fetchedArray.forEach(user => {console.log(user) 
            
            // Backend user into  frontend user
            const newUser = new User(user)
            // Put user in DOM
            newUser.renderUser(user)
          }) 
        })
    }

    // scores get fetch
    static API_SCORES_TABLE_URL = "http://localhost:3000/games"
    static fetchAllGames(){

        fetch(this.API_SCORES_TABLE_URL).then(response => response.json())
        .then(fetchedArray => { console.log(fetchedArray);
            
            fetchedArray.forEach(game => {console.log(game) 
            
            // Backend user into  frontend user
            const newGame = new Game(game)
            // Put user in DOM
            newGame.renderGame(game)
            }) 
        })
    }
}