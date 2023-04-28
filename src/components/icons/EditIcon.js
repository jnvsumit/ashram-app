import React from 'react';
import styled from 'styled-components';

const EditIconWrapper = styled.svg`
  width: 24px;
  height: 24px;
  fill: #f1c40f;
  cursor: pointer;
  transition: fill 0.2s;

  &:hover {
    fill: ${({ fill }) => fill || '#000'};
  }
`;

const EditIcon = ({ onClick, fill }) => (
    <EditIconWrapper
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        fill={fill}
    >
        <path d="M21.04 2.96a3.43 3.43 0 00-4.24 0l-1.67 1.67 4.24 4.24 1.67-1.67a3.43 3.43 0 000-4.24zM4.96 17.75l9.99-9.99 4.24 4.24-9.99 9.99H4.96v-4.24zM3 17.25V21h3.75l11.84-11.84-3.75-3.75L3 17.25z" />
    </EditIconWrapper>
);

export default EditIcon;
