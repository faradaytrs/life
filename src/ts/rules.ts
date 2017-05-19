import {Being} from "./being";

export const rules = {
    classic: (cell, neighbours) => {
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
    },
    aging: (cell, neighbours) => {
        const being = cell.being;
        if (being !== null) {
            cell.being.age = cell.being.age+1;
        }
        if (being && being.age > 20) {
            cell.being = null;
        }
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
    }
};