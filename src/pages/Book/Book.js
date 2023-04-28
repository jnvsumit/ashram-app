import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BookWrapper,
  Sidebar,
  SidebarContent,
  Main
} from "./Book.styles";
import withLoading from "../../components/HOC/WithLoading";
import BookContent from "./BookContent";
import BookNav from "./BookNav";
import {LoadingContext} from "../../context/LoadingContextProvider";
import {BookContext} from "../../context/BookContextProvider";
import {PageCardContext} from "../../context/PageCardContextProvider";
import BookCover from "./BookCover";

const Book = () => {
  const { id } = useParams();
  const { setLoading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(-1);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const { book, onUpdate: onBookUpdate, onFetch: onBookFetch, setBook } = useContext(BookContext);
  const { pageCard } = useContext(PageCardContext);

  useEffect(() => {
    onBookFetch(id);
  }, [id, setLoading]);

  return (
    <BookWrapper>
      <Sidebar>
        <SidebarContent>
            <BookNav pageNumber={paginationCurrentPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </SidebarContent>
      </Sidebar>
      <Main>
          {
              currentPage > -1 ?
                    <BookContent bookId={id} pageId={pageCard.pages.length > currentPage ? pageCard.pages[currentPage].pageId : null} /> :
                    <BookCover bookId={id} userId={book.userId} title={book.title} thumbnail={book.thumbnail} authors={book.authors} description={book.description} />
          }
      </Main>
    </BookWrapper>
  );
};

export default withLoading(Book);


