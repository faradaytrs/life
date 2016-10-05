import * as React from 'react';
export class Preview extends React.Component<any, any> {
    cellHeight: number;
    cellWidth: number;
    constructor(props) {
        super(props);
        this.cellHeight = 20;
        this.cellWidth = 20;
    }
    drawField(ctx: CanvasRenderingContext2D) {
        const field = this.props.field;
        field.forEach((row, i) => {
            row.map((cell, j) => {
                ctx.fillStyle = cell ? "black": "white";
                ctx.fillRect(j * this.cellWidth, i * this.cellHeight, this.cellWidth, this.cellHeight);
            });
        });
    }
    componentDidUpdate() {
        const ctx = this.refs.field.getContext('2d');
        this.drawField(ctx);
    }
    componentDidMount() {
        var field = this.refs.field;
        const ctx = field.getContext('2d');
        this.addClickHandle(field);
        this.drawField(ctx);
    }
    addClickHandle(field) {
        let lastCell;
        let isMouseDown = false;

        let clickHandle = (e) => {
            const x = Math.floor(e.layerX / this.cellHeight);
            const y = Math.floor(e.layerY / this.cellWidth);
            if (lastCell && lastCell.x == x && lastCell.y == y) {
                return;
            }
            console.log(x, y);
            this.props.onClick({x, y});
            lastCell = {x, y};
        };

        field.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            clickHandle(e);
        });
        field.addEventListener('mouseup', () => {
            isMouseDown = false;
            lastCell = null;
        });
        field.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                clickHandle(e);
            }
        });
    }
    render() {
        const width = this.props.width || 150;
        const height = this.props.height || 150;
        return <canvas width={width} height={height} ref="field">1</canvas>
    }
}
