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
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 400px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
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
    scale: 1.30;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const BookCardContent = styled.div`
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  padding: 20px;
  color: white;
  
  span {
    position: relative;
    left 100px;
    font-size: 1.2rem;
    font-weight: bold;
   }
`;

export const BookCardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const BookCardAuthorWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export const BookCardAuthor = styled.p`
  font-size: 2rem;
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

