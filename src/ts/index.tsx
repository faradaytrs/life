import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Preview} from './preview';
import {Cell} from './cell';
import {SelectModel} from "./selectModel";

class Life extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const width = this.props.width;
        const height = this.props.height;
        this.state = {
            field: this.initField(width, height),
            modelPrev: null,
            running: false,
            speed: 100
        };
    }
    initField(width, height) {
        let field = [];
        for (let i=0; i<height; i++) {
            field[i] = [];
            for (let j=0; j<width; j++) {
                field[i][j] = (Math.random() < 0.1) ? new Cell(): false;
            }
        }
        return field;
    }
    onClick = (pos) => {
        const y = pos.y;
        const x = pos.x;
        let field = this.state.field;
        field[y][x] = (field[y][x] !== false) ? false : new Cell();
        this.setState({
            field: field
        });
    };
    runGame = (evt) => {
        this.setState({
            running: !this.state.running
        })
    };
    pauseGame = () => {
        this.setState({running: false});
    };
    setModel = (model) => {
        this.setState({
            modelPrev: model
        })
    };
    step = () => {
        // 1. Если фишка имеет четырех или более соседей, то она умирает от перенаселенности (с этой клетки снимается фишка).
        // 2. Если фишка не имеет соседей или имеет ровно одного соседа, то она умирает от нехватки общения.
        // 3. Если клетка без фишки имеет ровно трех соседей, то в ней происходит рождение (на клетку кладется фишка).
        // 4. Если не выполнено ни одно из перечисленных выше условий, состояние клетки не изменяется.
        const rules = (cell, x, y) => {
            const neighbours = this.getNeighbours(x, y);

            if (cell && neighbours.length >= 4) {
                return false;
            }
            if (cell && neighbours.length <= 1) {
                return false;
            }
            if (cell === false && neighbours.length === 3) {
                return new Cell(neighbours);
            }
            return cell;
        };
        const field = this.state.field;
        this.setState({field: field.map((row, rowIndex) => {
            return row.map((cell, columnIndex) => {
                return rules(cell, rowIndex, columnIndex);
            });
        })});
    };
    componentDidUpdate = () => {
        const speed = this.state.speed;
        if (this.state.running === true) {
            setTimeout(this.step, speed)
        }
    };
    getNeighbours(i, j) {
        const field = this.state.field;
        const rowLimit = field.length-1;
        const columnLimit = field[0].length-1;
        let neighbours = [];

        for(let x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
            for(let y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
                if(x !== i || y !== j) {
                    if (field[x][y]) {
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
        })
    };
    reset = () => {
        const width = this.props.width;
        const height = this.props.height;
        this.setState({
            field: this.initField(width, height)
        })
    };
    render() {
        const field = this.state.field;
        const running = this.state.running;
        const width = this.props.width;
        const height = this.props.height;
        return <div>
                <button onClick={this.runGame}>{running ? 'Stop' : 'Run'}</button>
                <button onClick={this.step}>Step</button>
                <input step={100} value={this.state.speed} onChange={this.updateSpeed} type="number"/>
                <button onClick={this.reset}>Reset</button>
                <Preview width={width} height={height} field={field} onClick={this.onClick}/>;
            </div>
    }
}
ReactDOM.render(<Life width={50} height={30} />, document.querySelector("#root"));
