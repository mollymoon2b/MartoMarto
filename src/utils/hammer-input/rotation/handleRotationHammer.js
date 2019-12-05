import { randomize } from '../../randomize';
import { calculatePercentageHammer } from '../calculatePercentageHammer';
import { calculateRotationPercentageHammer } from './calculateRotationPercentageHammer';

const resetRotation = () => ({
  hasReachedTop: false,
  topPosition: null,
  topTime: null,
});

let previousPosition = { x: 0, y: 0 };
let rotation = resetRotation();

const handleRotationHammer = ({ hammeringNail, preventDragEnd, percentage, originPosition, newPosition, nail, table, prepareNewHit }) => {
  const instantPercentage = calculatePercentageHammer({ originPosition: previousPosition, newPosition });

  // Si le marteau commence à descendre vers le clou et qu'il n'a jamais atteint une apogée, alors on retient les infos du marteau
  if (instantPercentage < 0 && rotation.hasReachedTop === false) {
    rotation = {
      hasReachedTop: true,
      topPosition: previousPosition,
      topTime: performance.now(),
    };
  }

  // Si le marteau remonte, on réinitialise
  if (instantPercentage > 0 && rotation.hasReachedTop) {
    rotation = resetRotation();
  }

  // Si le marteau atteint le clou avec une apogée définie
  if (percentage < 0 && rotation.hasReachedTop) {
    const percentage = randomize(
      calculateRotationPercentageHammer({ originPosition, rotation })
    );
    rotation = resetRotation();

    if (percentage > 0.05) {
      preventDragEnd = true;
      const gameState = hammeringNail(nail, table, percentage);
      prepareNewHit(gameState, percentage)
    }
  }

  previousPosition = newPosition;
  return preventDragEnd;
};

export {
  handleRotationHammer
};

