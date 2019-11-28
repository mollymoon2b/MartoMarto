const calculateRotationPercentageHammer = ({ originPosition, rotation }) => {
  const abilityToMove = originPosition.y < 300 ? originPosition.y : 300;

  let deltaPosition = originPosition.y - rotation.topPosition.y;
  if (deltaPosition > abilityToMove) {
    deltaPosition = abilityToMove;
  }
  let deltaTime = performance.now() - rotation.topTime;
  if (deltaTime < 100) {
    deltaTime = 100;
  }

  return deltaPosition / deltaTime / abilityToMove * 100;
};

export {
  calculateRotationPercentageHammer
};
