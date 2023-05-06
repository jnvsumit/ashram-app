import React from 'react';

const FullScreenIcon = ({ width, height, color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
            <path fill={color} d="M4 4h3v2H4v3H2V4a2 2 0 0 1 2-2zm16 0a2 2 0 0 1 2 2v3h-2V4h-3V2h3a2 2 0 0 1 2 2zM4 20a2 2 0 0 1-2-2v-3h2v3h3v2H4zm16 0h-3v-2h3v-3h2v3a2 2 0 0 1-2 2z"/>
        </svg>
    );
};

export default FullScreenIcon;
