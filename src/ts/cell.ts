/**
 * Created by andrey on 10/5/16.
 */
export class Cell {
    color: number;
    constructor(parents = []) {
        if (parents.length === 0) {
            this.color = Math.random()*0xFFFFFF<<0;
        } else {
            //Rework!!
            this.color = Math.floor(parents.reduce((sum, cell) => {
                return sum + cell.color;
            }, 0) / parents.length);
        }
    }
}