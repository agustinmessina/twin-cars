const colors = {
    RED: [255, 0, 0],
    WHITE: [255, 255, 255]
}

class Car {

    constructor(leftKey, rightKey, w, movimiento) {
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.x = width / 2;
        this.y = height / 2;
        this.w = w;
        this.movimiento = movimiento;
        this.color = colors.WHITE;
    }

    show() {
        fill(this.color);
        rect(this.x, this.y, this.w, this.w / 3 * 2);
    }

    move(keyPressed) {
        if (keyPressed === this.leftKey) {
            this.x -= this.movimiento;
        } else if (keyPressed === this.rightKey) {
            this.x += this.movimiento;
        }
    }

    updateColor(x1, x2) {
        let carX1 = this.x;
        let carX2 = this.x + this.w;

        if (carX1 >= x1 && carX2 <= x2) {
            this.color = colors.WHITE;
        } else {
            this.color = colors.RED;
        }

    }

}