import React from 'react';
import styled from 'styled-components';
import Text, {Types as TextInputTypes} from "../Input/Text/Text";
import CheckboxGroup from "../Input/Checkbox/Checkbox";
import DataListInput from "../Input/DataList/DataList";
import File, { Types as FileInputTypes } from "../Input/File/File";
import Switch from "../Input/Switch/Switch";
import TextArea from "../Input/TextArea/TextArea";
import Select from "../Input/Select/Select";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FormTitle = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

const Button = styled.button`
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: #ff8c00;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #ff7b00;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ComponentTypes = {
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    FILE: 'file',
    SWITCH: 'switch',
    TEXTAREA: 'textarea',
    SELECT: 'select',
    DATALIST: 'datalist'
};

export const InputTypes = {
    TEXT: TextInputTypes,
    FILE: FileInputTypes
}

const TypeToComponent = {
    [ComponentTypes.TEXT]: Text,
    [ComponentTypes.CHECKBOX]: CheckboxGroup,
    [ComponentTypes.RADIO]: CheckboxGroup,
    [ComponentTypes.FILE]: File,
    [ComponentTypes.SWITCH]: Switch,
    [ComponentTypes.TEXTAREA]: TextArea,
    [ComponentTypes.SELECT]: Select,
    [ComponentTypes.DATALIST]: DataListInput
};

const Formp = ({ elements, onSubmit, formLabel, submitLabel }) => {
    const [form, setForm] = React.useState(() => {
        const initialState = {};

        elements.forEach((element) => {
            if (element.name) {
                initialState[element.name] = {};
            }
        });

        return initialState;
    });

    const handleChange = ({ name, data, onChange }) => {
        setForm({
            ...form,
            [name]: data
        });

        if (onChange) {
            onChange(name, data);
        }
    }

    const handleKeyDown = ({ name, data, onKeyDown }) => {
        setForm({
            ...form,
            [name]: data
        });

        if (onKeyDown) {
            onKeyDown(name, data);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        onSubmit(form);
    };

    /**
     * Prevents form submission on enter key press
     * @param event
     */
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <FormWrapper onKeyPress={onKeyPress}>
            { formLabel && <FormTitle>{formLabel}</FormTitle> }
            {
                elements.map((element) => {
                    const { componentType, type, name, onChange, onKeyDown, ...rest } = element;

                    if (!TypeToComponent[componentType]) {
                        return <></>;
                    }

                    const Component = TypeToComponent[componentType];

                    const componentProps = {
                        name,
                        onChange: (name, data) => handleChange({name, data, onChange}),
                        onKeyDown: (name, data) => handleKeyDown({ name, data, onKeyDown })
                    };

                    if (type) {
                        componentProps.type = type;
                    }

                    return (
                        <Component
                            key={name}
                            {...componentProps}
                            {...rest}
                        />
                    );
                })
            }
            <Button onClick={handleSubmit} >{submitLabel}</Button>
        </FormWrapper>
    );
};

export default Formp;