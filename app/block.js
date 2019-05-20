let directions;

class Block {

    constructor(x, size, background, game, lastXPosition = undefined) {

        this.speed = game.speed;
        this.direction = 0;
        directions = {
          LEFT: -size.w / 2,
          RIGHT: size.w / 2,
          CENTER: 0
        };

        if (lastXPosition) this.direction = this.generateDirection(size, background, lastXPosition, game.difficulty);
        
        this.points = this.createPoints(x, 0, size, this.direction);
        this.central = false;

    }

    show() {
        strokeJoin(ROUND);
        stroke(255);
        fill(255);
        beginShape();

        for (let i = 0; i < this.points.length; i++) {
            vertex(this.points[i].x, this.points[i].y);
        }

        endShape(CLOSE);
    }

    update() {
        for (let point of this.points) {
            point.y += this.speed;
        }
    }

    createPoints(x, y, size) {
        let pointArray = [];

        pointArray.push(new Point(x, y));
        pointArray.push(new Point(x + size.w, y));
        pointArray.push(new Point(x + size.w + this.direction, y - size.h));
        pointArray.push(new Point(x + this.direction, y - size.h));

        return pointArray;
    }

    generateDirection(size, background, lastXPosition, difficulty) {

        let maxLeftProbability = 10;
        let maxRightProbability = 10;
        let maxCenterProbability = 13 - difficulty;
      
        const rightLimit = background.rightX - size.w * 2;
        const leftLimit = background.leftX + size.w;
        
        if (lastXPosition <= leftLimit) {
          maxLeftProbability = 0;
        } else if (lastXPosition >= rightLimit) {
          maxRightProbability = 0;
        }
      
        let leftDirectionChance = random(1, maxLeftProbability * 1000);
        let rightDirectionChance = random(1, maxRightProbability * 1000);
        let centerDirectionChance = random(1, maxCenterProbability * 1000);
      
        let resultDirection = Math.max(leftDirectionChance, rightDirectionChance, centerDirectionChance);
      
        switch (resultDirection) {
          case leftDirectionChance:
            return directions.LEFT;
          case rightDirectionChance:
            return directions.RIGHT;
          case centerDirectionChance:
            return directions.CENTER;
        }
      }

}