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
    makeAScore =()=>{ console.log(this)
        let gameUser = User.all.filter(status => status.id == this.user_id);
        let leaderScoreElement = document.getElementById(this.id)
        leaderScoreElement.textContent = gameUser + ":" + this.score
        console.log(this.score)
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
    }
    
}