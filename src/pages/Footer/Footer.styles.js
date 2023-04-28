import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #333;
  color: #fff;
`;

export const Logo = styled.div`
  img {
    height: 150px;
  }
`;

export const Contact = styled.div`
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 5px;
  }

  input,
  textarea {
    margin-bottom: 10px;
    font-size: 14px;
  }

  button {
    background-color: #444;
    border: none;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #555;
  }
`;
