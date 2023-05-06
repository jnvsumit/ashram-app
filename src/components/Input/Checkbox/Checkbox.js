import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 4px;
`;

const Checkbox = styled.input`
  margin-left: 8px;
`;

const CheckboxGroup = ({ label, options, name, value = [], onChange }) => {
    const [checkboxValue, setCheckboxValue] = React.useState(typeof value === 'string' ? [value] : value);

    const handleCheckboxChange = (e, option) => {
        const isChecked = e.target.checked;
        let newValue;

        if (isChecked) {
            newValue = [...checkboxValue, option.value];
        } else {
            newValue = checkboxValue.filter((item) => item !== option.value);
        }

        setCheckboxValue(newValue);
        onChange(newValue);
    };

    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            {options.map((option, index) => (
                <Label key={index}>
                    <Checkbox
                        type="checkbox"
                        name={name}
                        value={option.value}
                        checked={checkboxValue.includes(option.value)}
                        onChange={(e) => handleCheckboxChange(e, option)}
                    />
                    {option.label}
                </Label>
            ))}
        </InputContainer>
    );
};

export default CheckboxGroup;
