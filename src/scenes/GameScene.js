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
    let score = 0;
    let hits = 0;
    const hitElem = this.add.text(50, 100, `HITS: ${hits}`, { fontFamily: 'RetroGaming', fontSize: '20px' });
    const scoreElem = this.add.text(50, 120, `SCORE: ${score}`, { fontFamily: 'RetroGaming', fontSize: '20px' });
    const stateElem = this.add.text(50, 140, `CONTINUE`, { fontFamily: 'RetroGaming', fontSize: '20px' });

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

    const configBreakTable = {
      key: 'breakTable',
      frames: [
        { key: 'tableSpritesheet', frame: 'final-animation0001.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0002.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0003.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0004.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0005.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0006.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0007.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0008.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0009.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0010.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0011.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0012.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0013.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0014.png' },
        { key: 'tableSpritesheet', frame: 'final-animation0015.png' },
      ],
      frameRate: 60, // frame rate – the speed of the animation. Higher is faster.
    };

    this.anims.create(configBreakTable);
  }
}
