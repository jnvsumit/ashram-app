import React from 'react';
import styled from 'styled-components';

const AddBookCardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 300px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  margin:10px;
  border-radius: 5px;
  text-decoration: none;
  color: #000;
  font-size: 48px;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const AddBookCardIcon = styled.span`
    font-size: 200px;
    color: rgba(0, 0, 0, 0.1);
`;

const AddBookCard = ({ onClick }) => {
    return (
      <AddBookCardButton onClick={onClick}>
        <AddBookCardIcon>+</AddBookCardIcon>
      </AddBookCardButton>
    );
  };
  
  export default AddBookCard;
  