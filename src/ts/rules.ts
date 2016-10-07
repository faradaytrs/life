import {Being} from "./being";

export class Rules {
    static classic = (cell, neighbours) => {
        const being = cell.being;

        if (being && neighbours.length >= 4) {
            cell.being = null;
        }
        if (being && neighbours.length <= 1) {
            cell.being = null;
        }
        if (being === null && neighbours.length === 3) {
            cell.being = new Being(neighbours);
        }
        return cell;
    };
}