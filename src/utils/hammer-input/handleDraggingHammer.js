import { calculatePercentageHammer } from './calculatePercentageHammer';
import { handleRotationHammer } from './rotation/handleRotationHammer';

const getPosition = gameObject => ({ x: gameObject.x, y: gameObject.y });

const handleDraggingHammer = (hammer, game, moveHammer, animateHammer, prepareNewHit) => {
  let originPosition;
  let preventDragEnd = false;

  game.input.setDraggable(hammer);

  game.input.on('dragstart', function (pointer, gameObject) {
    originPosition = getPosition(gameObject);
  });

  game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    const newPosition = { x: dragX, y: dragY };
    const percentage = calculatePercentageHammer({ originPosition, newPosition });
    moveHammer(percentage);

    preventDragEnd = handleRotationHammer({preventDragEnd, percentage, originPosition, newPosition, prepareNewHit})
  });


  game.input.on('dragend', function (pointer, gameObject) {
    // Clean after dragstart
    gameObject.clearTint();

    if (preventDragEnd === false) {
      const newPosition = getPosition(gameObject);
      const percentage = calculatePercentageHammer({ originPosition, newPosition });
      animateHammer(percentage);
    } else {
      preventDragEnd = false
    }
  });
};

const disableDraggingHammer = (game, hammer) => {
  game.input.setDraggable(hammer, false);
};

export {
  disableDraggingHammer,
  handleDraggingHammer
};
