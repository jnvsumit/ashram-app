import React, {useContext, useEffect, useState} from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import AddBookCard from "../../components/BookCard/AddBookCard";
import BookCard from "../../components/BookCard/BookCard";
import Carousel from "../../components/carousel/Carousel";
import withLoading from "../../components/HOC/WithLoading";
import { BookCardContext } from "../../context/BookCardContextProvider";
import { UserContext } from "../../context/UserContextProvider";
import AddBookModal from "../../components/popup/AddBookModal";

import {
    Container,
    Main,
    CarouselSection,
    BooksArticlesSection,
    CardContainer,
    ContextSection, VideoSection,
} from "./HomePage.styles";
import {LoadingContext} from "../../context/LoadingContextProvider";
import {BookContext} from "../../context/BookContextProvider";
import CustomVideo from "../../components/Videos/CustomVideo";

const Images = [
    "https://picsum.photos/id/1018/800/400",
    "https://picsum.photos/id/1020/800/400",
    "https://picsum.photos/id/1021/800/400",
    "https://picsum.photos/id/1022/800/400",
];

const HomePage = () => {
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
        formData.append("authors", JSON.stringify(authors));
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
      <Main>
        <CarouselSection>
          <Carousel images={Images}/>
        </CarouselSection>
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
          <VideoSection>
                <h2>Video</h2>
                <CustomVideo src="https://www.youtube.com/embed/1Q8fG0TtVAY" type="iframe" />
                <CustomVideo src="https://www.youtube.com/embed/1Q8fG0TtVAY" type="iframe" />
            </VideoSection>
          <ContextSection>
              <h2>About the Ashram</h2>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
              risus ac aliquet feugiat. Sed ullamcorper posuere orci, euismod
              venenatis felis. Nunc eget tellus a velit bibendum vehicula ac eu
              leo. Nulla facilisi. Donec blandit eleifend enim at blandit.{" "}
              </p>
          </ContextSection>
      </Main>
    </Container>
  );
};

export default withLoading(HomePage);
