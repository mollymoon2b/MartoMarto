import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', active: false });
  }

  preload() {
    this.load.image('hammer', hammer);
    this.load.image('nail', nail);
  }

  create() {
    this.add.image(0, 0, 'hammer');
    const nail = this.add.image(0, 0, 'nail');
    nail.anchor.setTo(0.5);
    // nail.reset(Math.round(window.innerWidth / 2), window.innerHeight - nail.height);
  }
}
