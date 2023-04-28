import styled from "styled-components";

export const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  background-color: #f5f5f5;
  width: 80%;
  max-width: 1000px;
  border-radius: 10px;
  min-height: 70vh;
  padding: 30px;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #333;
`;

export const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 40px;
  width: 80%;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-bottom: 40px;
  border-radius: 1px;
  
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 18px;
`;

export const DetailLabel = styled.label`
  font-family: "Roboto", sans-serif;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

export const DetailSpan = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #666;
`;

export const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 10px;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const StyledButton = styled.button`
  font-family: "Roboto", sans-serif;
  border: none;
  background-color: inherit;
  color: #4a58de;
  font-size: 18px;
  font-weight: 500;
  padding: 15px 30px;
  margin: 10px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #d4d4d4;
  }
`;