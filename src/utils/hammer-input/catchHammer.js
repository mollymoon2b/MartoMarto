import { greenTint } from '../../constants/tintColors';

const catchHammer = hammer => {
  hammer.setInteractive();

  hammer.on('pointerover', function () {
    // Let's show that we can grab the hammer
    // Idea 1
    this.setTint(greenTint);
    // Idea 2
    // Add a cursor as a hand
    // Idea 3
    // Rotate the hammer a little bit
  });

  hammer.on('pointerout', function () {
    this.clearTint();
  });
};

export {
  catchHammer
}
