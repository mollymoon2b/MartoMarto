const VELOCITY = 20;
const ACCURACY = 5

export const GAME_STATE = {
  CONTINUE: 'CONTINUE',
  LOST: 'LOST',
  WON: 'WON',
};

const computeVelocity = (percentage) => percentage > 0 ? Math.round(percentage * VELOCITY) : 0;

const hammeringNail = (nail, percentage) => {
  const hiddenNail = (nail.height/2) - 8;
  const maxBottomNailHeight = window.innerHeight + hiddenNail;
  const nailHeight = nail.y + computeVelocity(percentage);

  if(nailHeight >= (maxBottomNailHeight - ACCURACY) && nailHeight <= (maxBottomNailHeight + ACCURACY)) {
    // win
    return GAME_STATE.WON;
  }

  if(nailHeight > maxBottomNailHeight) {
    // Lose
    return GAME_STATE.LOST;
  }

  nail.setPosition(nail.x, nailHeight);
  return GAME_STATE.CONTINUE;
};

export { hammeringNail };


