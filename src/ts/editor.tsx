import * as React from "react";
import {Direction} from "./cell";

export enum EditorMode {
    NEW, EDIT
}

export enum Add {
    ROAD, CAR
}

export class Editor extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            direction: Direction.RIGHT,
            speed: 100,
            density: 0.3,
            mode: EditorMode.NEW,
            add: Add.ROAD
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
    newMode = () => {
        const addModes = {
            'road': Add.ROAD,
            'car': Add.CAR
        };
        return <div>
            <select value={this.state.add} onChange={this.onChangeAddMode} name="cellType" id="cellType">
                {Object.keys(addModes).map(key => <option key={key} value={addModes[key]}>{key}</option>)}
            </select>
        </div>;
    };
    editMode = () => {
        return <div>
            edit
        </div>;
    };
    changeMode = (evt) => {
        this.setState({mode: evt.target.value});
    }
    render() {
        const directions = {
            'right': Direction.RIGHT,
            'down': Direction.DOWN,
            'left': Direction.LEFT,
            'up': Direction.UP
        };
        const modes = {};
        modes[EditorMode.NEW] = {
            name: 'new',
            render: this.newMode
        };
        modes[EditorMode.EDIT] =  {
            name: 'edit',
            render: this.editMode
        };

        return <div>
            <button onClick={this.props.controls.runGame}>{this.props.running ? 'Stop' : 'Run'}</button>
            <button onClick={this.props.controls.step}>Step</button>
            <button onClick={this.props.controls.reset}>Reset</button>
            <input step={100} value={this.state.speed} onChange={this.updateSpeed} placeholder="Speed" type="number"/>
            <select name="mode" id="mode" value={this.state.mode} onChange={this.changeMode}>
                {Object.keys(modes).map(key => <option key={key} value={key}>{modes[key].name}</option>)}
            </select>
            <select value={this.state.direction} onChange={this.onChangeDirection} name="direction" id="direction">
                {Object.keys(directions).map(name => <option key={directions[name]} value={directions[name]}>{name}</option>)}
            </select>
            {modes[this.state.mode].render()}
        </div>;
    }
}