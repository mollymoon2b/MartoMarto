import { GAME_STATE } from './nail/hammeringNail';

const LEADER_BOARD_ACTION = 'LEADERBOARD';
const LEADER_BOARD_NAME = 'martomarto-leaderboard';

export function computeScore(gameState, ratio) {
  if (gameState === GAME_STATE.LOST) {
    return 0;
  }
  return Math.round(Math.pow(ratio * 100, 2));
}

export async function shareScore(score) {
  try {
    const leaderBoard = await FBInstant.getLeaderboardAsync(LEADER_BOARD_NAME);
    await leaderBoard.setScoreAsync(score);
    await FBInstant.updateAsync({
      action: LEADER_BOARD_ACTION,
      name: LEADER_BOARD_NAME
    });
  } catch (error) {
    console.error(error);
  }
}
