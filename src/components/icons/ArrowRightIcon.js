import React from 'react';

const ArrowRightIcon = ({ width, height, color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
            <path d="M10 17l5-5-5-5v10z" fill={color} />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    );
};

export default ArrowRightIcon;
