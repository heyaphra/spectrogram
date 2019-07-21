import React from 'react';
import { Button, Tooltip } from 'antd';

export const Downloader = (props) => {
    return (
        <Tooltip title='download image'>
            <Button
                {...props}
                onClick={props.handleDownload}
                size='small'
                shape='circle'
                icon='download'
            />
        </Tooltip>
    )
}