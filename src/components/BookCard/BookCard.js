/**
 * @file BookCard.js
 */

import React, {useContext} from "react";
import {
    StyledLink,
    StyledBookCard,
    BookCardContent,
    BookCardTitle,
    BookCardAuthor,
    BookCardDescription, DeleteIconWrapper, BookCardAuthorWrapper,
} from "./BookCard.styles";
import DeleteIcon from "../icons/DeleteIcon";
import {UserContext} from "../../context/UserContextProvider";

const BookCard = ({
                    bookId,
                    userId,
                    title,
                    authors,
                    description,
                    thumbnail,
                    onDelete,
                  }) => {
    const { user } = useContext(UserContext);
  const bgStyle = {
      backgroundImage: `url(${thumbnail})`,
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(bookId);
  };

  const getTruncatedDescription = (description) => {
    if (description.length > 150) {
      return description.substring(0, 150) + "...";
    }
    return description;
  }

  return (
      <StyledLink to={`/books/${bookId}`}>
        <StyledBookCard background={thumbnail}>
            { user.isLoggedIn && (
                <DeleteIconWrapper>
                    <DeleteIcon fill="#d4d4d4" onClick={handleDeleteClick}/>
                </DeleteIconWrapper>)
            }
          <BookCardContent>
            <BookCardTitle>{title}</BookCardTitle>
          <span style={{fontSize: "50px", color: "#021d25"}}>by {" "} </span>
            <BookCardAuthorWrapper>
            {
                authors.map((author, index) => <BookCardAuthor key={index} >{index === authors.length - 1 ? author : author + ","}</BookCardAuthor>)
            }
            </BookCardAuthorWrapper>
            <BookCardDescription>{getTruncatedDescription(description)}</BookCardDescription>
          </BookCardContent>
        </StyledBookCard>
      </StyledLink>
  );
};

export default BookCard;
