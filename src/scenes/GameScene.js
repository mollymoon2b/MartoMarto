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
    this.directionOfRotation = DirectionOfRotationEnum.POSITIVE


    // const nail = this.add.image(0, 0, 'nail');
    const nail = this.add.image(Math.round(window.innerWidth / 2), window.innerHeight, 'nail');

    // Not effective @joss
    // nail.anchor.setTo(0.5);
    // nail.reset(Math.round(window.innerWidth / 2), window.innerHeight - nail.height);
  }

  update() {
    // console.log(this.hammer.angle);
    // console.log(this.directionOfRotation);
    if (this.directionOfRotation === DirectionOfRotationEnum.POSITIVE) {
      if (this.hammer.angle < 90) {
        this.hammer.angle += 1;
      }
      if (this.hammer.angle >= 90) {
        console.log('boum +');
        this.directionOfRotation = DirectionOfRotationEnum.NEGATIVE;
      }
    }
    if (this.directionOfRotation === DirectionOfRotationEnum.NEGATIVE) {
      if (this.hammer.angle > -90) {
        this.hammer.angle -= 1;
      }
      if (this.hammer.angle <= -90) {
        console.log('boum -');
        this.directionOfRotation = DirectionOfRotationEnum.POSITIVE;
      }
    }
  }
}
