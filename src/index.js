import 'phaser';
import config from './config';
import GameScene from './scenes/GameScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}

let gameSave;
const button = document.querySelector('.lanch-game');
if (button) {
  button.addEventListener('click', () => {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.menu-game').style.display = 'block';
    gameSave = new Game();
  });
}

const backButton = document.querySelector('.back-button');
if (backButton) {
  backButton.addEventListener('click', () => {
    document.querySelector('.menu-game').style.display = 'none';
    document.querySelector('.menu').style.display = 'block';
    gameSave.destroy('Game');
  });
}

const relunchButton = document.querySelector('.relunch-button');
if (relunchButton) {
  relunchButton.addEventListener('click', () => {
    gameSave.destroy('Game');
    gameSave = new Game();
  });
}

const saveButton = document.querySelector('.save-button');
if (saveButton) {
  saveButton.addEventListener('click', () => {
    FBInstant
    .getLeaderboardAsync('score-test-1')
    .then(leaderboard => {
      return leaderboard.setScoreAsync(Math.floor(Math.random() * 100));
    })
    .then(() => console.log('Score saved'))
    .catch(error => console.error(error));

    FBInstant.updateAsync({
      action: 'LEADERBOARD',
      name: 'score-test-1'
    })
      .then(() => console.log('Update Posted'))
      .catch(error => console.error(error));
  });
}

FBInstant.initializeAsync()
  .then(FBInstant.startGameAsync)
  .catch(error => console.error(error));
