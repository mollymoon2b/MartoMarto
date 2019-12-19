import { greenTint } from '../constants/tintColors';
import { retroStyle, retroStyleBig } from '../constants/styles';

export default class WinGameScene extends Phaser.Scene {
  create (scores)
  {
    const centerX = Math.round(window.innerWidth / 2);
    const centerY = Math.round(window.innerHeight / 2) - 50;

    const title = this.add.text(centerX - 100, centerY, `YOU WIN!`, retroStyleBig);
    title.setTint(greenTint);
    this.add.text(centerX - 50, centerY + 50, `HITS: ${scores.hits}`, retroStyle);
    this.add.text(centerX - 90, centerY + 70, `SCORE: ${scores.score}`, retroStyle);
  }
}

