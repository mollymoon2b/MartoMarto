let nailOrigin = { x: 0.5, y: 0.5 };

const hammeringNail = (nail,velocity) => {


    if(nailOrigin.y === 0.15) {
      // win
    }

    if(nailOrigin.y < 0.15) {
      // Lose
    } else {
      nailOrigin.y -= velocity;
      nailOrigin.y = Math.round(nailOrigin.y * 100) / 100;
      console.log(nailOrigin.y)
      nail.setOrigin(nailOrigin.x, nailOrigin.y);
    }


};

export { hammeringNail };


