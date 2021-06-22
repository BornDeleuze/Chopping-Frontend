class Game {

    // store all the users from API
    static all = []

    constructor({id, score, user_id}){

        this.id = id
        this.score = score,
        this.user_id = user_id,
        Game.all.push(this)
    }

    // fill in score elements
    makeAScore =()=>{

        let gameUser = User.all.filter(user => user.id == this.user_id);
        let leaderScoreElement = document.getElementById(this.id)
        // console.log(this.score, gameUser[0]["name"], this.user_id)

        return `
        <p> ${gameUser[0]["name"]}  :  ${this.score}</p>
        `
    }

    //show top scores
    renderTopScores =(game)=> {
        const leaderScores = document.getElementById("leader_scores")
        let leaderScoreElement = document.createElement("h5")
        leaderScoreElement.classList.add("score")
        leaderScoreElement.setAttribute("id", game.id)
        // Add an (id=) to (leaderScoreElement)
        leaderScoreElement.id = game.id
        // Setting the InnerHTML for the (element)
        leaderScores.appendChild(leaderScoreElement);

        leaderScoreElement.innerHTML = this.makeAScore()
        // console.log(this)
    }



    //show the users best scores
    makeAUserScore =()=>{
        let gameUser = User.all.filter(user => user.id == this.user_id);
        let userScoreElement = document.getElementById(this.id)
        // console.log(this.score, gameUser[0]["name"], this.user_id)
        return `
        <p> ${gameUser[0]["name"]}  :  ${this.score}</p>
        `
    }

    //show top scores
    renderTopUserScores =(game)=> {
        const userScores = document.getElementById("user_scores")
        let userScoreElement = document.createElement("h5")
        userScoreElement.classList.add("score")
        userScoreElement.setAttribute("id", game.id)
        // Add an (id=) to (leaderScoreElement)
        userScoreElement.id = game.id
        // Setting the InnerHTML for the (element)
        userScores.appendChild(userScoreElement);
        userScoreElement.innerHTML = this.makeAUserScore()
    }
}