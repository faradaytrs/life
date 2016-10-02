import * as React from 'react';
export class Preview extends React.Component<any, any> {
    cellHeight: number
    cellWidth: number
    constructor(props) {
        super(props);
        this.cellHeight = 20;
        this.cellWidth = 20;
    }
    drawField(ctx) {
        const field = this.props.field;
        field.forEach((row, i) => {
            row.map((cell, j) => {
                ctx.fillStyle = cell ? "black": "white";
                ctx.fillRect(j*this.cellWidth, i*this.cellHeight, this.cellWidth, this.cellHeight);
            });
        });
    }
    componentDidMount() {
        const ctx = this.refs.field.getContext('2d');
        this.drawField(ctx);
    }
    render() {
        const width = this.props.width || 150;
        const height = this.props.height || 150;
        return <canvas width={width} height={height} ref="field">1</canvas>
    }
}
