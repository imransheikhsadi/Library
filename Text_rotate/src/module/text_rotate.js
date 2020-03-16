class Rotate {
  constructor(element, rotator, time) {
    this.rotatorType(rotator)(element, time);
  }

  //check the roraror type ----------------------------------
  rotatorType = rotator => {
    switch (rotator) {
      case "UP_FADE":
        return this.up_fade;

      case "UP_FADE_TWO":
        return this.up_fade_two;

      case "ELASTIC":
        return this.elastic;

      case "FADE_OUT":
        return this.fade_out;

      case "COLLISION":
        return this.collision;

      default:
        console.log("No Rotator matched");
    }
  };

  //Elastric Rotate -----------------------------------------
  elastic = (element, time) => {
    this.addClass(element, "elastic_rotate-container");
    this.itarator(element, "e-r", time);
  };

  //Up Fade One Rotate -------------------------------------------
  up_fade_one = (element, time) => {
    this.addClass(element, "elastic_rotate-container");
    this.itarator(element, "u-f", time);
  };

  //Up Fade Two Rotate -------------------------------------------
  up_fade_two = (element, time) => {
    this.addClass(element, "elastic_rotate-container");
    this.itarator(element, "u-f-two", time);
  };

  //Fade Out Rotate -------------------------------------------
  fade_out = (element, time) => {
    this.addClass(element, "elastic_rotate-container");
    this.itarator(element, "f-u", time);
  };
  //Collision Rotate
  collision = (element, time) => {
    this.addClass(element, "elastic_rotate-container");
    this.itarator(element, "c-r", time);
  };

  //Itarator ---------------------------------------------

  itarator = (element, animation_name, time) => {
    let i = 0;

    let idList = [];

    document.querySelector(`.${element}`).childNodes.forEach(item => {
      if (item.id) {
        idList.push(item.id);
      }
    });
    const animate = () => {
      if (i === idList.length) {
        i = 0;
      }
      let current_text = idList[i];
      let next_text = i === idList.length - 1 ? idList[0] : idList[i + 1];

      document.getElementById(current_text).className = "";
      document.getElementById(next_text).className = "";

      document
        .getElementById(current_text)
        .classList.add(`${animation_name}_out`);

      document.getElementById(next_text).classList.add(`${animation_name}_in`);

      i++;
    };
    setInterval(animate, time);
  };

  //Utility Methods --------------------------------------

  addClass = (whereToAdd, whichClassToAdd) => {
    document.querySelector(`.${whereToAdd}`).classList.add(whichClassToAdd);
  };
}

export default Rotate;
