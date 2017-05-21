import {Cell} from "./cell";
/**
 * Created by andrey on 10/5/16.
 */
export class Car {
    color: number; // here will be a car color
    speed: number; // maximum speed that this car can drive

    constructor(parents = []) {
        this.speed = Math.floor(Math.random() * 80) + 40; //car speed is random form 80 to 120
        this.color = this.randColor();
    }
    randColor(shift = 0) {
        return Math.floor(Math.random()*0xFF) << shift
    }
}