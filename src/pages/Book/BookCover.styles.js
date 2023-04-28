// BookCover.styles.js
import styled from 'styled-components';
import EditIcon from "../../components/icons/EditIcon";

export const BookCoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
`;

export const BookThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const BookEditIcon = styled(EditIcon)`
    position: relative;
    top: -50px;
    right: -50px;
    margin: 0 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    fill: #000;
    
    &:hover {
        fill: #f44336;
    }
`;

export const BookThumbnailWrapper = styled.div`
    position: relative;
    width: 400px;
    height: auto;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    overflow: hidden;
`;

export const BookInfo = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const BookTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const BookAuthors = styled.h2`
  font-size: 1.4rem;
  font-style: italic;
  margin-bottom: 10px;
`;

export const BookDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
`;
