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
    constructor(gameSettings, p5) {
        this.gameSettings = gameSettings;
        this.p5 = p5;
        this.tracks = this.setupTracks();
    }

    playGame() {
        this.p5.background(0);
        this.handleGamepad();

        for (const track of this.tracks) {
            track.road.renderRoad();
            track.car.show();
            this.gainPoints(track);
            this.p5.fill(255);
            this.p5.text(Math.floor(track.points), track.road.background.leftX + 10, 20);
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

    setupTracks() {
        const tracks = [];

        const track1 = {
            road: new Road(this.gameSettings, background1, blockSize, background1.width / 2, this.p5),
            car: new Car({ left: 'A', right: 'D' }, blockSize.w / 2, blockSize.w / 8, background1, this.p5),
            points: 0
        }
        const track2 = {
            road: new Road(this.gameSettings, background2, blockSize, background2.width * 1.5, this.p5),
            car: new Car({ left: 'J', right: 'L' }, blockSize.w / 2, blockSize.w / 8, background2, this.p5),
            points: 0
        }

        tracks.push(track1);
        tracks.push(track2);

        return tracks;
    }

    setupGame() {
        this.p5.createCanvas(background1.width * 2, background1.height);
    }

    gainPoints(track) {
        const roadCenter = track.road.getRoadCenter();
        if (!roadCenter) return;

        track.car.updateColor(roadCenter.xLeft, roadCenter.xRight);
        track.points += track.car.calculatePoints(roadCenter.xLeft, roadCenter.xRight);
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