export class Jax {
  constructor(x = 550, y = 200, speed = 100) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.image = new Image();
    this.image.src = 'images/Jax.png';
  }

  isInDoor() {
    return this.x > 490 && this.x < 520 && this.y > 90 && this.y < 108;
  }

  draw(ctx) {
    if (this.isInDoor()) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 8, 0, 0.8)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(225, 228, 38, 0.4)';
      ctx.beginPath();
      ctx.arc(this.x + 40, this.y + 20, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.drawImage(this.image, this.x, this.y, 90, 90);
  }

  move(keysDown, delta) {
    if (38 in keysDown) this.y -= this.speed * delta;
    if (40 in keysDown) this.y += this.speed * delta;
    if (37 in keysDown) this.x -= this.speed * delta;
    if (39 in keysDown) this.x += this.speed * delta;
  }

  reset() {
    this.x = 550;
    this.y = 200;
  }
}