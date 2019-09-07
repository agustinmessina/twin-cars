import Block from './block';

export default class Road {
  constructor(gameSettings, background, blockSize, initialPosition, p5) {

    this.gameSettings = gameSettings;
    this.background = background;
    this.blockSize = blockSize;
    this.blocks = [];
    this.p5 = p5;

    this.setupRoad(initialPosition);
  }

  renderRoad() {
    this.createNewBlock()

    for (let i = 0; i < this.blocks.length; i++) {

      this.removeLastBlock(i);

      const currentBlock = this.blocks[i];

      currentBlock.central = this.isBlockCentral(currentBlock);

      currentBlock.show();
      currentBlock.update();
    }
  }

  renderStaticRoad() {
    for (const block of this.blocks) {
      block.show();
    }
  }

  setupRoad(initialPosition) {
    const roadLenght = Math.round((this.background.height + this.blockSize.h) / this.blockSize.h);

    for (let i = roadLenght - 1; i >= 0; i--) {
      this.blocks.push(new Block(initialPosition, this.blockSize, this.background, this.gameSettings, this.p5, undefined, this.blockSize.h * i));
    }
  }

  createNewBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1];

    if (lastBlock.points[3].y === 0) {
      this.blocks.push(new Block(lastBlock.points[3].x, this.blockSize, this.background, this.gameSettings, this.p5, lastBlock.points[3].x));
    }
  }

  removeLastBlock(position) {
    if (this.blocks[position].points[3].y === this.background.h) {
      this.blocks.splice(position, 1);
    }
  }

  isBlockCentral(block) {
    const max = this.background.height / 2 + this.blockSize.h;
    const min = this.background.height / 2;

    if (block.points[0].y > min && block.points[0].y < max) {
      return true;
    }

    return false;
  }

  getRoadCenter() {
    for (const block of this.blocks) {
      if (block.central) {
        const difference = block.points[0].y - this.background.height / 2;
        const xModifier = difference / this.blockSize.h * block.direction;

        return {
          xLeft: block.points[0].x + xModifier,
          xRight: block.points[1].x + xModifier
        };
      }
    }
  }
}