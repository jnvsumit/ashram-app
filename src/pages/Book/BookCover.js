// BookCover.js
import React from 'react';
import {
    BookCoverContainer,
    BookThumbnail,
    BookInfo,
    BookTitle,
    BookAuthors,
    BookDescription, BookThumbnailWrapper, BookEditIcon,
} from './BookCover.styles';

const BookCover = ({ title, bookId, userId, authors = [], thumbnail, description }) => {

    return (
        <BookCoverContainer>
            <BookThumbnailWrapper>
                <BookEditIcon />
                <BookThumbnail src={thumbnail} alt={`Cover of ${title}`} />
            </BookThumbnailWrapper>
            <BookInfo>
                <BookTitle>{title}</BookTitle>
                {
                    authors.length > 1 ? (
                        <BookAuthors>{authors[0]} et al.</BookAuthors>
                    ) : (
                        authors.map((author, index) => (
                            <BookAuthors key={index}>{author}</BookAuthors>
                        ))
                    )
                }
                <BookDescription>{description}</BookDescription>
            </BookInfo>
        </BookCoverContainer>
    );
};

export default BookCover;
