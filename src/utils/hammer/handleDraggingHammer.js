import { redTint } from '../../constants/tintColors';
import { calculatePercentageHammer } from './calculatePercentageHammer';

const getPosition = gameObject => ({ x: gameObject.x, y: gameObject.y });

const handleDraggingHammer = (hammer, game, moveHammer, animateHammer) => {
  let originPosition;
  game.input.setDraggable(hammer);

  game.input.on('dragstart', function (pointer, gameObject) {
    // Let's show that we grab the hammer
    // Idea 1
    gameObject.setTint(redTint);
    // Idea 2
    // Add a cursor as a hand
    // Idea 3
    // Rotate the hammer a little bit

    originPosition = getPosition(gameObject);
  });

  game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    const newPosition = getPosition(gameObject);
    const percentage = calculatePercentageHammer({ originPosition, newPosition });
    moveHammer(percentage);

    // Moving the hammer => @josselin may delete this
    gameObject.x = dragX;
    gameObject.y = dragY;
  });


  game.input.on('dragend', function (pointer, gameObject) {
    // Clean after dragstart
    gameObject.clearTint();

    const newPosition = getPosition(gameObject);
    const percentage = calculatePercentageHammer({ originPosition, newPosition });
    animateHammer(percentage);
  });
};

export {
  handleDraggingHammer
};
