import React from 'react';
import styled from 'styled-components';

const CrossIconWrapper = styled.svg`
    width: 24px;
    height: 24px;
    fill: #e74c3c;
    cursor: pointer;
    transition: fill 0.2s;
    
    &:hover {
        fill: #c0392b;
    }
`;

const CrossIcon = ({ onClick, ...rest }) => (
    <CrossIconWrapper
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        {...rest}
    >
        <path d="M12 10.59l4.95-4.95 1.41 1.41L13.41 12l4.95 4.95-1.41 1.41L12 13.41l-4.95 4.95-1.41-1.41L10.59 12 5.64 7.05l1.41-1.41L12 10.59z" />
    </CrossIconWrapper>
);

export default CrossIcon;