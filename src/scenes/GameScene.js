import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import tableSpritesheet from '../assets/table.png';
import tableSpritesheetJson from '../assets/table.json';
import { getHammerPosition } from '../utils/getHammerPosition';
import { catchHammer } from '../utils/hammer-input/catchHammer';
import { handleDraggingHammer } from '../utils/hammer-input/handleDraggingHammer';
import { GAME_STATE, hammeringNail } from '../utils/nail/hammeringNail';
import { computeScore, shareScore } from '../utils/scoreManager';
import { tableConfig } from '../utils/table/tableConfig';

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
    // Init scene with objects
    const table = this.add.sprite(Math.round(window.innerWidth / 2), window.innerHeight - 86, 'tableSpritesheet');
    const nail = this.add.sprite(table.x, table.y - 111, 'nail').setInteractive();
    const hammer = this.add.image(nail.x - 260, nail.y - 300, 'hammer');
    table.setDepth(1);
    this.anims.create(tableConfig);

    // Top information board
    const retroStyle = { fontFamily: 'RetroGaming', fontSize: '20px' };
    let score = 0;
    let hits = 0;
    const hitElem = this.add.text(50, 100, `HITS: ${hits}`, retroStyle);
    const scoreElem = this.add.text(50, 120, `SCORE: ${score}`, retroStyle);
    const stateElem = this.add.text(50, 140, `READY?`, retroStyle);

    const moveHammer = ratio => {
      const { angle, x, y } = getHammerPosition(1 - ratio);
      hammer.angle = angle;
      hammer.x = nail.x + x;
      hammer.y = nail.y + y - 5;
    };

    const prepareNewHit = async (gameState, initialRatio) => {
      hits++;
      score += computeScore(gameState, initialRatio);
      hitElem.setText(`HITS: ${hits}`);
      scoreElem.setText(`SCORE: ${score}`);
      stateElem.setText(`${gameState}`);
      moveHammer(0); // Follow the nail

      if (gameState === GAME_STATE.WON) {
        await shareScore(score);
      }
    };

    const animateHammer = ratio => {
      const initialRatio = ratio;

      const intervalId = setInterval(async () => {
        if (ratio > 0) {
          ratio -= 0.02 * Math.abs(Math.max((initialRatio - ratio) * 50, 1));
          moveHammer(ratio);
        } else {
          clearInterval(intervalId);
          const gameState = hammeringNail(nail, table, initialRatio);
          await prepareNewHit(gameState, initialRatio);
        }
      }, 1000 / 60);
    };

    catchHammer(hammer);
    handleDraggingHammer(hammer, this, moveHammer, animateHammer, hammeringNail, nail, table, prepareNewHit);
    moveHammer(0);
  }
}
