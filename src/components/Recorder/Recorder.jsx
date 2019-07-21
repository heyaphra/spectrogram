
import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';
import { MdMicOff } from "react-icons/md";

class Recorder extends Component {
    constructor() {
        super();
    }
    render() {
        const { props } = this;
        return (
            <React.Fragment>
                <Tooltip title='connect mic'>
                    <Button
                        disabled={props.isPlaying}
                        style={{ display: 'flex', justifyContent: 'space-evenly', }}
                        onClick={props.handleCapture}
                        size='small'
                        shape='circle'
                        icon={!props.mic ? 'audio' : null}
                    >{props.mic ? <MdMicOff /> : null}</Button>
                </Tooltip>
            </React.Fragment>
        )
    }
}

export { Recorder }