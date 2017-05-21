import {Car} from "./car";

export const rules = {
    classic: (cell, neighbours) => {
        const being = cell.car;
        if (being && neighbours.length >= 4) {
            cell.car = null;
        }
        if (being && neighbours.length <= 1) {
            cell.car = null;
        }
        if (being === null && neighbours.length === 3) {
            cell.car = new Car(neighbours);
        }
        return cell;
    },
    aging: (cell, neighbours) => {
        const being = cell.car;
        if (being !== null) {
            cell.car.age = cell.car.age+1;
        }
        if (being && being.age > 20) {
            cell.car = null;
        }
        if (being && neighbours.length >= 4) {
            cell.car = null;
        }
        if (being && neighbours.length <= 1) {
            cell.car = null;
        }
        if (being === null && neighbours.length === 3) {
            cell.car = new Car(neighbours);
        }
        return cell;
    }
};