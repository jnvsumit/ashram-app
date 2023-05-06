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

const Select = styled.select`
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

const SelectInput = ({ label, options, value, onChange }) => {
    const [selectValue, setSelectValue] = useState(value);

    const handleChange = (e) => {
        setSelectValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <Select value={selectValue} onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </InputContainer>
    );
};

export default SelectInput;
