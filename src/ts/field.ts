export class Field {
    field: boolean[][]
    constructor(width, length) {
        this.field = [];
        for (let i=0; i<width; i++) {
            this.field[i] = [];
            for (let j=0; j<length; j++) {
                this.field[i][j] = Math.random() < 0.5;
            }
        }
    }
}
