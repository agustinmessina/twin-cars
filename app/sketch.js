// const blockWidth = 50;
// const blockHeight = 100;
const blockSize = {
  w : 50,
  h : 100
}

// const trackWidth = blockSize.w * 6;
// const trackHeight = blockSize.h * 3; // blockSize.w * 6

const background1 = {
  rightX: blockSize.w * 6,
  leftX: 0,
  height: blockSize.w * 6,
  width: blockSize.h * 3
}
const background2 = Object.create(background1);
background2.rightX = background1.rightX * 2;
background2.leftX = background1.rightX;

const gameSettings = {
  speed: 4,
  difficulty: 5,
  duration: 30,
  initialTime: Date.now()
}
// const difficulty = 5;
// const speed = 4;
// const gameDurationInSeconds = 30;
// const initialTime = Date.now();

let blocks1 = [];
let blocks2 = [];
let car1;
let car2;

let points = 0;
let expected = 0;
let timeEnded = false;

function setup() {
  createCanvas(background1.width * 2, background1.height);

  blocks1.push(new Block(background1.width / 2, blockSize, background1, gameSettings));
  blocks2.push(new Block(background2.width * 1.5, blockSize, background2, gameSettings));
  car1 = new Car({ left: 'A', right: 'D'}, blockSize.w / 2, blockSize.w / 8, background1);
  car2 = new Car({ left: 'Q', right: 'E'}, blockSize.w / 2, blockSize.w / 8, background2);
}

function draw() {
  background(0);

  if ((Date.now() - gameSettings.initialTime) >= (gameSettings.duration * 1000)) timeEnded = true;

  if (!timeEnded) {
    playGame(blocks1, background1, car1);
    playGame(blocks2, background2, car2);
  } else {
    pauseGame();
  }

  fill(255);
  text(Math.floor(points), 10, 20);
  text(Math.floor(expected), 50, 20);

}

function playGame(blocks, background, car) {
  
  createNewBlock(blocks, background);

  for (let i = 0; i < blocks.length; i++) {

    removeLastBlock(i, blocks, background);

    gainPointsIfCarIsInRoad(blocks[i], car);

    blocks[i].show();
    blocks[i].update();
  }

  car.show();
}

function createNewBlock(blocks, background) {
  let lastBlock = blocks[blocks.length - 1];

  if (lastBlock.points[3].y === 0) {
    blocks.push(new Block(lastBlock.points[3].x, blockSize, background, gameSettings, lastBlock.points[3].x));
  }
}

function removeLastBlock(position, blocks, background) {
  if (blocks[position].points[3].y === background.h) {
    blocks.splice(position, 1);
  }
}

function gainPointsIfCarIsInRoad(currentBlock, car) {
  currentBlock.central = false;

    if (checkCurrentBlock(currentBlock, background)) {
      currentBlock.central = true;

      let difference = currentBlock.points[0].y - background.height / 2;

      const xModifier = difference / blockSize.h * currentBlock.direction;

      const partialX1 = currentBlock.points[0].x + xModifier;
      const partialX2 = currentBlock.points[1].x + xModifier;

      car.updateColor(partialX1, partialX2);
      points += car.calculatePoints(partialX1, partialX2);
      expected += 1;
    }
}

function pauseGame() {
  for (let block of blocks) {
    block.show();
  }

  car.static = true;
  car.show();
}

function keyPressed(car) {
  if (keyCode === car.leftKey.charCodeAt(0) || keyCode === car.rightKey.charCodeAt(0)) {
    car.move(String.fromCharCode(keyCode));
  }
}

function checkCurrentBlock(block, background) {
  const max = background.height / 2 + blockSize.h;
  const min = background.height / 2;

  if (block.points[0].y > min && block.points[0].y < max) {
    return true;
  }

  return false;
}