import {Car} from './car';

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

    direction: Direction; //direction of road
    type: Type.EARTH; //type of the cell
    speedLimit: 60; // speed limit by default in our city, cars don't drive faster than that even if technically car allows that.

    constructor(being = null) {
        this.car = being;
    }
}