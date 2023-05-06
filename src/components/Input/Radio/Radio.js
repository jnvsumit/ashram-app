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

const Radio = styled.input`
  margin-left: 8px;
`;

const RadioGroup = ({ label, options, name, value, onChange }) => {
    const [radioValue, setRadioValue] = useState(value);

    const handleChange = (e) => {
        setRadioValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            {options.map((option, index) => (
                <Label key={index}>
                    <Radio
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={radioValue === option.value}
                        onChange={handleChange}
                    />
                    {option.label}
                </Label>
            ))}
        </InputContainer>
    );
};

export default RadioGroup;
