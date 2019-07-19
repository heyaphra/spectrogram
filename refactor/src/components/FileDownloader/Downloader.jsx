import React from 'react';
import { Button, Tooltip } from 'antd';

export const Downloader = (props) => {
    return (
        <Tooltip title='download image' size='small'>
            <Button
                {...props}
                size='small'
                shape='circle'
                icon='download'
            />
        </Tooltip>
    )
}