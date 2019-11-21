let nailOrigin = { x: 0.5, y: 0.5 };
const velocity = 0.10;

const computeVelocity = (percentage) => {

  const toto = percentage > 0 ? percentage * velocity : 0;
  console.log({velocity})
  return toto;
}

const hammeringNail = (nail, percentage) => {
    if(nailOrigin.y === 0.15) {
      // win
    }

    if(nailOrigin.y < 0.15) {
      // Lose
    } else {
      nailOrigin.y -= computeVelocity(percentage);
      nailOrigin.y = Math.round(nailOrigin.y * 100) / 100;
      console.log(nailOrigin.y)
      nail.setOrigin(nailOrigin.x, nailOrigin.y);
    }


};

export { hammeringNail };


