import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import table from '../assets/table.png';
import tableBroken from '../assets/table-broken.png';
import { getHammerPosition } from '../utils/getHammerPosition';
import { catchHammer } from '../utils/hammer-input/catchHammer';
import { handleDraggingHammer } from '../utils/hammer-input/handleDraggingHammer';
import { hammeringNail } from '../utils/nail/hammeringNail';
import { computeScore } from '../utils/scoreManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', active: false });
  }

  preload() {
    this.load.image('hammer', hammer);
    this.load.image('nail', nail);
    this.load.image('table', table);
  }

  create() {
    // init scene
    const table = this.add.image(Math.round(window.innerWidth / 2), window.innerHeight - 86, 'table');
    const nail = this.add.sprite(table.x - 100, table.y - 100, 'nail').setInteractive();
    const hammer = this.add.image(nail.x - 260, nail.y - 300, 'hammer');
    this.add.text(50, 60, FBInstant.player.getName(), { fontFamily: 'RetroGaming', fontSize: '20px' });
    const scoreElem = this.add.text(50, 100, '0 (CONTINUE)', { fontFamily: 'RetroGaming', fontSize: '20px' });
    let score = 0;

    const moveHammer = ratio => {
      const { angle, x, y } = getHammerPosition(1 - ratio);
      hammer.angle = angle;
      hammer.x = nail.x + x;
      hammer.y = nail.y + y - 5;
    };

    const prepareNewHit = (gameState, initialRatio) => {
      score += computeScore(gameState, initialRatio);
      scoreElem.setText(`${score} (${gameState})`);
      moveHammer(0); // Follow the nail
    };

    const animateHammer = ratio => {
      const initialRatio = ratio;

      const intervalId = setInterval(() => {
        if (ratio > 0) {
          ratio -= 0.02 * Math.abs(Math.max((initialRatio - ratio) * 50, 1));
          moveHammer(ratio);
        } else {
          clearInterval(intervalId);
          const gameState = hammeringNail(nail, initialRatio);
          prepareNewHit(gameState, initialRatio)
        }
      }, 1000 / 60);
    };

    catchHammer(hammer);
    handleDraggingHammer(hammer, this, moveHammer, animateHammer, hammeringNail, nail, prepareNewHit);
    moveHammer(0);
  }
}
