import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import CrossIcon from "../icons/CrossIcon";

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
  z-index: 10000;
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

const TextArea = styled.textarea`
  font-size: 16px;
  padding: 4px;
  margin-bottom: 16px;
`;

const AuthorsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  max-height: 100px;
  overflow-y: auto;
`;

const AuthorListItem = styled.li`
  font-size: 16px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const AuthorName = styled.span`
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

const ModalCrossIcon = styled(CrossIcon)`
    margin-left: 100px;
    cursor: pointer;
    transition: transform 0.2s;
`;

const AddBookModal = ({ isOpen, onRequestClose, onSubmit, ariaHideApp }) => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState([]);
    const [authorInput, setAuthorInput] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, authors, thumbnail, description });
        setTitle("");
        setAuthors([]);
        setThumbnail("");
        setDescription("");
        onRequestClose();
    };

    const handleAuthorInputKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setAuthors((prevAuthors) => {
                if (prevAuthors.includes(authorInput.trim())) {
                    return prevAuthors;
                }
                return [...prevAuthors, authorInput.trim()];
            });
            setAuthorInput("");
        }
    };

    return (
        <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} app={ariaHideApp} >
            <ModalCrossIcon onClick={onRequestClose} />
            <Title>Add Book</Title>
            <Form onSubmit={handleSubmit}>
                <Label>Title</Label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book title"
                    required
                />
                <Label>Authors</Label>
                <Input
                    type="text"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    onKeyDown={handleAuthorInputKeyDown}
                    placeholder="Enter author's name and press Enter"
                />
                <AuthorsList>
                    {
                        authors.map((author, index) =>
                            (
                                <AuthorListItem key={index} >
                                    <AuthorName>{author}</AuthorName>
                                    <CrossIcon onClick={() => setAuthors((prevAuthors) => prevAuthors.filter((_, i) => i !== index))} />
                                </AuthorListItem>
                            )
                        )
                    }
                </AuthorsList>
                <Label>Thumbnail</Label>
                <Input
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                />
                <Label>Description</Label>
                <TextArea
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Book description"
                    required
                />
                <Button type="submit">Add Book</Button>
            </Form>
        </StyledModal>
    );
};

export default AddBookModal;

