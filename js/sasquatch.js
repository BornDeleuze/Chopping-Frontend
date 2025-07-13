// sasquatch.js

export class Sasquatch {
  constructor() {
    this.x = -300;
    this.y = 0;
    this.speed = 100;
    this.danger = false;
  }

  update(score, delta) {
    if (this.danger) {
      this.speed = 100 + score * .1; // or whatever scale you want
      this.x += this.speed * delta;
    }
    if (this.x > 700) {  // Assuming canvas width is 640 + some buffer
      this.danger = false;
      this.x = -300; // reset position off-screen
    }
  }


maybeTrigger(score) {
  if (!this.danger && score > 100 && score % 10 === 0 && Math.random() < 0.4) {
    this.danger = true;
  }
}


  isInDangerZone() {
    // You can customize these bounds as needed
    return this.x > 200 && this.x < 500;
  }

  draw(ctx, img) {
    if (this.danger) {
      ctx.drawImage(img, this.x, this.y, 300, 450);
    }
  }

  reset() {
    this.x = -300;
    this.y = 0;
    this.danger = false;
  }
}
