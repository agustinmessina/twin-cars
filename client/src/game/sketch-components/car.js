const colors = {
  RED: [255, 0, 0],
  WHITE: [255, 255, 255]
}

export default class Car {

  constructor(keys, w, movement, background, p5) {
    this.keys = keys;
    this.x = (background.leftX + background.rightX) / 2;
    this.y = background.height / 2;
    this.w = w;
    this.movement = movement;
    this.color = colors.WHITE;
    this.static = false;
    this.background = background;
    this.p5 = p5;
  }

  show() {
    this.p5.stroke(0);
    this.p5.fill(this.color);
    this.p5.rect(this.x, this.y, this.w, this.w / 3 * 2);
  }

  move(keyPressed) {
    if (this.static) return;

    if (keyPressed === this.keys.left && this.x > this.background.leftX) {
      this.x -= this.movement;
    } else if (keyPressed === this.keys.right && this.x < this.background.rightX) {
      this.x += this.movement;
    }
  }

  updateColor(x1, x2) {
    let carX1 = this.x;
    let carX2 = this.x + this.w;

    if (carX1 >= x1 && carX2 <= x2) {
      this.color = colors.WHITE;
    } else {
      this.color = colors.RED;
    }

  }

  calculatePoints(leftLimit, rightLimit) {
    let difference = 0;

    if (this.x < leftLimit) {
      difference = leftLimit - this.x;
    } else if ((this.x + this.w) > rightLimit) {
      difference = this.x + this.w - rightLimit;
    }

    if (difference > 0) {
      if (difference <= 15) {
        return -0.5;
      } else if (difference <= 30) {
        return -1;
      } else {
        return -1.5;
      }
    }

    return 1;
  }

}