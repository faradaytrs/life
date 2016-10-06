import * as React from 'react';

interface PreviewP {
    field;
    width;
    height;
    modelPrev;
    onClick: Function;
}
export class Preview extends React.Component<PreviewP, any> {
    cellHeight: number;
    cellWidth: number;
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
        if (this.props.modelPrev) {
            this.drawThisField(ctx, this.props.modelPrev, true);
        }
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
                ctx.fillStyle = cell !== false ? '#' + cell.color.toString(16) : "white";
                ctx.fillRect((yBegin + j) * this.cellWidth, (xBegin + i) * this.cellHeight, this.cellWidth, this.cellHeight);
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
            <canvas width={width} height={height} ref="field">1</canvas>
            <span>{pos.y + 'x' + pos.x}</span>
        </div>
    }
}
