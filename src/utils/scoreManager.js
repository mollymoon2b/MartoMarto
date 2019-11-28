import { GAME_STATE } from './nail/hammeringNail';

let score = 0;

export function computeScore(gameState, ratio) {
  if (gameState === GAME_STATE.LOST) {
    return 0;
  }
  score += Math.round(Math.pow(ratio * 100, 2));
  return score;
}
