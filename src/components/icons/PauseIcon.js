import React from 'react';

const PauseIcon = ({ width, height, color }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24">
            <path fill={color} d="M6 4h4v16H6zm8 0h4v16h-4z" />
        </svg>
    );
};

export default PauseIcon;
