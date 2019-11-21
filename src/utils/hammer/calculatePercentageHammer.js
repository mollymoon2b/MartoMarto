import { HAMMER_DELTA_MAX } from '../../game-settings/gameSettings';

const calculatePercentageHammer = ({ originPosition, newPosition }) => {
  const delta = originPosition.y - newPosition.y;
  const percentage = delta / HAMMER_DELTA_MAX;
  if (percentage > 1) {
    return 1;
  }
  return percentage;
};

export {
  calculatePercentageHammer
};
