import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import AddBookCard from "../../components/BookCard/AddBookCard";
import BookCard from "../../components/BookCard/BookCard";
import HomePageCarousel from "./HomePageCarousel";
import withLoading from "../../components/HOC/WithLoading";
import { BookCardContext } from "../../context/BookCardContextProvider";
import { UserContext } from "../../context/UserContextProvider";
import AddBookModal from "../../components/popup/AddBookModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Container,
  Main,
  CarouselSection,
  BooksArticlesSection,
  CardContainer,
  ContextSection, VideoSection,
} from "./HomePage.styles";
import { LoadingContext } from "../../context/LoadingContextProvider";
import { BookContext } from "../../context/BookContextProvider";
import CustomVideo from "../../components/Videos/CustomVideo";
import { CardGroup } from "react-bootstrap";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        infinite:true,
        dots:true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


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
          <HomePageCarousel />
        </CarouselSection>
        <BooksArticlesSection>
          <h2>Featured Books & Articles</h2>
          <CardContainer>
            {
              console.log(bookCard.books)
            }
            <Slider {...settings} beforeChange={(current, next) => {
              console.log(`Current slide index: ${current}, Next slide index: ${next}`);
            }}>
              {bookCard.books.map((book, index) => (
                <div key={index}>
                  <BookCard
                    bookId={book.bookId}
                    userId={book.userId}
                    title={book.title}
                    authors={book.authors}
                    description={book.description}
                    thumbnail={book.thumbnail}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </Slider>
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
