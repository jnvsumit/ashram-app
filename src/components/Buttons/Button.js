import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ size }) => size || '16px'};
  border-radius: ${({ corners }) => corners || '4px'};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

const Button = ({ colors, size, corners, children, onClick }) => {
    const theme = {
        bgColor: colors[0],
        textColor: colors[1],
        hoverColor: colors[2],
    };

    return (
        <ButtonWrapper theme={theme} size={size} corners={corners} onClick={onClick}>
            {children}
        </ButtonWrapper>
    );
};

export default Button;
