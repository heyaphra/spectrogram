import React from 'react';
import { Button } from 'antd';

export const PlaybackCtrl = (props) => {
    return (
        <Button
            {...props}
            size='small'
            shape='circle'
            icon={props.playing ? 'pause-circle' : 'play-circle'}
            onClick={props.handlePlayback}
        />
    )
}