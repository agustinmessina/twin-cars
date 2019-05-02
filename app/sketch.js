const blockWidth = 50;
const blockHeight = 100;
const difficulty = 1;
const speed = 1;

let blocks = [];
let car;

function setup() {
  createCanvas(blockWidth * 6, blockWidth * 6);
  blocks.push(new Block(width / 2 - blockWidth / 2, blockWidth, blockHeight, width, speed, difficulty));
  car = new Car('A', 'D', blockWidth / 2, blockWidth / 8);
}

function draw() {
  background(0);
  let lastBlock = blocks[blocks.length - 1];

  if (lastBlock.points[3].y === 0) {
    blocks.push(new Block(lastBlock.points[3].x, blockWidth, blockHeight, width, speed, difficulty, lastBlock.points[3].x));
  }

  for (let i = 0; i < blocks.length; i++) {

    if (blocks[i].points[3].y === height) {
      blocks.splice(i, 1);
    }

    blocks[i].central = false;

    if (checkCentralBlock(blocks[i])) {
      blocks[i].central = true;

      let difference = blocks[i].points[0].y - height / 2;

      const xModifier = difference / blockHeight * blocks[i].direction;

      const partialX1 = blocks[i].points[0].x + xModifier;
      const partialX2 = blocks[i].points[1].x + xModifier;

      car.updateColor(partialX1, partialX2);
    }

    blocks[i].show();
    blocks[i].update();
  }

  car.show();

}

function keyPressed() {
  if (keyCode === car.leftKey.charCodeAt(0) || keyCode === car.rightKey.charCodeAt(0)) {
    car.move(String.fromCharCode(keyCode));
  }
}

function checkCentralBlock(block) {
  const max = height / 2 + blockHeight;
  const min = height / 2;

  if (block.points[0].y > min && block.points[0].y < max) {
    return true;
  }

  return false;
}