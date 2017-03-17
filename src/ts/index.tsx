import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Preview} from './preview';
import {Being} from './being';
import {Cell} from "./cell";
import {rules as Rules} from "./rules";

enum FieldType {
    INFINITE, FINITE
}

class Life extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const width = this.props.width;
        const height = this.props.height;
        this.state = {
            density: 0.3,
            speed: 100,
            autoSave: false,
            interval: false,
            rules: 'classic',
            fieldType: FieldType.INFINITE
        };
        this.state.field = this.initField(width, height);
    }
    setRunner = (speed = this.state.speed) => {
        const rules = Rules[this.state.rules];
        this.setState({
            interval: setInterval(this.step.bind(this, rules), speed)
        });
    };
    removeRunner() {
        clearInterval(this.state.interval);
        this.setState({interval: false});
    }
    initField = (width, height) => {
        let field = [];
        for (let i=0; i<height; i++) {
            field[i] = [];
            for (let j=0; j<width; j++) {
                field[i][j] = new Cell((Math.random() < this.state.density) ? new Being() : null);
            }
        }
        return field;
    };
    onClick = (pos) => {
        const y = pos.y;
        const x = pos.x;
        let field = this.state.field;
        field[y][x].being = (field[y][x].being != null) ? null : new Being();
        this.setState({
            field: field
        });
    };
    runGame = (evt) => {
        if (this.state.interval === false) {
            this.setRunner();
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
        const rules = Rules[this.state.rules];

        this.setState({field: field.map((row, rowIndex) => {
            return row.map((cell, columnIndex) => {
                return rules(Object.assign({}, cell), this.getNeighbours(rowIndex, columnIndex));
            });
        })});
    };
    getNeighbours(i, j) {
        const field = this.state.field;
        const rowLimit = field.length-1;
        const columnLimit = field[0].length-1;
        const type = this.state.fieldType;

        const candidates = [
            [i-1, j-1], [i-1, j], [i-1, j+1],
            [i, j-1], [i, j+1],
            [i+1, j-1], [i+1, j], [i+1, j+1]
        ];

        return candidates.reduce((neighbours, candidate) => {
            let x = candidate[0];
            let y = candidate[1];
            if (!(type !== FieldType.INFINITE && (x < 0 || y < 0 || x > rowLimit || y > columnLimit))) {
                if (x < 0) {
                    x = rowLimit;
                }
                if (y < 0) {
                    y = columnLimit;
                }
                if (x > rowLimit) {
                    x = 0;
                }
                if (y > columnLimit) {
                    y = 0;
                }
                const cell = field[x][y];
                if (cell.being !== null) {
                    neighbours.push(cell);
                }
            }
            return neighbours;
        }, []);
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

    densityHandler = (evt) => {
        const value = evt.target.value;
        this.setState({density: value});
    };

    rulesHandler = (evt) => {
        const value = evt.target.value;
        this.setState({rules: value});
        if (this.state.interval !== false) {
            this.removeRunner();
            setTimeout(this.setRunner);
        }
    };
    fieldTypeHandler = (evt) => {
        const type = +evt.target.value;
        this.setState({fieldType: type});
    };

    render() {
        const field = this.state.field;
        const running = this.state.interval !== false;
        const width = this.props.width;
        const height = this.props.height;
        const autoSave = this.state.autoSave;
        const density = this.state.density;
        const rules = this.state.rules;
        const fieldTypes = {
            'infinite': FieldType.INFINITE,
            'finite': FieldType.FINITE
        };
        return <div>
                <button onClick={this.runGame}>{running ? 'Stop' : 'Run'}</button>
                <button onClick={this.step}>Step</button>
                <input step={100} value={this.state.speed} onChange={this.updateSpeed} placeholder="Speed" type="number"/>
                <button onClick={this.clear}>Clear</button>
                <button onClick={this.reset}>Reset</button>
                <input min={0} max={1} step={0.01} value={density} onChange={this.densityHandler} placeholder="Density" type="number"/>
                <button onClick={this.save}>Save</button>
                <button onClick={this.load}>Load</button>
                <input checked={autoSave} onChange={this.autoSaveHandler} type="checkbox"/>
                <select value={rules} onChange={this.rulesHandler} name="rules" id="rules">
                    {Object.keys(Rules).map((rule) => <option key={rule} value={rule}>{rule}</option>)}
                </select>
                <select value={this.state.fieldType} onChange={this.fieldTypeHandler} name="fieldType" id="field-type">
                    {Object.keys(fieldTypes).map((type) => <option key={type} value={fieldTypes[type]}>{type}</option>)}
                </select>
                <Preview width={width} height={height} field={field} onClick={this.onClick}/>
            </div>
    }
}

ReactDOM.render(<Life width={Math.floor(innerWidth/25)} height={Math.floor(innerHeight/25-2)} />, document.querySelector("#root"));
