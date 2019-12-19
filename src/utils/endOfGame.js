import WinScene from '../scenes/WinScene';

const gameOver = () => {

};

const youWin = (game, scores) => {
  game.scene.sleep();
  game.scene.add('WinGameScene', WinScene, true, scores);
};

export {
  gameOver,
  youWin
};
