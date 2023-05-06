import React from 'react';

const PlayIcon = ({ width, height, color }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24">
            <path fill={color} d="M8 5v14l11-7z" />
        </svg>
    );
};

export default PlayIcon;
