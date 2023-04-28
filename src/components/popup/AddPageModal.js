import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  outline: none;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 4px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 8px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #27ae60;
  }
`;

const AddPageModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title });
        setTitle("");
        onRequestClose();
    };

    return (
        <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <Title>Add Page</Title>
            <Form onSubmit={handleSubmit}>
                <Label>Title</Label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Button type="submit">Add Page</Button>
            </Form>
        </StyledModal>
    );
};

export default AddPageModal;
