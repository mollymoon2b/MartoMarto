import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import tableSpritesheet from '../assets/spritesheet.png';
import tableSpritesheetJson from '../assets/spritesheet.json';
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
    this.load.atlas('tableSpritesheet', tableSpritesheet, tableSpritesheetJson);
  }

  create() {
    // init scene
    const table = this.add.sprite(Math.round(window.innerWidth / 2), window.innerHeight - 86, 'tableSpritesheet');
    const nail = this.add.sprite(table.x, table.y - 100, 'nail').setInteractive();
    const hammer = this.add.image(nail.x - 260, nail.y - 300, 'hammer');
    table.setDepth(1);
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
          const gameState = hammeringNail(nail, table, initialRatio);
          prepareNewHit(gameState, initialRatio);
        }
      }, 1000 / 60);
    };

    catchHammer(hammer);
    handleDraggingHammer(hammer, this, moveHammer, animateHammer, hammeringNail, nail, table, prepareNewHit);
    moveHammer(0);

    const configBreakTable = {
      key: 'breakTable',
      frames: [
        { key: 'tableSpritesheet', frame: 'annimation-table0001.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0002.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0003.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0004.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0005.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0006.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0007.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0008.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0009.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0010.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0011.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0012.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0013.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0014.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0015.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0016.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0017.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0018.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0019.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0020.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0021.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0022.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0023.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0024.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0025.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0026.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0027.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0028.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0029.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0030.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0031.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0032.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0033.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0034.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0035.png' },
        { key: 'tableSpritesheet', frame: 'annimation-table0036.png' },
      ],
      frameRate: 100, // frame rate – the speed of the animation. Higher is faster.
    };

    this.anims.create(configBreakTable);
  }
}
