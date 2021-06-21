//declase user class
class User

// store all the users from API
static all = []

constructor({id, name }){

    this.id = id
    this.name = name,
    User.all.push(this)
}