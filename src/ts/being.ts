/**
 * Created by andrey on 10/5/16.
 */
export class Being {
    color: number;
    constructor(parents = []) {
        this.color = this.mergeColor(parents);
    }
    mergeColor(parents) {
        if (parents.length === 0) {
            return this.randColor(16) + this.randColor(8) + this.randColor()
        } else {
            const sum = parents.reduce((sum, cell) => {
                return {
                    r: sum.r + ((cell.color >> 16) & 0xFF),
                    g: sum.g + ((cell.color >> 8) & 0xFF),
                    b: sum.b + (cell.color & 0xFF)
                }
            }, {r: 0, g: 0, b: 0});
            const avg = {
                r: Math.floor(sum.r/parents.length),
                g: Math.floor(sum.g/parents.length),
                b: Math.floor(sum.b/parents.length)
            };
            return (avg.r << 16) + (avg.g << 8) + avg.b;
        }
    }
    randColor(shift = 0) {
        return Math.floor(Math.random()*0xFF) << shift
    }
}