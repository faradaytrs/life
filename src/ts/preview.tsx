import * as React from 'react';

export class Preview extends React.Component<any, any> {
    cellHeight: number;
    cellWidth: number;
    canvas: HTMLCanvasElement;
    constructor(props) {
        super(props);
        this.cellHeight = 25;
        this.cellWidth = 25;
        this.state = {
            cursorPos: null
        }
    }
    drawField(ctx: CanvasRenderingContext2D) {
        const field = this.props.field;
        this.drawThisField(ctx, field);
    }
    // для отрисовки превью еще не установленной на доску модели
    drawThisField(ctx: CanvasRenderingContext2D, field, renderModel?) {
        let xBegin = 0;
        let yBegin = 0;

        if (renderModel) {
            const cursorPos = this.state.cursorPos;
            xBegin = cursorPos.x;
            yBegin = cursorPos.y;
        }

        field.map((row, i) => {
            row.map((cell, j) => {
                const x = (yBegin + j) * this.cellWidth;
                const y = (xBegin + i) * this.cellHeight;
                const color = cell.being !== null ? `#${cell.being.color.toString(16)}` : "white";

                ctx.fillStyle = color;
                ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
                //aging
                if (cell.being !== null) {
                    const age = Math.floor(this.cellHeight*cell.being.age/20);
                    ctx.fillStyle = 'white';
                    ctx.fillRect(x+(this.cellWidth/2-age/2), y+(this.cellWidth/2-age/2), age, age);
                }
            });
        });
    }
    componentDidUpdate() {
        const ctx = this.canvas.getContext('2d');
        this.drawField(ctx);
    }
    componentDidMount() {
        var field = this.canvas;
        const ctx = field.getContext('2d');
        this.addClickHandle(field);
        this.drawField(ctx);
    }
    addClickHandle(field) {
        let lastCell;
        let isMouseDown = false;

        let mouseMoveHandle = (e) => {
            const x = Math.floor(e.layerX / this.cellWidth);
            const y = Math.floor(e.layerY / this.cellHeight);
            if (lastCell && lastCell.x == x && lastCell.y == y) {
                return false;
            }
            const pos = {x, y};
            this.setState({
                cursorPos: pos
            });
            lastCell = pos;
            return true;
        };

        field.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseMoveHandle(e);
            this.props.onClick(this.state.cursorPos);
        });
        field.addEventListener('mouseup', () => {
            isMouseDown = false;
            lastCell = null;
        });
        field.addEventListener('mousemove', (e) => {
            let moved = mouseMoveHandle(e);
            if (moved && isMouseDown) {
                this.props.onClick(this.state.cursorPos);
            }
        });
    }
    render() {
        const width = this.props.width*this.cellWidth;
        const height = this.props.height*this.cellHeight;
        const pos = this.state.cursorPos || {};
        return <div>
            <canvas width={width} height={height} ref={(canvas => this.canvas = canvas)}>1</canvas>
            <span>{pos.y + 'x' + pos.x}</span>
        </div>
    }
}
