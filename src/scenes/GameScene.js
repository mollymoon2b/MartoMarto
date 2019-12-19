import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import tableSpritesheet from '../assets/table.png';
import hammerSound from '../assets/hammer.mp3';
import tableSpritesheetJson from '../assets/table.json';
import tableBreakSound from '../assets/tableBreak.mp3';
import { getHammerPosition } from '../utils/getHammerPosition';
import { catchHammer } from '../utils/hammer-input/catchHammer';
import { handleDraggingHammer, disableDraggingHammer } from '../utils/hammer-input/handleDraggingHammer';
import { GAME_STATE, hammeringNail } from '../utils/nail/hammeringNail';
import { randomize } from '../utils/randomize';
import { computeScore, shareScore } from '../utils/scoreManager';
import { tableConfig } from '../utils/table/tableConfig';
import { youWin, gameOver } from '../utils/endOfGame';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', active: false });
  }

  preload() {
    this.load.image('hammer', hammer);
    this.load.image('nail', nail);
    this.load.atlas('tableSpritesheet', tableSpritesheet, tableSpritesheetJson);
    this.load.audio('hammerSound', hammerSound, { instances: 1 });
    this.load.audio('tableBreakSound', tableBreakSound, { instances: 1 });
  }

  create() {
    // Init scene with objects
    const table = this.add.sprite(Math.round(window.innerWidth / 2), window.innerHeight - 86, 'tableSpritesheet');
    const nail = this.add.sprite(table.x, table.y - 111, 'nail').setInteractive();
    const hammer = this.add.image(nail.x - 260, nail.y - 300, 'hammer');
    table.setDepth(1);
    this.anims.create(tableConfig);
    this.sound.add('hammerSound');
    this.sound.add('tableBreakSound');

    // Top information board
    const retroStyle = { fontFamily: 'RetroGaming', fontSize: '20px' };
    let gameState = GAME_STATE.CONTINUE;
    let score = 0;
    let hits = 0;
    const hitElem = this.add.text(50, 100, `HITS: ${hits}`, retroStyle);
    const scoreElem = this.add.text(50, 120, `SCORE: ${score}`, retroStyle);
    const stateElem = this.add.text(50, 140, `READY?`, retroStyle);

    const moveHammer = ratio => {
      const { angle, x, y } = getHammerPosition(1 - ratio);
      hammer.angle = angle;
      hammer.x = nail.x + x;
      hammer.y = nail.y + y + 14;
    };

    const prepareNewHit = async (initialRatio) => {
      if (gameState !== GAME_STATE.CONTINUE) {
        return;
      }

      gameState = hammeringNail(nail, table, initialRatio);

      switch (gameState) {
        case GAME_STATE.CONTINUE:
          this.sound.play('hammerSound');
          break;
        case GAME_STATE.LOST:
          this.sound.play('tableBreakSound');
      }

      hits++;
      score += computeScore(gameState, initialRatio);
      hitElem.setText(`HITS: ${hits}`);
      scoreElem.setText(`SCORE: ${score}`);
      stateElem.setText(`${gameState}`);
      moveHammer(0); // Follow the nail

      switch(gameState) {
        case GAME_STATE.WON:
          disableDraggingHammer(this, hammer);
          youWin(); // todo message and something else
          await shareScore(score);
          break;
        case GAME_STATE.LOST:
          disableDraggingHammer(this, hammer);
          gameOver(); // todo message end of game you are a looser
          break;
      }

    };

    const animateHammer = ratio => {
      ratio = randomize(ratio);
      const initialRatio = ratio;

      const intervalId = setInterval(async () => {
        if (ratio > 0) {
          ratio -= 0.02 * Math.abs(Math.max((initialRatio - ratio) * 50, 1));
          moveHammer(ratio);
        } else {
          clearInterval(intervalId);
          await prepareNewHit(initialRatio);
        }
      }, 1000 / 60);
    };

    catchHammer(hammer);
    handleDraggingHammer(hammer, this, moveHammer, animateHammer, prepareNewHit);
    moveHammer(0);
  }
}
