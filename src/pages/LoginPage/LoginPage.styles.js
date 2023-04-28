import styled from 'styled-components';

export const LoginContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 10rem;
  padding: 100px;
  max-width: 500px;
  text-align: center;
`;

export const Title = styled.h1`
  color: #965c07;
  font-family: "PT Serif", serif;
  font-size: 36px;
  margin-bottom: 30px;
`;

export const FormLabel = styled.label`
  color: #5b5b5b;
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const TextInput = styled.input`
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  padding: 10px;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background-color: #965c07;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #8d4e05;
  }
`;

export const BottomText = styled.p`
  color: #5b5b5b;
  margin-top: 20px;
`;

export const BottomLink = styled.button`
  color: #965c07;
  text-decoration: none;
    font-weight: bold;
    transition: 0.2s;
    background: none;
    border: none;
    padding: 10px;


  &:hover {
    glow: 0 0 5px rgba(0, 0, 0, 0.1);
    scale: 1.1;
    cursor: pointer;
  }
`;
