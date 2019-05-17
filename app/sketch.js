const blockSize = {
  w : 50,
  h : 100
}

const background1 = {
  rightX: blockSize.w * 6,
  leftX: 0,
  height: blockSize.w * 6,
  width: blockSize.h * 3
}
const background2 = {
  rightX: blockSize.w * 12,
  leftX: blockSize.w * 6,
  height: blockSize.w * 6,
  width: blockSize.h * 3
}

const gameSettings = {
  speed: 2,
  difficulty: 1,
  duration: 30,
  initialTime: Date.now()
}

const tracks = []

let points = 0;
let expected = 0;
let timeEnded = false;

function setup() {
  createCanvas(background1.width * 2, background1.height);
  setupTracks();
}

function draw() {
  background(0);

  if ((Date.now() - gameSettings.initialTime) >= (gameSettings.duration * 1000)) timeEnded = true;

  if (!timeEnded) {
    playGame();
  } else {
    pauseGame();
  }

  fill(255);
  text(Math.floor(points), 10, 20);
  text(Math.floor(expected), 50, 20);

}

function setupTracks() {
  const track1 = {
    road: new Road(gameSettings, background1, blockSize, background1.width / 2),
    car: new Car({ left: 'A', right: 'D'}, blockSize.w / 2, blockSize.w / 8, background1)
  }
  const track2 = {
    road: new Road(gameSettings, background2, blockSize, background2.width * 1.5),
    car: new Car({ left: 'J', right: 'L'}, blockSize.w / 2, blockSize.w / 8, background2)
  }
  
  tracks.push(track1);
  tracks.push(track2);
}

function playGame() {
  
  for (const track of tracks) {
    track.road.renderRoad();
    track.car.show();
  }
}

function pauseGame() {
  for (let block of blocks) {
    block.show();
  }

  car.static = true;
  car.show();
}

function keyPressed() {
  for (const track of tracks) {
    const car = track.car;
    
    if (keyCode === car.keys.left.charCodeAt(0) && car.x > car.background.leftX) {
      car.move(String.fromCharCode(keyCode));
    } else if (keyCode === car.keys.right.charCodeAt(0) && car.x < car.background.rightX) {
      car.move(String.fromCharCode(keyCode));
    }
  }

  // function gainPointsIfCarIsInRoad(currentBlock, car) {
  //   currentBlock.central = false;
  
  //     if (checkCurrentBlock(currentBlock, background)) {
  //       currentBlock.central = true;
  
  //       let difference = currentBlock.points[0].y - background.height / 2;
  
  //       const xModifier = difference / blockSize.h * currentBlock.direction;
  
  //       const partialX1 = currentBlock.points[0].x + xModifier;
  //       const partialX2 = currentBlock.points[1].x + xModifier;
  
  //       car.updateColor(partialX1, partialX2);
  //       points += car.calculatePoints(partialX1, partialX2);
  //       expected += 1;
  //     }
  // }
}