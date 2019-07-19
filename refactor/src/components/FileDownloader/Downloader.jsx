import React from 'react';
import { Button } from 'antd';

export const Downloader = (props) => {
    return (
        <Button 
            {...props}
            size='small'
            shape='circle'
            icon='download'  
        />
    )
}