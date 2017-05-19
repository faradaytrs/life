import {Being} from './being';

//Cell is road or not
enum Type {
    ROAD, EARTH
}

//if it's road it has direction
enum Direction {
    TOP, RIGHT, LEFT, BOTTOM
}

export class Cell {
    being: Being; // this is basically content of the cell

    direction: Direction; //direction of road
    type: Type; //type of the cell
    speedLimit: 60; // speed limit by default in our city, cars don't drive faster than that even if technically car allows that.

    constructor(being = null) {
        this.being = being;
    }
}