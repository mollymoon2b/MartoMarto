import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import DirectionOfRotationEnum from './DirectionOfRotationEnum';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', active: false });
  }

  preload() {
    this.load.image('hammer', hammer);
    this.load.image('nail', nail);
  }

  create() {
    // WIP @pierre
    this.hammer = this.add.image(Math.round(window.innerWidth / 3), 100, 'hammer');
    this.directionOfRotation = DirectionOfRotationEnum.POSITIVE;

    // const nail = this.add.image(0, 0, 'nail');
    const nail = this.add.image(Math.round(window.innerWidth / 2), window.innerHeight, 'nail');

    // Not effective @joss
    // nail.anchor.setTo(0.5);
    // nail.reset(Math.round(window.innerWidth / 2), window.innerHeight - nail.height);
  }

  update() {
    let POSITIVE_ANGLE_LIMIT = 90;
    let NEGATIVE_ANGLE_LIMIT = -90;
    let ANGLE_ROTATION_STEP = 1;

    if (this.directionOfRotation === DirectionOfRotationEnum.POSITIVE) {
      if (this.hammer.angle < POSITIVE_ANGLE_LIMIT) {
        this.hammer.angle += ANGLE_ROTATION_STEP;
      }
      else {
        this.directionOfRotation = DirectionOfRotationEnum.NEGATIVE;
      }
    }
    else {
      if (this.hammer.angle > NEGATIVE_ANGLE_LIMIT) {
        this.hammer.angle -= ANGLE_ROTATION_STEP;
      }
      else {
        this.directionOfRotation = DirectionOfRotationEnum.POSITIVE;
      }
    }
  }
}
