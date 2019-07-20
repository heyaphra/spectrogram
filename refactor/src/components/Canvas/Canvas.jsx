import React, { Component } from 'react';
import getSize from './getSize';

class ResponsiveCanvas extends Component {
    constructor() {
        super();
        this.state = {
            width: 0,
            height: 0
        };
    }
    componentDidMount() {
        this.setState({ ...this.setSize() }, () => {
            window.addEventListener('resize', this.handleResize, false);
            this.ctx = this.canvas.getContext('2d');
            const { ctx, canvas } = this;
            const { width, height } = this.state;
            this.props.canvasApp.init(ctx, canvas, width, height);
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false);
    }
    handleResize = () => {
        const { ctx, canvas } = this;
        const { width, height } = this.state;
        this.setState({ ...this.setSize() }, () => {
            this.props.canvasApp.setSize(width, height)
            // Add custom events with this.props.onResize();
        });
    }
    setSize = () => {
        const parent = this.canvas.parentElement;
        if (!parent) return;
        const [width, height] = getSize(parent);
        return { width, height };
    }
    setRef = (el) => {
        if (!el) return
        const { createRef } = this.props;
        this.canvas = el;
        if (typeof canvasRef === 'function') {
            createRef(el);
        }
    };
    render() {
        const scale = window.devicePixelRatio || 1;
        const { width, height } = this.state;
        return (
            <canvas
                ref={this.setRef}
                width={width * scale}
                height={height * scale}
                style={{ width, height, ...this.props.style, border: '1px solid' }}
            />
        )
    }
}

const Canvas = (props) => {
    return (
        <ResponsiveCanvas
            style={{ ...props.style, }}
            canvasRef={el => { this.canvas = el }}
            canvasApp={props.canvasApp}
        />
    )
}


export { Canvas };