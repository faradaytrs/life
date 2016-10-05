/**
 * Created by andrey on 10/5/16.
 */
export class Cell {
    color: string;
    constructor() {
        this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }
}