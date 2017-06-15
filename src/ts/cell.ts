import {Car} from './car';
import {TrafficLight} from "./trafficlight";

//Cell is road or not
export enum Type {
    ROAD, EARTH
}

//if it's road it has direction
export enum Direction {
    UP, RIGHT, LEFT, DOWN
}

export class Cell {
    car: Car; // this is basically content of the cell
	trafficLight: TrafficLight;
	
    direction: Direction; //direction of road
    type: Type; //type of the cell
    speedLimit: number; // speed limit by default in our city, cars don't drive faster than that even if technically car allows that.

    //coordinates
    x: number;
    y: number;

    constructor(x, y, type = Type.EARTH, car = null, trafficLight = null, speedLimit = 60) {
        this.type = type;
        this.car = car;
        this.x = x;
        this.y = y;
		this.trafficLight = trafficLight;
		this.speedLimit = speedLimit;
    }
    copy() {
        let cell = new Cell(this.x, this.y, this.type, this.car);
        let car = this.car == null ? null : this.car.copy();
        return Object.assign(cell, this, {car: car})
    }
}