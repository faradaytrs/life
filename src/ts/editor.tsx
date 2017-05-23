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
        return <div>
            <input value={this.state.speedLimit} onChange={speedLimitHander}  type="number"/>
        </div>;
    };

    render() {
        const directions = {
            'right': Direction.RIGHT,
            'down': Direction.DOWN,
            'left': Direction.LEFT,
            'up': Direction.UP
        };

        return <div>
            <button onClick={this.props.controls.run}>{this.props.running ? 'Stop' : 'Run'}</button>
            <button onClick={this.props.controls.step}>Step</button>
            <button onClick={this.props.controls.reset}>Reset</button>
            <input step={100} value={this.state.speed} onChange={this.updateSpeed} placeholder="Speed" type="number"/>
            <select value={this.state.direction} onChange={this.onChangeDirection} name="direction" id="direction">
                {Object.keys(directions).map(name => <option key={directions[name]} value={directions[name]}>{name}</option>)}
            </select>
            {this.templateSettings()}
        </div>;
    }
}