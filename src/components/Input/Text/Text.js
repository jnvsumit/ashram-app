import React, { useState } from "react";
import styled from "styled-components";
import Phone from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CrossIcon from "../../icons/CrossIcon";

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: 320px) {
      min-width: 100%;
    }
    
    &:focus {
        box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
    }
`;

const Label = styled.label`
    font-weight: bold;
    background-color: #ff8c00;
    color: white;
    padding: 8px;
    border-radius: 4px 0 0 4px;
    margin-bottom: 8px;
`;

const Input = styled.input`
    font-size: 14px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0;
    outline: none;
    min-width: 200px;
    margin-bottom: 8px;
`;

const PhoneInput = styled(Phone)`
    font-size: 14px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0;
    outline: none;
    min-width: 200px;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  max-height: 100px;
  min-height: 40px;
  min-width: 200px;
  overflow-y: auto;
  background-color: #eee;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 8px;
  padding: 8px;
  gap: 8px;
  background-color: #ccc;
  &:hover {
    background-color: #aaa;
  }
`;

const ItemName = styled.span`
  color: #000;
  cursor: pointer;
`;

export const Types = {
    TEXT: "text",
    NUMBER: "number",
    EMAIL: "email",
    PASSWORD: "password",
    TEL: "tel",
    URL: "url",
    SEARCH: "search",
};

const Text = ({ label, name, type = Types.TEXT, value = "", onChange = () => {}, placeholder = "", acceptMultiple = false, onKeyDown = () => {}, ...rest }) => {
    const [text, setText] = useState(() => {
        if (acceptMultiple) {
            return {
                current: value,
                items: [],
            };
        } else {
            return value;
        }
    });

    const handleChange = (e) => {
        if (acceptMultiple) {
            const UPDATED_TEXT = {
                items: text.items,
                current: e.target.value,
            };

            setText(UPDATED_TEXT);
            onChange(name, UPDATED_TEXT);
        } else {
            setText(e.target.value);
            onChange(name, e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        if (acceptMultiple && e.key === "Enter") {
            const UPDATED_TEXT = {
                current: "",
                items: [...text.items, text.current],
            };

            setText(UPDATED_TEXT);
            onKeyDown(name, UPDATED_TEXT);
        }
    };

    const handleRemoveItem = (itemName, index) => {
        const newItems = [...text.items];
        newItems.splice(index, 1);
        const UPDATED_TEXT = {
            current: text.current,
            items: newItems,
        };

        setText(UPDATED_TEXT);
        onChange(name, UPDATED_TEXT);
    };

    const getPattern = (type) => {
        switch (type) {
            case Types.NUMBER:
                return "[0-9]*";
            case Types.EMAIL:
                return "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
            case Types.URL:
                return "https?://.+";
            case Types.SEARCH:
                return ".*";
        }
    }

    if (type === Types.TEL) {
        return (
            <InputContainer {...rest}>
                {label && <Label>{label}</Label>}
                <PhoneInput
                    country="in"
                    value={acceptMultiple ? "" + text.current : "" + text}
                    onKeyDown={handleKeyDown}
                    onChange={(phone) => handleChange({ target: { value: phone } })}
                    placeholder={placeholder}
                />
                {acceptMultiple && <ItemsList items={text.items} onRemoveItem={handleRemoveItem} />}
            </InputContainer>
        );
    }

    return (
        <InputContainer {...rest}>
            {label && <Label>{label}</Label>}
            <Input
                type={type}
                pattern={getPattern(type)}
                value={acceptMultiple ? text.current : text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            {acceptMultiple && <ItemsList items={text.items} onRemoveItem={handleRemoveItem} />}
        </InputContainer>
    );
};

const ItemsList = ({ items, onRemoveItem }) => {
    return (
        <ItemList>
            {items.map((item, index) => (
                <Item key={index}>
                    <ItemName>{item}</ItemName>
                    <CrossIcon
                        style={{ border: "1px dotted #eee" }}
                        onClick={() => onRemoveItem(item, index)}
                    />
                </Item>
            ))}
        </ItemList>
    );
};

export default Text;
