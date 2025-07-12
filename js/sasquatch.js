export const sasquatch = {
  x: -300,
  y: 0
};

export let sasquatchActive = false;
export let sasquatchOut = false;

export function updateSasquatch(gScore, delta) {
  if (sasquatchActive) {
    sasquatch.x += (gScore / 2) * delta;
    if (sasquatch.x > 155 ) sasquatchOut = true;
    if (sasquatch.x > 550) {
      sasquatchOut = false;
    }
    if (sasquatch.x > 900) {
      sasquatchActive = false;
      sasquatch.x = -300;
    }
  }
}

export function triggerSasquatch(gScore) {
  if ([100, 350, 400, 500, 600, 625, 15000].includes(gScore)) {
    sasquatchActive = true;
  }
}
