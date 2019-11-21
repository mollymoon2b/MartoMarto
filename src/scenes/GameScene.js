import 'phaser';
import hammer from '../assets/hammer.png';
import nail from '../assets/nail.png';
import { getHammerPosition } from '../utils/getHammerPosition';
import DirectionOfRotationEnum from './DirectionOfRotationEnum';
import { catchHammer } from '../utils/hammer/catchHammer';
import { handleDraggingHammer } from '../utils/hammer/handleDraggingHammer';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', active: false });
  }

  preload() {
    this.load.image('hammer', hammer);
    this.load.image('nail', nail);
  }

  create() {
    // init scene
    this.nail = this.add.sprite(Math.round(window.innerWidth / 2), window.innerHeight, 'nail');
    const hammer = this.add.image(this.nail.x - 260, this.nail.y - 300, 'hammer');

    const moveHammer = ratio => {
      const { angle, x, y } = getHammerPosition(1 - ratio);
      hammer.angle = angle;
      hammer.x = this.nail.x + x;
      hammer.y = this.nail.y + y - 5;
    }
    const animateHammer = percentage => {}

    catchHammer(hammer)
    handleDraggingHammer(hammer, this, moveHammer, animateHammer)


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
    };

    this.nail.setInteractive();
    this.nail.on('clicked', clickHandler, this);
    this.input.on('gameobjectup',  (pointer, gameObject) =>
    {
      gameObject.emit('clicked', gameObject, velocity);
    }, this);

    const { angle, x, y } = getHammerPosition(1);
    hammer.angle = angle;
    hammer.x = this.nail.x + x;
    hammer.y = this.nail.y + y - 5;
  }
}
