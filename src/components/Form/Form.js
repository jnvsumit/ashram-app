import React from 'react';
import styled from 'styled-components';
import File from "../Input/File/File";
import CrossIcon from "../icons/CrossIcon";
import Preview from "../Output/Preview";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const TextArea = styled.textarea`
  font-size: 1rem;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  height: 100px;

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const Button = styled.button`
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #564dff;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ItemList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    max-height: 100px;
    overflow-y: auto;
`;

const Item = styled.li`
    font-size: 16px;
    margin-right: 8px;
    margin-bottom: 8px;
`;

const ItemName = styled.span`
    padding: 4px;
    background-color: #2ecc71;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #27ae60;
    }
`;

export const Types = {
    TEXT: 'text',
    EMAIL: 'email',
    PASSWORD: 'password',
    TEL: 'tel',
    NUMBER: 'number',
    TEXTAREA: 'textarea',
    FILE: 'file',
    SELECT: 'select',
};

const Form = ({ elements, onSubmit, title }) => {
    const [form, setForm] = React.useState(() => {
        const initialState = {};

        elements.forEach((element) => {
            if (element.acceptMultiple) {
                initialState[element.name] = {
                    type: element.type,
                    content: {
                        current: '',
                        items: [],
                    }
                };
            } else {
                initialState[element.name] = {
                    type: element.type,
                    content: '',
                };
            }
        });

        return initialState;
    });

    const handleChange = (e, acceptMultiple, cb) => {
        if (e.target.files) {
            if (acceptMultiple) {
                setForm({
                    ...form,
                    [e.target.name]: {
                        type: form[e.target.name].type,
                        content: {
                            current: '',
                            items: [...form[e.target.name].content.items, e.target.files[0]],
                        }
                    },
                });
            } else {
                setForm({
                    ...form,
                    [e.target.name]: {
                        type: form[e.target.name].type,
                        content: e.target.files[0],
                    },
                });
            }
        } else {
            if (acceptMultiple) {
                setForm({
                    ...form,
                    [e.target.name]: {
                        type: form[e.target.name].type,
                        content: {
                            current: e.target.value,
                            items: form[e.target.name].content.items,
                        }
                    },
                });
            } else {
                setForm({
                    ...form,
                    [e.target.name]: {
                        type: form[e.target.name].type,
                        content: e.target.value,
                    },
                });
            }
        }

        if (cb) {
            cb(e);
        }
    }

    const handleKeyDown = (e, acceptMultiple, cb) => {
        if (e.key === 'Enter' && acceptMultiple) {
            setForm({
                ...form,
                [e.target.name]: {
                    type: form[e.target.name].type,
                    content: {
                        current: '',
                        items: [...form[e.target.name].content.items, e.target.value],
                    }
                }
            });
        }

        if (cb) {
            cb(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    const handleRemoveItem = (name, index) => {
        setForm({
            ...form,
            [name]: {
                type: form[name].type,
                content: {
                    current: form[name].content.current,
                    items: form[name].content.items.filter((item, i) => i !== index),
                }
            },
        });
    }

    const getElement = (element, index) => {
        const { type, name, label, preview, acceptMultiple, onChange, onKeyDown, placeholder, required, options, min, max } = element;

        const getElementByType = () => {
            if (type === Types.TEXTAREA) {
                return (
                    <TextArea
                        name={name}
                        value={acceptMultiple ? form[name].content.current : form[name].content}
                        onChange={(e) => handleChange(e, acceptMultiple, onChange)}
                        onKeyDown={(e) => handleKeyDown(e, acceptMultiple, onKeyDown)}
                        placeholder={placeholder}
                        required={required}
                    />
                );
            }

            if (type === Types.EMAIL) {
                return (
                    <Input
                        type={type}
                        name={name}
                        value={acceptMultiple ? form[name].content.current : form[name].content}
                        onChange={(e) => handleChange(e, acceptMultiple, onChange)}
                        onKeyDown={(e) => handleKeyDown(e, acceptMultiple, onKeyDown)}
                        placeholder={placeholder}
                        required={required}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                );
            }

            if (type === Types.PASSWORD) {
                const pattern = `(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{${min},${max}}`;
                return (
                    <Input
                        type={type}
                        name={name}
                        value={acceptMultiple ? form[name].content.current : form[name].content}
                        onChange={(e) => handleChange(e, acceptMultiple, onChange)}
                        onKeyDown={(e) => handleKeyDown(e, acceptMultiple, onKeyDown)}
                        placeholder={placeholder}
                        required={required}
                        minLength={min}
                        maxLength={max}
                        pattern={pattern}
                    />
                );
            }

            if (type === Types.TEL) {
                return (
                    <Input
                        type={type}
                        name={name}
                        value={acceptMultiple ? form[name].content.current : form[name].content}
                        onChange={(e) => handleChange(e, acceptMultiple, onChange)}
                        onKeyDown={(e) => handleKeyDown(e, acceptMultiple, onKeyDown)}
                        placeholder={placeholder}
                        required={required}
                        pattern="[0-9]+"
                    />
                );
            }

            if (type === Types.SELECT) {
                return (
                    <select
                        name={name}
                        value={acceptMultiple ? form[name].content.current : form[name].content}
                        onChange={(e) => handleChange(e, acceptMultiple, onChange)}
                        onKeyDown={(e) => handleKeyDown(e, acceptMultiple, onKeyDown)}
                        placeholder={placeholder}
                        required={required}
                    >
                        {
                            options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                );
            }

            if (type === Types.FILE) {
                return (
                    <File
                        name={name}
                        value={acceptMultiple ? form[name].content.current : form[name].content}
                        preview={preview}
                        onChange={(e) => handleChange(e, acceptMultiple, onChange)}
                        onKeyDown={(e) => handleKeyDown(e, acceptMultiple, onKeyDown)}
                        required={required}
                    />
                )
            }

            return (
                <Input
                    type={type}
                    name={name}
                    value={acceptMultiple ? form[name].content.current : form[name].content}
                    onChange={(e) => handleChange(e, acceptMultiple, onChange)}
                    onKeyDown={(e) => handleKeyDown(e, acceptMultiple, onKeyDown)}
                    placeholder={placeholder}
                    required={required}
                    min={min}
                    max={max}
                />
            );
        };

        return (
            <InputWrapper key={name}>
                {label && <Label>{label}</Label>}
                {getElementByType()}
                {
                    acceptMultiple && (
                        <ItemList>
                            {
                                form[name].content.items.map((item, index) =>
                                    (
                                        <Item key={index}>
                                            {
                                                form[name].type === Types.FILE ? (
                                                    <Preview content={item} type={item.type} />
                                                ) : (
                                                    <ItemName>{item}</ItemName>
                                                )
                                            }
                                            <CrossIcon
                                                onClick={() => handleRemoveItem(name, index)}
                                            />
                                        </Item>
                                    )
                                )
                            }
                        </ItemList>
                    )
                }
            </InputWrapper>
        );
    }

    return (
        <FormWrapper onSubmit={handleSubmit}>
            { title && <h2>{title}</h2> }
            {elements.map(getElement)}
            <Button type="submit">Submit</Button>
        </FormWrapper>
    );
};

export default Form;