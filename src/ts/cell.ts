import {Being} from './being';
enum Gender {
    MALE, FEMALE
}
export class Cell {
    being: Being;
    age: number;
    gender: Gender;
    constructor(being = null) {
        this.being = being;
    }
}