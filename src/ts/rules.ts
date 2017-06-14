import {Car} from "./car";
import {Cell, Direction, Type} from "./cell";

export const rules = {
    classic: (currentField, nextField, cell, nextCell) => {
		// Car will drive off the road and die
		if (nextCell == null) {
			nextField[cell.y][cell.x].car = null;
			return;
		}
		
		// Check if the next cell is occupied
        if (cell.car && nextCell.car == null && nextField[nextCell.y][nextCell.x].car == null) {
            nextField[nextCell.y][nextCell.x].car = cell.car;
            nextField[cell.y][cell.x].car = null;
        }
    }
};