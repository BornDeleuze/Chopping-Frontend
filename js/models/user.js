//declase user class
export class User {
    // store all the users from API
    static all = []

    constructor({id, name}){
        this.id = id,
        this.name = name,
        User.all.push(this)
    }

    //show users name
    renderUser =(user)=> {
        const userHeader = document.getElementById("user_header")
        userHeader.textContent= "GOOD LUCK " + user.name
    }   
}

export default User;
