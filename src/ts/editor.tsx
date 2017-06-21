import * as React from "react";
import {Direction} from "./cell";

export class Editor extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            direction: Direction.RIGHT,
            speed: 100,
            density: 0.3,
            speedLimit: 60,
            car: {
                speed: 60,
                counter: 0
            },
            trafficLight: {
                greenDuration: 20,
                redDuration: 10,
                isRed: false
            }
        }
    }
    updateSpeed = (evt) => {
        const speed = evt.target.value;
        this.setState({
            speed: speed
        });
    };
    densityHandler = (evt) => {
        const value = evt.target.value;
        this.setState({density: value});
    };
    componentDidUpdate = (prevProps, prevState) => {
        //checking if something meaningful changed
        const needsUpdate = Object.keys(this.state).reduce((res, key) => {
            if (this.state[key] !== prevState[key]) {
                return true;
            }
            return res;
        }, false);
        if (needsUpdate) {
            this.props.update(Object.assign({}, this.state));
        }
    };
    onChangeDirection = (evt) => {
        console.log('newdir', evt.target.value);
        this.setState({direction: +evt.target.value});
    };
    onChangeAddMode = (evt) => {
        this.setState({add: evt.target.value})
    };
    templateSettings = () => {
        const speedLimitHander = (evt) => {
            this.setState({speedLimit: evt.target.value});
        };
        return <input value={this.state.speedLimit} onChange={speedLimitHander} type="number"/>;
    };

    updateNestedProperty = (module, property, evt) => {
        const value = evt.target.value;
        console.warn('new value', module, property, value);
        let patch = {};
        const newModule = Object.assign({}, this.state[module]);
        newModule[property] = value;
        patch[module] = newModule;
        this.setState(patch);
    }

    renderTrafficLightSettings() {
        return [
            'TrafficLight',
            <input value={this.state.trafficLight.redDuration} onChange={this.updateNestedProperty.bind(this, 'trafficLight', 'redDuration')} type="number" />;
            <input value={this.state.trafficLight.greenDuration} onChange={this.updateNestedProperty.bind(this, 'trafficLight', 'greenDuration')} type="number" />;
            <input value={this.state.trafficLight.isRed} onChange={this.updateNestedProperty.bind(this, 'trafficLight', 'isRed')} type="checkbox" />;
        ];
    }

    renderCarLightSettings() {
        return [
            'Car',
            <input value={this.state.car.speed} onChange={this.updateNestedProperty.bind(this, 'car', 'speed')} type="number" />;
            <input value={this.state.car.counter} onChange={this.updateNestedProperty.bind(this, 'car', 'counter')} type="number" />;
        ];
    }

    render() {
        const directions = {
            'right': Direction.RIGHT,
            'down': Direction.DOWN,
            'left': Direction.LEFT,
            'up': Direction.UP
        };

        return <div>
            {/*{Object.keys(this.props.controls).map(key => <button onClick={this.props.controls[key]}>{key}</button>)}*/}
            <button onClick={this.props.controls.run}>{this.props.running ? 'Stop' : 'Run'}</button>
            <button onClick={this.props.controls.step}>Step</button>
            <button onClick={this.props.controls.reset}>Reset</button>
            <button onClick={this.props.controls.save}>Save</button>
            <button onClick={this.props.controls.load}>Load</button>
            <input step={100} value={this.state.speed} onChange={this.updateSpeed} placeholder="Speed" type="number"/>
            <select value={this.state.direction} onChange={this.onChangeDirection} name="direction" id="direction">
                {Object.keys(directions).map(name => <option key={directions[name]} value={directions[name]}>{name}</option>)}
            </select>
            {this.templateSettings()}
            {this.renderTrafficLightSettings()}
            {this.renderCarLightSettings()}
        </div>;
    }
}
