class API {

    // users get fetch
    static API_USER_TABLE_URL = "http://localhost:3000/users"
    static fetchAllUsers(){

        fetch(this.API_USER_TABLE_URL).then(response => response.json())
        .then(fetchedArray => { console.log(fetchedArray);
          
          fetchedArray.forEach(user => {console.log(user) 
            
            // Backend user into  frontend user
            const newUser = new Actor(user)
            // Put user in DOM
            newUser.renderActor(user)
          }) 
        })
    }

    // scores get fetch
    static API_SCORES_TABLE_URL = "http://localhost:3000/scores"
    static fetchAllScores(){

        fetch(this.API_SCORES_TABLE_URL).then(response => response.json())
        .then(fetchedArray => { console.log(fetchedArray);
            
            fetchedArray.forEach(score => {console.log(score) 
            
            // Backend user into  frontend user
            const newScore = new Actor(score)
            // Put user in DOM
            newScore.renderScore(score)
            }) 
        })
    }
}