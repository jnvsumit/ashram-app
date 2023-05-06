import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 4px;
`;

const Input = styled.textarea`
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

const TextArea = ({ label, name, value = '', onChange = () => {}, placeholder = '', ...rest }) => {
    const [textArea, setTextArea] = React.useState(value);

    const handleChange = (e) => {
        setTextArea(e.target.value);

        if (typeof onChange === 'function') {
            onChange(name, e.target.value);
        }
    }

    return (
        <InputContainer>
            {label && <Label>{label}</Label>}
            <Input
                {...rest}
                value={textArea}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </InputContainer>
    );
};

export default TextArea;
