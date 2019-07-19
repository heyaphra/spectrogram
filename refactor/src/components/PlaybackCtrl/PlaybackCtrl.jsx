import React from 'react';
import { Button, Tooltip } from 'antd';

export const PlaybackCtrl = (props) => {
    return (
        <Tooltip title={props.isPlaying ? 'pause' : 'play'}>
            <Button
                {...props}
                size='small'
                shape='circle'
                icon={props.isPlaying ? 'pause-circle' : 'play-circle'}
                onClick={props.handlePlayback}
            />
        </Tooltip>
    )
}