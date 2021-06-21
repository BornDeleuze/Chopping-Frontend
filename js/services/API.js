class API {

    // users fetch
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
}