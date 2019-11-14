import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import DirectionOfRotationEnum from './DirectionOfRotationEnum';
import {
  POSITIVE_ANGLE_LIMIT,
  NEGATIVE_ANGLE_LIMIT,
  ANGLE_ROTATION_STEP
} from './hammer-settings';

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
    this.directionOfRotation = DirectionOfRotationEnum.POSITIVE;
    this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});

    // const nail = this.add.image(0, 0, 'nail');
    this.nail = this.add.sprite(Math.round(window.innerWidth / 2), window.innerHeight, 'nail');
    this.hammer = this.add.image(this.nail.x - 260, this.nail.y - 300, 'hammer');

    // Not effective @joss
    // nail.anchor.setTo(0.5);
    // nail.reset(Math.round(window.innerWidth / 2), window.innerHeight - nail.height);

    this.nailOriginX = 0.5;
    this.nailOriginY = 0.5;
    // will be dynamic @eliam
    let velocity = 0.05;
    // Use the right event @eliam
    const clickHandler = (gameObject, velocity) => {
      if(this.nailOriginY <= 0.15) {
        this.nail.off('clicked', clickHandler);
      } else {
        this.nailOriginY -= velocity;
        this.nailOriginY = Math.round(this.nailOriginY * 100) / 100;
        console.log(this.nailOriginY)
        this.nail.setOrigin(this.nailOriginX, this.nailOriginY);
      }
    }

    this.nail.setInteractive();
    this.nail.on('clicked', clickHandler, this);
    this.input.on('gameobjectup',  (pointer, gameObject) =>
    {
      gameObject.emit('clicked', gameObject, velocity);
    }, this);
  }

  update() {
    let deltaAngle = 0;

    if (this.directionOfRotation === DirectionOfRotationEnum.POSITIVE) {
      if (this.hammer.angle < POSITIVE_ANGLE_LIMIT) {
        deltaAngle = ANGLE_ROTATION_STEP;
      } else {
        this.directionOfRotation = DirectionOfRotationEnum.NEGATIVE;
      }
    } else {
      if (this.hammer.angle > NEGATIVE_ANGLE_LIMIT) {
        deltaAngle = -ANGLE_ROTATION_STEP;
      } else {
        this.directionOfRotation = DirectionOfRotationEnum.POSITIVE;
      }
    }
    this.hammer.angle += deltaAngle * 1.5;

    const rotationCenter = {
      x: this.nail.x - 230,
      y: this.nail.y - Math.round(this.nail.height / 2)
    };
    Phaser.Actions.RotateAround([this.hammer], rotationCenter, deltaAngle / 180 * Math.PI);
    this.graphics.fillStyle(0xff00ff);
    this.graphics.fillRect(rotationCenter.x - 1, rotationCenter.y - 1, 2, 2);
  }
}
