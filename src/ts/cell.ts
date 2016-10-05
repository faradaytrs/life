/**
 * Created by andrey on 10/5/16.
 */
export class Cell {
    color: number;
    constructor(color = (Math.random()*0xFFFFFF<<0)) {
        this.color = color;
    }
}