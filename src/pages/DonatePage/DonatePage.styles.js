// DonatePage.styles.js
import styled from 'styled-components';

export const DonateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`;

export const DonateTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

export const DonateDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 30px;
  text-align: center;
  max-width: 800px;
`;

export const DonateForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 215px;
  margin-bottom: 20px;
`;

export const CurrencySelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  appearance: none;
  cursor: pointer;
  outline: none;
  margin-bottom: 10px;

  &:focus {
    border-color: #999;
  }
`;

export const DonorInformationInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  appearance: none;
  cursor: pointer;
  outline: none;
  margin-bottom: 10px;

  &:focus {
    border: 1px solid #999;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const DonateAmountInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  appearance: none;
  cursor: pointer;
  outline: none;
  margin-bottom: 10px;

  &:focus {
    border: 1px solid #999;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const DonateButton = styled.button`
  background-color: #007bff;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;
