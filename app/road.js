class Road {
    constructor(gameSettings, background, blockSize, initialPosition) {

        this.gameSettings = gameSettings;
        this.background = background;
        this.blockSize = blockSize;
        this.blocks = [];

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

    setupRoad(initialPosition) {
        this.blocks.push(new Block(initialPosition, this.blockSize, this.background, this.gameSettings));
        console.log('blocks', this.blocks);
    }

    createNewBlock() {
        let lastBlock = this.blocks[this.blocks.length - 1];

        if (lastBlock.points[3].y === 0) {
            this.blocks.push(new Block(lastBlock.points[3].x, this.blockSize, this.background, this.gameSettings, lastBlock.points[3].x));
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
                return {
                    xLeft: block.points[0].x,
                    xRight: block.points[1].x
                };
            }
        }
    }
}