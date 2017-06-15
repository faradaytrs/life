import {Car} from "./car";
import {Cell, Direction, Type} from "./cell";

export const rules = {
    classic: (currentField, nextField, cell, nextCell) => {
	
		if (cell.trafficLight != null) {
			cell.trafficLight.counter += 1; // 
			
			//console.log(cell.trafficLight);
			
			if (cell.trafficLight.isRed && cell.trafficLight.counter >= cell.trafficLight.redDuration) {
				cell.trafficLight.counter = 0;
				cell.trafficLight.isRed = false;
			} else if (!cell.trafficLight.isRed && cell.trafficLight.counter >= cell.trafficLight.greenDuration) {
				cell.trafficLight.counter = 0;
				cell.trafficLight.isRed = true;
			}
		}
	
		if (nextCell == null) {
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
			
			if (nextCell.car == null && nextField[nextCell.y][nextCell.x].car == null) {
			
				// The car is moving
				cell.car.counter += cell.car.speed;
				
				console.log(cell.car);
			
				if (cell.car.counter >= 100) {
					nextField[nextCell.y][nextCell.x].car = cell.car;
					nextField[cell.y][cell.x].car = null;
					
					cell.car.counter -= 100;
				}
			} else {
				// The car is not moving due to another car being in the way
				//cell.car.counter = 0;
			}	
        }
    }
};