import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import { getHammerPosition } from '../utils/getHammerPosition';
import { catchHammer } from '../utils/hammer-input/catchHammer';
import { handleDraggingHammer } from '../utils/hammer-input/handleDraggingHammer';
import { GAME_STATE, hammeringNail } from '../utils/nail/hammeringNail';
import { computeScore } from '../utils/scoreManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', active: false });
  }

  preload() {
    this.load.image('hammer', hammer);
    this.load.image('nail', nail);
  }

  create() {
    // init scene
    const nail = this.add.sprite(Math.round(window.innerWidth / 2), window.innerHeight, 'nail').setInteractive();
    const hammer = this.add.image(nail.x - 260, nail.y - 300, 'hammer');
    const scoreElem = this.add.text(100, 100, '', { fontFamily: 'RetroGaming', fontSize: '20px' });

    const moveHammer = ratio => {
      const { angle, x, y } = getHammerPosition(1 - ratio);
      hammer.angle = angle;
      hammer.x = nail.x + x;
      hammer.y = nail.y + y - 5;
    }

    const animateHammer = ratio => {
      const initialRatio = ratio;

      const intervalId = setInterval(() => {
        if (ratio > 0) {
          ratio -= 0.02;
          moveHammer(ratio);
        } else {
          clearInterval(intervalId);
          const gameState = hammeringNail(nail, initialRatio);
          const score = computeScore(gameState, initialRatio);
          scoreElem.setText(`${score} (${gameState})`);
        }
      }, 1000 / 60);
    };

    catchHammer(hammer);
    handleDraggingHammer(hammer, this, moveHammer, animateHammer);

    this.input.on('gameobjectup',  (pointer, gameObject) =>
    {
      gameObject.emit('clicked', gameObject);
    }, this);

    moveHammer(0);
  }
}
