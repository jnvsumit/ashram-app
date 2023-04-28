// DeleteIcon.js
import React from 'react';
import styled from 'styled-components';

const DeleteIconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    svg {
      fill: #f44336;
    }
  }
`;

const DeleteIconSVG = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${({ fill }) => fill || '#000'};
  filter: drop-shadow(10px 10px 10px ${({ dropShadow }) => dropShadow || '#000'});
`;

const DeleteIcon = ({ onClick, fill }) => {
    return (
        <DeleteIconWrapper onClick={onClick}>
            <DeleteIconSVG fill={fill} dropShadow="#000"  viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </DeleteIconSVG>
        </DeleteIconWrapper>
    );
};

export default DeleteIcon;
