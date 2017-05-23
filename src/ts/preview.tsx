import * as React from 'react';
import {Direction, Type} from "./cell";

export class Preview extends React.Component<any, any> {
    cellHeight: number;
    cellWidth: number;
    canvas: HTMLCanvasElement;
    constructor(props) {
        super(props);
        this.cellHeight = 25;
        this.cellWidth = 25;
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
               // const color = cell.car !== null ? `#${cell.car.color.toString(16)}` : "white";
                const color = (cell.type === Type.ROAD) ? 'black' : 'white';
                const direction = cell.direction;

                //draw cell
                ctx.fillStyle = color;

                ctx.fillRect(x, y, this.cellWidth, this.cellHeight);

                //draw direction triangle
                if (cell.type === Type.ROAD) {
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    if (direction === Direction.RIGHT) {
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + this.cellWidth/3, y + this.cellHeight/2);
                        ctx.lineTo(x, y + this.cellHeight);
                    } else if (direction === Direction.DOWN) {
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + this.cellWidth/2, y+ this.cellHeight/3);
                        ctx.lineTo(x + this.cellWidth, y);
                    } else if (direction === Direction.LEFT) {
                        ctx.moveTo(x + this.cellWidth, y);
                        ctx.lineTo(x + this.cellWidth/3*2, y + this.cellHeight/2);
                        ctx.lineTo(x + this.cellWidth, y+ this.cellHeight);
                    } else if (direction === Direction.UP) {
                        ctx.moveTo(x, y + this.cellHeight);
                        ctx.lineTo(x + this.cellWidth/2, y + this.cellHeight/3*2);
                        ctx.lineTo(x + this.cellWidth, y+ this.cellHeight);
                    }
                    ctx.fill();

                    //drawing call to the cell
                    if (cell.car != null) {
                        //draw car
                        //temporary we will use rectangle
                        ctx.fillStyle = cell.car.color;
                        ctx.fillRect(x + this.cellWidth/3, y + this.cellHeight/3, this.cellWidth/3, this.cellHeight/3)
                    }
                }

            });
        });
    }
    componentDidUpdate() {
        const ctx = this.canvas.getContext('2d');
        this.drawField(ctx);
    }
    componentDidMount() {
        const field = this.canvas;
        const ctx = field.getContext('2d');
        this.drawField(ctx);
    }
    handleClick = (evt) => {
        const pos = {
            x: Math.floor(evt.nativeEvent.offsetX/this.cellWidth),
            y: Math.floor(evt.nativeEvent.offsetY/this.cellHeight)
        };
        this.props.onClick(pos, evt.nativeEvent.which);
    };
    onContextMenu = (e) => {
        e.preventDefault();
        this.handleClick(e);
    };
    render() {
        const width = this.props.width*this.cellWidth;
        const height = this.props.height*this.cellHeight;
        return <div>
            <canvas onContextMenu={this.onContextMenu} onClick={this.handleClick} width={width} height={height} ref={(canvas => this.canvas = canvas)}>1</canvas>
        </div>
    }
}
