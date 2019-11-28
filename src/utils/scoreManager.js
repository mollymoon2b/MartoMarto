import { GAME_STATE } from './nail/hammeringNail';

export function computeScore(gameState, ratio) {
  if (gameState === GAME_STATE.LOST) {
    return 0;
  }
  return Math.round(Math.pow(ratio * 100, 2));
}
