import {Car} from "./car";
import {Cell, Direction, Type} from "./cell";

export const rules = {
    classic: (cell, nextcell) => {
	
		// Car will drive off the road and die
		if (nextcell == null) {
			cell.car = null;
			return cell;
		} 
		
		// Check if the next cell is occupied
        if (cell.car && nextcell.car == null) {
			nextcell.car = cell.car;
			cell.car = null;
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