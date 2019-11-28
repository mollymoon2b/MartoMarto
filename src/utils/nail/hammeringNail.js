const VELOCITY = 20;
const ACCURACY = 2;

export const GAME_STATE = {
  CONTINUE: 'CONTINUE',
  LOST: 'LOST',
  WON: 'WON',
};

const computeVelocity = (percentage) => percentage > 0 ? Math.round(percentage * VELOCITY) : 0;

const hammeringNail = (nail, percentage) => {
  const hiddenNail = (nail.height/2) - 12;
  const maxBottomNailHeight = window.innerHeight + hiddenNail;
  const nailHeight = Math.min(nail.y + computeVelocity(percentage), maxBottomNailHeight);

  nail.setPosition(nail.x, nailHeight);

  if(nailHeight >= (maxBottomNailHeight - ACCURACY) && nailHeight < maxBottomNailHeight) {
    // win
    return GAME_STATE.WON;
  }

  if(nailHeight >= maxBottomNailHeight) {
    // Lose
    return GAME_STATE.LOST;
  }

  return GAME_STATE.CONTINUE;
};

export { hammeringNail };


