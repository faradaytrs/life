import {Cell} from "./cell";
/**
 * Created by andrey on 10/5/16.
 */
export class Car {
    color: string; // here will be a car color
    speed: number; // maximum speed that this car can drive

    constructor(parents = []) {
        this.speed = Math.floor(Math.random() * 80) + 40; //car speed is random form 80 to 120
        this.color = this.generateColor();
    }
    generateColor() {
        const color = this.randColor(16) + this.randColor(8) + this.randColor();
        return `#${color.toString(16)}`
    }
    randColor(shift = 0) {
        return Math.floor(Math.random()*0xFF) << shift
    }
    copy() {
        let car = new Car();
        return Object.assign(car, this);
    }
}