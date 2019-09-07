import Road from './road';
import Car from './car';

const blockSize = {
  w: 50,
  h: 100
}

const background1 = {
  rightX: blockSize.w * 6,
  leftX: 0,
  height: blockSize.h * 5,
  width: blockSize.w * 6
}
const background2 = {
  rightX: blockSize.w * 12,
  leftX: blockSize.w * 6,
  height: blockSize.h * 5,
  width: blockSize.w * 6
}

export default class Game {
  constructor(p5) {
    this.p5 = p5;
    this.gameSettings = null;
    this.tracks = null;
    this.expectedPoints = 0;
  }

  setupGame(gameSettings) {
    this.gameSettings = gameSettings;
    this.tracks = this.setupTracks();
    this.p5.createCanvas(background1.width * 2, background1.height);
  }

  setupTracks() {

    const createTrack = (background, backgroundModifier, leftKey, rightKey) => {
      return {
        road: new Road(this.gameSettings, background, blockSize, background.width * backgroundModifier, this.p5),
        car: new Car({ left: leftKey, right: rightKey }, blockSize.w / 2, blockSize.w / 8, background, this.p5),
        points: 0
      }
    }

    const tracks = [];
    tracks.push(createTrack(background1, 0.5, 'A', 'D'));
    tracks.push(createTrack(background2, 1.5, 'J', 'L'));

    return tracks;
  }

  showCountdown(number) {
    this.p5.background(0);
    this.p5.fill(255);
    this.p5.textSize(32);
    this.p5.text(number, this.p5.width / 2, this.p5.height / 2);
  }

  playGame() {
    this.p5.background(0);
    this.handleGamepad();

    for (const track of this.tracks) {
      track.road.renderRoad();
      track.car.show();
      this.gainPoints(track);
    }
  }

  pauseGame() {
    for (const track of this.tracks) {
      track.road.renderStaticRoad();
      track.car.static = true;
      track.car.show();
      this.p5.fill(255);
      this.p5.text(Math.floor(track.points), track.road.background.leftX + 10, 20);
    }
  }

  gainPoints(track) {
    const roadCenter = track.road.getRoadCenter();
    if (!roadCenter) return;

    track.car.updateColor(roadCenter.xLeft, roadCenter.xRight);
    track.points += track.car.calculatePoints(roadCenter.xLeft, roadCenter.xRight);
    this.expectedPoints++;
  }

  getGamePoints() {
    let points = 0;

    for (const track of this.tracks) {
      points += track.points;
    }

    return Math.round(points / this.expectedPoints * 1000);
  }

  handleGamepad() {
    const gamepad = navigator.getGamepads()[0];
    if (gamepad) {
      // for (let i = 0; i < gamepad.axes.length; i++) {
      //   // console.log(gamepad.axes[i]);
      //   if (abs(gamepad.axes[i]) > 0.5) {
      //     console.log(`Giro el axe ${i} con valor ${gamepad.axes[i]}`);
      //   }
      // }
      if (gamepad.axes[0] > 0.5) {
        this.tracks[0].car.move('D');
      } else if (gamepad.axes[0] < -0.5) {
        this.tracks[0].car.move('A');
      }

      if (gamepad.axes[2] > 0.5) {
        this.tracks[1].car.move('L');
      } else if (gamepad.axes[2] < -0.5) {
        this.tracks[1].car.move('J');
      }
    }
  }

  handleKeystrokes(keyCode) {
    for (const track of this.tracks) {
      const car = track.car;

      if (keyCode === car.keys.left.charCodeAt(0) && car.x > car.background.leftX) {
        car.move(String.fromCharCode(keyCode));
      } else if (keyCode === car.keys.right.charCodeAt(0) && car.x < car.background.rightX) {
        car.move(String.fromCharCode(keyCode));
      }
    }
  }
}