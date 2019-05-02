let directions;

class Block {

    constructor(x, w, h, backgroundWidth, speed, difficulty, lastXPosition = undefined) {

        this.speed = speed;
        this.direction = 0;
        directions = {
          LEFT: -w / 2,
          RIGHT: w / 2,
          CENTER: 0
        };

        if (lastXPosition) this.direction = this.generateDirection(w, backgroundWidth, lastXPosition, difficulty);
        
        this.points = this.createPoints(x, 0, w, h, this.direction);
        this.central = false;

    }

    show() {
        strokeJoin(ROUND);
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

    createPoints(x, y, w, h) {
        let pointArray = [];

        pointArray.push(new Point(x, y));
        pointArray.push(new Point(x + w, y));
        pointArray.push(new Point(x + w + this.direction, y - h));
        pointArray.push(new Point(x + this.direction, y - h));

        return pointArray;
    }

    generateDirection(blockWidth, backgroundWidth, lastXPosition, difficulty) {

        let maxLeftProbability = 10;
        let maxRightProbability = 10;
        let maxCenterProbability = 13 - difficulty;
      
        const rightLimit = backgroundWidth - blockWidth * 2;
        const leftLimit = 0 + blockWidth;
        
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