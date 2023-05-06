import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: blue;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
  }
`;

const DataListInput = ({ label, options, value = '', onChange, listId }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <Input list={listId} value={inputValue} onChange={handleChange} />
            <datalist id={listId}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </datalist>
        </InputContainer>
    );
};

export default DataListInput;
