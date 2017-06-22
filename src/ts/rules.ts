import {Car} from "./car";
import {Cell, Direction, Type} from "./cell";

export const rules = {
    classic: (currentField, nextField, cell, cellAhead) => {

    	const newCell = nextField[cell.y][cell.x];
	
		if (cell.trafficLight != null) {
			newCell.trafficLight.counter = cell.trafficLight.counter + 1; //
			
			//console.log(cell.trafficLight);
			
			if (cell.trafficLight.isRed && cell.trafficLight.counter >= cell.trafficLight.redDuration) {
				newCell.trafficLight.counter = 0;
				newCell.trafficLight.isRed = false;
			} else if (!cell.trafficLight.isRed && cell.trafficLight.counter >= cell.trafficLight.greenDuration) {
				newCell.trafficLight.counter = 0;
				newCell.trafficLight.isRed = true;
			}
		}
	
		if (cellAhead == null) {
			//nextField[cell.y][cell.x].car = null;
			return;
		}
		
		// Check if traffic light is red
		if (cell.trafficLight != null) {
			if (cell.trafficLight.isRed)
				return;
		}
		
		
		
		// Check if there's a car on this cell
        if (cell.car) {
		
			if (cellAhead.car == null && nextField[cellAhead.y][cellAhead.x].car == null) {
			
				// The car is moving
				newCell.car.counter += Math.min(cell.car.speed, cell.speedLimit);
				
				//console.log(cell.car);
			
				if (newCell.car.counter >= 64) {
					nextField[cellAhead.y][cellAhead.x].car = cell.car;
					nextField[cell.y][cell.x].car = null;

					nextField[cellAhead.y][cellAhead.x].car.counter -= 64;
				}
			} else {
				// The car is not moving due to another car being in the way
				cell.car.counter = 0;
			}
        }
    }
};