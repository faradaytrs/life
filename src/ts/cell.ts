import {Being} from './being';

export class Cell {
    being: Being;
    constructor(being = null) {
        this.being = being;
    }
}