import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AddBookCard from "../../components/BookCard/AddBookCard";
import BookCard from "../../components/BookCard/BookCard";
import withLoading from "../../components/HOC/WithLoading";
import { BookCardContext } from "../../context/BookCardContextProvider";
import { UserContext } from "../../context/UserContextProvider";
import AddBookModal from "../../components/popup/AddBookModal";

import {
    Container,
    BooksArticlesSection,
    CardContainer,
} from "./BookPage.styles";
import {LoadingContext} from "../../context/LoadingContextProvider";
import {BookContext} from "../../context/BookContextProvider";

const BookPage = () => {
    const navigate = useNavigate();
    const { bookCard, setPageNumber } = useContext(BookCardContext);
    const { onSave, onDelete } = useContext(BookContext);
    const { user } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

    const handleAddBookSubmit = async ({ title, authors, thumbnail, description }) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        authors.map((author) => formData.append("authors", author));
        formData.append("thumbnail", thumbnail);
        formData.append("description", description);

        try {
            const bookId = await onSave(formData);
            navigate(`/books/${bookId}`);
        } catch (error) {
            console.error("Error adding book:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBookCardClick = () => {
        setIsAddBookModalOpen(true);
    }

    useEffect(() => {
        setPageNumber(1);
    }, [onDelete]);

    return (
        <Container>
            <BooksArticlesSection>
                <h2>Featured Books & Articles</h2>
                <CardContainer>
                    {
                        bookCard.books.map((book, index) => (
                            <BookCard
                                key={index}
                                bookId={book.bookId}
                                userId={book.userId}
                                title={book.title}
                                authors={book.authors}
                                description={book.description}
                                thumbnail={book.thumbnail}
                                onDelete={onDelete}
                            />
                        ))
                    }
                    {user.isLoggedIn && <AddBookCard onClick={handleAddBookCardClick} />}
                    <AddBookModal
                        isOpen={isAddBookModalOpen}
                        onRequestClose={() => setIsAddBookModalOpen(false)}
                        onSubmit={handleAddBookSubmit}
                        ariaHideApp={false}
                    />
                </CardContainer>
            </BooksArticlesSection>
        </Container>
    );
};

export default withLoading(BookPage);
