import React from 'react';

export const Grid = (props) => {
    const GridStyles = {
        display: 'grid',
        gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
        ...props.style,
        gridRowGap: 0,
        gridColumnGap: 0,
    }
    const { rows, cols } = props;
    return (
        <div className='grid' style={GridStyles}>
            {
                React.Children.map(props.children, (row, id) => React.cloneElement(row, { id: id + 1, rows: rows + 1, cols: cols + 1 }))
            }
        </div>
    );
}