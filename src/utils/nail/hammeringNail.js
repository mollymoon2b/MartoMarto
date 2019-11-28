const velocity = 20;

const computeVelocity = (percentage) => percentage > 0 ? Math.round(percentage * velocity) : 0;


const hammeringNail = (nail, percentage) => {
  const hiddenNail = (nail.height/2) - 8;
  const maxBottomNailHeight = window.innerHeight + hiddenNail;
  const nailHeight = nail.y + computeVelocity(percentage);

    if(nailHeight === maxBottomNailHeight) {
      // win
    }

    if(nailHeight > maxBottomNailHeight) {
      // Lose
    } else {


      nail.setPosition(nail.x, nailHeight);
    }
};

export { hammeringNail };


