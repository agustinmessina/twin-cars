let directions;

export default class Block {

  constructor(x, size, background, game, p5, lastXPosition = undefined, y = 0) {

    this.speed = game.speed;
    this.direction = 0;
    directions = {
      LEFT: -size.w / 2,
      RIGHT: size.w / 2,
      CENTER: 0
    };
    this.p5 = p5;

    if (lastXPosition) this.direction = this.generateDirection(size, background, lastXPosition, game.difficulty);

    this.points = this.createPoints(x, y, size, this.direction);
    this.central = false;

  }

  show() {
    this.p5.strokeJoin(this.p5.ROUND);
    this.p5.stroke(255);
    this.p5.fill(255);
    this.p5.beginShape();

    for (let i = 0; i < this.points.length; i++) {
      this.p5.vertex(this.points[i].x, this.points[i].y);
    }

    this.p5.endShape(this.p5.CLOSE);
  }

  update() {
    for (let point of this.points) {
      point.y += this.speed;
    }
  }

  createPoints(x, y, size) {
    const points = [];

    points.push(new Point(x, y));
    points.push(new Point(x + size.w, y));
    points.push(new Point(x + size.w + this.direction, y - size.h));
    points.push(new Point(x + this.direction, y - size.h));

    return points;
  }

  generateDirection(size, background, lastXPosition, difficulty) {

    const maxProbabilities = this.getMaxProbabilities(size, background, lastXPosition, difficulty);
    
    const leftDirectionChance = this.p5.random(1, maxProbabilities.left);
    const rightDirectionChance = this.p5.random(1, maxProbabilities.right);
    const centerDirectionChance = this.p5.random(1, maxProbabilities.center);

    const resultDirection = Math.max(leftDirectionChance, rightDirectionChance, centerDirectionChance);

    switch (resultDirection) {
      case leftDirectionChance:
        return directions.LEFT;
      case rightDirectionChance:
        return directions.RIGHT;
      case centerDirectionChance:
        return directions.CENTER;
      default:
        console.error('Invalid direction');
    }
  }

  getMaxProbabilities(size, background, lastXPosition, difficulty) {
    const maxProbabilities = {
      left: 10000,
      right: 10000,
      center: 15000 - difficulty * 1000 
    }

    const rightLimit = background.rightX - size.w * 2;
    const leftLimit = background.leftX + size.w;

    if (lastXPosition <= leftLimit) {
      maxProbabilities.left = 0;
    } else if (lastXPosition >= rightLimit) {
      maxProbabilities.right = 0;
    }

    return maxProbabilities;
  }

}

class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}