import React from 'react';

export const GridItem = (props) => {
    const GridItemStyles = {
        ...props.rowStart ? { gridRowStart: props.rowStart } : { gridRowStart: props.id },
        ...props.rowEnd ? { gridRowEnd: props.rowEnd + 1 } : null,
        ...props.colStart ? { gridColumnStart: props.colStart } : { gridColumnStart: 1 },
        ...props.colEnd ? { gridColumnEnd: props.colEnd + 1 } : { gridColumnEnd: props.cols },
    }
    console.log('Col config: ', GridItemStyles)
    return (
        <div style={GridItemStyles}>
            {props.children}
        </div>
    );
}