import styled from "styled-components";

export const FileInput = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;