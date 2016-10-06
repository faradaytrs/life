/**
 * Created by andrey on 10/5/16.
 */
export class Cell {
    color: number;
    constructor(parents = []) {
        if (parents.length === 0) {
            this.color = this.randColor(16) + this.randColor(8) + this.randColor()
        } else {
            const sum = parents.reduce((sum, cell) => {
                return {
                    r: sum.r + ((cell.color >> 16) & 0xFF),
                    g: sum.g + ((cell.color >> 8) & 0xFF),
                    b: sum.b + (cell.color & 0xFF)
                }
            }, {r: 0, g: 0, b: 0});
            console.log(sum);
            const avg = {
                r: Math.floor(sum.r/parents.length),
                g: Math.floor(sum.g/parents.length),
                b: Math.floor(sum.b/parents.length)
            };
            this.color = (avg.r << 16) + (avg.g << 8) + avg.b;
            //console.log(this.color);
        }
    }
    randColor(shift = 0) {
        return Math.floor(Math.random()*0xFF) << shift
    }
}