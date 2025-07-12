export const jax = {
  x: 550,
  y: 200,
  speed: 100
};

export function isJaxInDoor() {
  return jax.x > 486 && jax.x < 515 && jax.y > 90 && jax.y < 103;
}

const JAX_SCALE = 1.4;

export function drawJax(ctx, jaxImage) {
  const width = jaxImage.width * JAX_SCALE;
  const height = jaxImage.height * JAX_SCALE;

  if (isJaxInDoor()) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,255,0,0.8)';
    ctx.shadowBlur = 20;
    ctx.fillStyle = 'rgba(0,255,0,0.4)';
    ctx.beginPath();
    ctx.arc(jax.x + width / 2, jax.y + height / 2, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.drawImage(jaxImage, jax.x, jax.y, width, height);
}

