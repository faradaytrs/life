import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Preview} from './preview';
import {Being} from './being';
import {Cell} from "./cell";

class Life extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const width = this.props.width;
        const height = this.props.height;
        this.state = {
            field: this.initField(width, height),
            speed: 100,
            autoSave: false,
            interval: false
        };
    }
    setRunner = (speed = this.state.speed) => {
        this.setState({
            interval: setInterval(this.step, speed)
        });
    };
    removeRunner() {
        clearInterval(this.state.interval);
        this.setState({interval: false});
    }
    initField(width, height) {
        let field = [];
        for (let i=0; i<height; i++) {
            field[i] = [];
            for (let j=0; j<width; j++) {
                field[i][j] = new Cell((Math.random() < 0.1) ? new Being(): null);
            }
        }
        return field;
    }
    onClick = (pos) => {
        const y = pos.y;
        const x = pos.x;
        let field = this.state.field;
        field[y][x].being = (field[y][x].being !== null) ? null : new Being();
        this.setState({
            field: field
        });
    };
    runGame = (evt) => {
        if (this.state.interval === false) {
            this.setRunner()
        } else {
            this.removeRunner();
        }
    };
    step = () => {
        // 1. Если фишка имеет четырех или более соседей, то она умирает от перенаселенности (с этой клетки снимается фишка).
        // 2. Если фишка не имеет соседей или имеет ровно одного соседа, то она умирает от нехватки общения.
        // 3. Если клетка без фишки имеет ровно трех соседей, то в ней происходит рождение (на клетку кладется фишка).
        // 4. Если не выполнено ни одно из перечисленных выше условий, состояние клетки не изменяется.
        const field = this.state.field;
        const rules = (cell, neighbours) => {
            const being = cell.being;

            if (being && neighbours.length >= 4) {
                cell.being = null;
            }
            if (being && neighbours.length <= 1) {
                cell.being = null;
            }
            if (being === null && neighbours.length === 3) {
                cell.being = new Being(neighbours);
            }
            return cell;
        };

        this.setState({field: field.map((row, rowIndex) => {
            return row.map((cell, columnIndex) => {
                return rules(Object.assign({}, cell), this.getNeighbours(rowIndex, columnIndex));
            });
        })});
    };
    getNeighbours(i, j, field = this.state.field) {
        const rowLimit = field.length-1;
        const columnLimit = field[0].length-1;
        let neighbours = [];

        for(let x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
            for(let y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
                if(x !== i || y !== j) {
                    if (field[x][y].being !== null) {
                        neighbours.push(field[x][y]);
                    }
                }
            }
        }
        return neighbours;
    }
    updateSpeed = (evt) => {
        const speed = evt.target.value;
        this.setState({
            speed: speed
        });
        this.removeRunner();
        this.setRunner(speed);
    };
    reset = () => {
        const width = this.props.width;
        const height = this.props.height;
        if (this.state.autoSave) {
            this.save();
        }
        this.setState({
            field: this.initField(width, height)
        });
    };
    clear = () => {
        const width = this.props.width;
        const height = this.props.height;
        const field = this.state.field;
        if (this.state.autoSave) {
            this.save();
        }
        this.setState({
            field: field.map((row) => row.map((cell) => {
                cell.being = null;
                return cell;
            }))
        });
    };
    save = () => {
        localStorage.setItem('config', JSON.stringify(this.state.field));
    };
    load = (evt, config = 'config') => {
        const field = localStorage.getItem(config);
        this.setState({field: JSON.parse(field)});
    };
    autoSaveHandler = (evt) => {
        const value = evt.target.checked;
        this.setState({
            autoSave: value
        });
    };
    render() {
        const field = this.state.field;
        const running = this.state.interval !== false;
        const width = this.props.width;
        const height = this.props.height;
        const autoSave = this.state.autoSave;
        return <div>
                <button onClick={this.runGame}>{running ? 'Stop' : 'Run'}</button>
                <button onClick={this.step}>Step</button>
                <input step={100} value={this.state.speed} onChange={this.updateSpeed} type="number"/>
                <button onClick={this.clear}>Clear</button>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.save}>Save</button>
                <button onClick={this.load}>Load</button>
                <input checked={autoSave} onChange={this.autoSaveHandler} type="checkbox"/>
                <Preview width={width} height={height} field={field} onClick={this.onClick}/>
            </div>
    }
}

ReactDOM.render(<Life width={Math.floor(innerWidth/25)} height={Math.floor(innerHeight/25-2)} />, document.querySelector("#root"));
