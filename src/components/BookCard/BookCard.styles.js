/**
 * @file BookCard.styles.js
 */

import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledBookCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 300px;
  margin-bottom:10px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-shadow: 0 0 5px rgba(255, 255, 240, 0.7);
  background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
        ),
        url(${({ background }) => background});
  transition: scale 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const BookCardContent = styled.div`
  height:300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align:center;
  color: white;
  span {
    position: relative;
    font-size: 1.2rem;
    font-weight: bold;
   }
`;

export const BookCardTitle = styled.h5`
   padding-top:15px;

`;

export const BookCardAuthorWrapper = styled.div`
    display: flex;
    justify-content:center;
    gap: 10px;
    align-items: center;
`;

export const BookCardAuthor = styled.p`
  font-size:20px;
  font-style: italic;
`;

export const BookCardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
  padding: 5px;
  transition: background-color 0.3s ease-in-out;
`;

