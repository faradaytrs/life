import {Cell} from "./cell";
/**
 * Created by andrey on 10/5/16.
 */
enum Gender {
    MALE, FEMALE
}
export class Being {
    color: number;
    age: number;
    gender: Gender;
    constructor(parents = []) {
        this.color = this.mergeColor(parents);
        this.age = 0;
    }
    mergeColor(parents: Cell[]) {
        if (parents.length === 0) {
            return this.randColor(16) + this.randColor(8) + this.randColor()
        } else {
            const sum = parents.reduce((sum, cell) => {
                const being = cell.being;
                return {
                    r: sum.r + ((being.color >> 16) & 0xFF),
                    g: sum.g + ((being.color >> 8) & 0xFF),
                    b: sum.b + (being.color & 0xFF)
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