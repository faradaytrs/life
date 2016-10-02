import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Preview} from './preview';

class Life extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            field: this.initField(50, 50)
        }

        setInterval(this.step, 10);
    }
    initField(width, height) {
        let field = [];
        for (let i=0; i<width; i++) {
            field[i] = [];
            for (let j=0; j<height; j++) {
                field[i][j] = Math.random() < 0.3;
            }
        }
        return field;
    }
    step = () => {
        // 1. Если фишка имеет четырех или более соседей, то она умирает от перенаселенности (с этой клетки снимается фишка).
        // 2. Если фишка не имеет соседей или имеет ровно одного соседа, то она умирает от нехватки общения.
        // 3. Если клетка без фишки имеет ровно трех соседей, то в ней происходит рождение (на клетку кладется фишка).
        // 4. Если не выполнено ни одно из перечисленных выше условий, состояние клетки не изменяется.
        const rules = (cell, x, y) => {
            const neighbours = this.countNeighbours(x, y);
            //console.log(neighbours, cell);
            if (cell == true && neighbours > 4) {
                return false;
            }
            if (cell == true && neighbours < 1) {
                return false;
            }
            if (cell == false && neighbours === 3) {
                return true;
            }
            return cell;
        }
        const field = this.state.field;
        this.setState({field: field.map((row, rowIndex) => {
            return row.map((cell, columnIndex) => {
                return rules(cell, rowIndex, columnIndex);
            });
        })});
    };
    componentDidMount() {
        //this.step()
    }
    countNeighbours(i, j) {
        const field = this.state.field;
        const rowLimit = field.length-1;
        const columnLimit = field[0].length-1;
        let n = 0;

        for(let x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
            for(let y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
                if(x !== i || y !== j) {
                    if (field[x][y]) {
                        n++;
                    }
                }
            }
        }
        return n;
    }
    render() {
        const field = this.state.field;
        return <Preview width={1000} height={1000} field={field} />;
    }
}
ReactDOM.render(<Life />, document.querySelector("#root"));
