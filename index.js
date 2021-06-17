

/*
create canvas
create navbar
create dropdown for high scores
fetch high scores
display high scores
"sign-in" with fetches for user.name
render all graphics
assign buttons for movement and starting (and action?)
make game logic
save score with post fetch
update highscore list
start another game loop?
*/





document.addEventListener("click", (event)=>{ console.log("You just peeped::", event.target) })
    
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
const backgroundImage = new Image();
backgroundImage.src = 'map.png'

const drawEverything = function() {
    ctx.drawImage(backgroundImage, 0, 0);
}


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    drawEverything
});
