import styled from "styled-components";

export const AboutContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:40px;
  gap:10px;
  background-color:#f9f4f1;
  font-family: 'Raleway', sans-serif;
  
  @media(max-width:1024px){
    flex-direction:column;
  }
`;

export const AboutInfo = styled.div`
  flex:2;
`;

export const AboutImageContainer = styled.div`
`;

export const AboutImage = styled.img`
  border-radius: 5px;
  width:100%;

`;
