import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Preview} from './preview';
import {Car} from './car';
import {Cell, Direction, Type} from "./cell";
import {rules as Rules} from "./rules";
import {Editor} from "./editor";
import {TrafficLight} from "./trafficlight";

enum FieldType {
    INFINITE, FINITE
}

class Life extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const width = this.props.width;
        const height = this.props.height;
        this.state = {
            interval: false,
            settings: {
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
            },
            intervalCounter: 4 * 10,
            stepCounter: 0
        };
        this.state.field = this.initField(width, height);
        this.results = [];
        this.results[10] = [[], [], [], []];
    }
    setRunner = (speed = this.state.settings.speed) => {
        console.log(speed);
        this.setState({
            interval: setInterval(this.step, speed)
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
                field[i][j] = new Cell(j, i, Type.EARTH, (Math.random() < this.state.settings.density) ? new Car() : null);
            }
        }
        return field;
    };
    onClick = (pos, button) => {
        console.log(pos);
        const y = pos.y;
        const x = pos.x;
        let field = this.state.field;
        const settings = this.state.settings;
        //field[y][x].car = (field[y][x].car != null) ? null : new Car();
        if (button === 1) { //left button click
            field[y][x].type = (field[y][x].type === Type.ROAD) ? Type.EARTH : Type.ROAD;
            field[y][x].direction = settings.direction;
        } else if (button === 3) { //right button
            field[y][x].car = (field[y][x].car == null) ? Object.assign(new Car(), settings.car) : null;
        } else if (button === 2) {
			field[y][x].trafficLight = (field[y][x].trafficLight == null) ? Object.assign(new TrafficLight(), settings.trafficLight) : null;
		}

        this.setState({
            field: field
        });
    };
    runGame = (evt) => {
        console.log(1);
        if (this.state.interval === false) {
            this.setRunner(this.state.settings.speed);
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
        const rules = Rules.classic;

        const nextField = this.state.field.map(row => row.map(cell => cell.copy()));

        const stepCounter = this.state.stepCounter;
        const intervalCounter = this.state.intervalCounter;

        // set streetlight configuration
        nextField[9][26].trafficLight.redDuration = intervalCounter;
        nextField[7][27].trafficLight.redDuration = intervalCounter;
        nextField[8][29].trafficLight.redDuration = intervalCounter;
        nextField[10][28].trafficLight.redDuration = intervalCounter;
        nextField[9][26].trafficLight.greenDuration = intervalCounter;
        nextField[7][27].trafficLight.greenDuration = intervalCounter;
        nextField[8][29].trafficLight.greenDuration = intervalCounter;
        nextField[10][28].trafficLight.greenDuration = intervalCounter;

        field.map((row, rowIndex) => {
            return row.forEach((cell, columnIndex) => {
                rules(field, nextField, cell, this.getNextCell(cell, rowIndex, columnIndex));
            });
        });
        if (stepCounter == 4 * 120)  {
            this.removeRunner();
            this.load();
            this.results[(intervalCounter+20)/4] = [[], [], [], []];
            this.setState({stepCounter:0, intervalCounter: intervalCounter + 20});
            console.log('new interval', intervalCounter/4, this.results.map((el) => el[0].length + el[1].length + el[2].length + el[3].length))

            //check cars
            if (intervalCounter >= 60 * 4) {
                this.removeRunner();
                console.log(JSON.stringify(this.results.map((el) => el[0].length + el[1].length + el[2].length + el[3].length)));
             else {
                    setTimeout(() => this.setRunner(), 150);}
            }
        } else {
            this.setState({stepCounter: stepCounter + 1});
            if (nextField[7][28].car != null) {
                const lastIndex = this.results[intervalCounter/4][0].length -1;
                const color = nextField[7][28].car.color;
                if ( this.results[intervalCounter/4][0][lastIndex] != color) {
                    this.results[intervalCounter/4][0].push(color);
                }
            }
            if (nextField[8][26].car != null) {
                const lastIndex = this.results[intervalCounter/4][1].length -1;
                const color = nextField[8][26].car.color;
                if ( this.results[intervalCounter/4][1][lastIndex] != color) {
                    this.results[intervalCounter/4][1].push(color);
                }
            }
            if (nextField[10][27].car != null) {
                const lastIndex = this.results[intervalCounter/4][2].length -1;
                const color = nextField[10][27].car.color;
                if ( this.results[intervalCounter/4][2][lastIndex] != color) {
                    this.results[intervalCounter/4][2].push(color);
                }
            }
            if (nextField[9][29].car != null) {
                //console.log(intervalCounter/4, this.results[intervalCounter/4]);
                const lastIndex = this.results[intervalCounter/4][3].length -1;
                const color = nextField[9][29].car.color;
                if ( this.results[intervalCounter/4][3][lastIndex] != color) {
                    this.results[intervalCounter/4][3].push(color);
                }
            }

        }
        this.setState({
			field: nextField
		});
    };

	getNextCell(cell, i, j) {

		let nextcells = [];

		if (cell.type == Type.EARTH)
			return null;

		if (this.state.field[i][j+1].type == Type.ROAD && (this.state.field[i][j+1].direction == Direction.RIGHT || cell.direction == Direction.RIGHT))
			nextcells.push(this.state.field[i][j+1]);

		if (this.state.field[i][j-1].type == Type.ROAD && (this.state.field[i][j-1].direction == Direction.LEFT || cell.direction == Direction.LEFT))
			nextcells.push(this.state.field[i][j-1]);

		if (this.state.field[i+1][j].type == Type.ROAD && (this.state.field[i+1][j].direction == Direction.DOWN || cell.direction == Direction.DOWN))
			nextcells.push(this.state.field[i+1][j]);

		if (this.state.field[i-1][j].type == Type.ROAD && (this.state.field[i-1][j].direction == Direction.UP || cell.direction == Direction.UP))
			nextcells.push(this.state.field[i-1][j]);


		return nextcells[Math.floor(Math.random() * nextcells.length)];
	}

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

    // componentDidUpdate = (evt) => {
    //     if (this.state.interval !== false) {
    //         this.removeRunner();
    //         this.setRunner(this.state.settings.speed);
    //     }
    // };

    reset = () => {
        const width = this.props.width;
        const height = this.props.height;
        this.setState({
            field: this.initField(width, height)
        });
    };

    onUpdateSettings = (settings) => {
        console.log('settings update');
        this.setState({settings});
    };

    save = () => {
        localStorage.setItem('config', JSON.stringify(this.state.field));
    };

    restoreField(field) {
        return field.map(row => row.map(cell => {
            const newCell = Object.assign(new Cell(cell.x, cell.y), cell);
            if (cell.car != null) {
                newCell.car = Object.assign(new Car(), cell.car);
            }
            return newCell;
        }));
    }

    load = (proxy, evt, config = 'config') => {
        const field = this.restoreField(JSON.parse(localStorage.getItem('config')));
        this.setState({field});
    };

    render() {
        const field = this.state.field;
        const running = this.state.interval !== false;
        const width = this.props.width;
        const height = this.props.height;

        const controls = {
            reset: this.reset,
            run: this.runGame,
            step: this.step,
            save: this.save,
            load: this.load
        };

        return <div>
                <Editor controls={controls} running={running} update={this.onUpdateSettings}/>
                <Preview width={width} height={height} field={field} onClick={this.onClick}/>
                <table>
                    {this.results.map((el, key) => {
                        return <tr>
                            <td>{key}</td>
                            <td>{el[0].length + el[1].length + el[2].length + el[3].length}</td>
                        </tr>
                    })}
                </table>
            </div>
    }
}

ReactDOM.render(<Life width={Math.floor(innerWidth/25)} height={Math.floor(innerHeight/25-2)} />, document.querySelector("#root"));
