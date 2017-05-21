import {Cell} from "./cell";
/**
 * Created by andrey on 10/5/16.
 */
// we will rename Car to Car
export class Car {
    color: number; // here will be a car color
    speed: number; // maximum speed that this car can drive

    constructor(parents = []) {
        this.color = this.randColor();
    }
    randColor(shift = 0) {
        return Math.floor(Math.random()*0xFF) << shift
    }
}