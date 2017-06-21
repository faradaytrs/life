export class TrafficLight {

    greenDuration: number; //How long the traffic light is to remain green
	redDuration: number; //How long the traffic light is to remain red
	counter: number;
	isRed: boolean;

    constructor(greenDuration = 20, redDuration = 10, counter = 0) {
        this.greenDuration = greenDuration;
        this.redDuration = redDuration;
		this.counter = counter;
		
		this.isRed = false;
    }
}