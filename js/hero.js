export const jax = {
  x: 550,
  y: 200,
  speed: 100
};

export function isJaxInDoor() {
  return jax.x > 498 && jax.x < 508 && jax.y > 97 && jax.y < 108;
}

export function drawJax(ctx, jaxImage) {
  if (isJaxInDoor()) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,255,0,0.8)';
    ctx.shadowBlur = 20;
    ctx.fillStyle = 'rgba(0,255,0,0.4)';
    ctx.beginPath();
    ctx.arc(jax.x + 16, jax.y + 16, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.drawImage(jaxImage, jax.x, jax.y);
}
