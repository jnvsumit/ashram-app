import React, {useContext, useEffect, useState} from 'react';
import {BookTitle, BookTitleContent, PageItem, PageList, TitleInput} from './Book.styles';
import { UserContext } from '../../context/UserContextProvider';
import EditIcon from "../../components/icons/EditIcon";
import AddPageModal from "../../components/popup/AddPageModal";
import DeleteIcon from "../../components/icons/DeleteIcon";
import {PageCardContext} from "../../context/PageCardContextProvider";
import {BookContext} from "../../context/BookContextProvider";

const BookNav = ({ pageNumber, currentPage, setCurrentPage }) => {
    const { user } = useContext(UserContext);
    const { book, onUpdate: onBookUpdate, onFetch: onBookFetch, setBook } = useContext(BookContext);
    const { pageCard, onUpdate: onPageCardUpdate, onAdd: onPageAdd, onDelete: onPageDelete, setPageCard, setPageNumber } = useContext(PageCardContext);
    const [isBookTitleEditable, setIsBookTitleEditable] = useState(false);
    const [editingPageIndex, setEditingPageIndex] = useState(-1);
    const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);

    const handleBookTitleEditClick = () => {
        if (user.isLoggedIn) {
            setIsBookTitleEditable(true);
        }
    };

    const handleBookTitleChange = (event) => {
        setBook({ ...book, title: event.target.value });
    };

    const handleBookTitleEdited = async (event) => {
        if (event.key === 'Enter') {
            setIsBookTitleEditable(false);
            const formData = new FormData();
            formData.append("title", book.title);
            await onBookUpdate(book.bookId, formData);
        }
    };

    const handlePageTitleEditClick = (index) => {
        if (user.isLoggedIn) {
            setEditingPageIndex(index);
        }
    }

    const handlePageTitleChange = (event) => {
        const newPageCard = {...pageCard};
        newPageCard.pages[editingPageIndex].title = event.target.value;
        setPageCard(newPageCard);
    };

    const handlePageTitleEdited = async (event) => {
        if (event.key === 'Enter') {
            setEditingPageIndex(-1);
            const formData = new FormData();
            formData.append("title", pageCard.pages[editingPageIndex].title);
            await onPageCardUpdate(book.bookId, pageCard.pages[editingPageIndex].pageId, JSON.stringify({ title: pageCard.pages[editingPageIndex].title }));
        }
    }

    const handlePageTitleClick = (index) => {
        setCurrentPage(index);
    };

    const handleAddPageSubmit = async ({ title }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", "");

        await onPageAdd(book.bookId, JSON.stringify({ title, content: "" }));
        setCurrentPage(pageCard.pages.length - 1);
        setIsAddPageModalOpen(false);
    };

    const handlePageDelete = async (pageId) => {
        await onPageDelete(book.bookId, pageId);
    }

    useEffect(() => {
        setPageNumber(book.bookId, pageNumber);
    }, [book, pageNumber, currentPage]);

    return (
        <>
            <BookTitle style={{backgroundColor: `${currentPage === -1 ? "red" : ""}`}}>
                {isBookTitleEditable && user.isLoggedIn ? (
                    <TitleInput
                        type="text"
                        value={book.title}
                        onChange={(event) => handleBookTitleChange(event)}
                        onKeyPress={(event) => handleBookTitleEdited(event)}
                    />
                ) : (
                    <BookTitleContent onClick={() => setCurrentPage(-1)} >{book.title}</BookTitleContent>
                )}
                {user.isLoggedIn && !isBookTitleEditable && <EditIcon onClick={handleBookTitleEditClick} />}
            </BookTitle>
            <PageList>
                {pageCard.pages.map((page, index) => (
                    <PageItem
                        style={{backgroundColor: `${currentPage === index ? "red" : ""}`}}
                        key={index}
                        onClick={() => handlePageTitleClick(index)}
                        onDoubleClick={() => handlePageTitleEditClick(index)}
                        className={editingPageIndex === index ? 'editing' : ''}
                    >
                        {editingPageIndex === index ? (
                            <input
                                type="text"
                                value={page.title}
                                onChange={(event) => handlePageTitleChange(event, index)}
                                onKeyPress={(event) => handlePageTitleEdited(event)}
                            />
                        ) : (
                            <>
                                <span>{page.title}</span>
                                {user.isLoggedIn && ( <DeleteIcon onClick={() => handlePageDelete(page.pageId)} /> )}
                            </>
                            )}
                    </PageItem>
                ))}
                {user.isLoggedIn && <PageItem onClick={() => setIsAddPageModalOpen(true)}>+ Add Page</PageItem>}
                <AddPageModal
                    isOpen={isAddPageModalOpen}
                    onRequestClose={() => setIsAddPageModalOpen(false)}
                    onSubmit={handleAddPageSubmit}
                />
            </PageList>
        </>
    );
};

export default BookNav;
