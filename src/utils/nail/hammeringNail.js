let nailOrigin = { x: 0.5, y: 0.5 };
const velocity = 0.10;

export const GAME_STATE = {
  CONTINUE: 'CONTINUE',
  LOST: 'LOST',
  WON: 'WON',
};

const computeVelocity = (percentage) => {
  return percentage > 0 ? percentage * velocity : 0;
};

const hammeringNail = (nail, percentage) => {
  nailOrigin.y -= computeVelocity(percentage);
  nailOrigin.y = Math.max(Math.round(nailOrigin.y * 1000) / 1000, 0.06);
  nail.setOrigin(nailOrigin.x, nailOrigin.y);

  if (nailOrigin.y <= 0.08 && nailOrigin.y >= 0.07) {
    // win
    return GAME_STATE.WON;
  } else if (nailOrigin.y < 0.07) {
    // Lose
    return GAME_STATE.LOST;
  }
  return GAME_STATE.CONTINUE;
};

export { hammeringNail };


