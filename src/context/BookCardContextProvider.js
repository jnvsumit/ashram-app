import React, { createContext, useState } from 'react';
import { apiCall } from '../api/adapter';

/**
 * The initial state
 * @type {{pageNumber: number, books: {
 *     title: string,
 *     bookId: string,
 *     userId: string,
 *     authors: string[],
 *     thumbnail: string,
 *     description: string
 * }[], totalPages: number, pageSize: number}} - The initial state
 */
const INITIAL_STATE = {
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    books: []
};

const INITIAL_ERROR_STATE = {
    errorCode: '',
    errorMessage: ''
};

export const BookCardContext = createContext(INITIAL_STATE);

const BookCardContextProvider = ({ children }) => {
    const [bookCard, setBookCard] = useState(INITIAL_STATE);
    const [bookCardError, setBookCardError] = useState(INITIAL_ERROR_STATE);

    /**
     * Fetches the books from the server
     * @param pageNumber - The page number
     * @param pageSize - The page size
     * @returns {Promise<void>} - The void promise
     */
    const onFetch = async (pageNumber, pageSize) => {
        try {
            const response = await apiCall(`api/book?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                method: "GET"
            });
            const { data } = response;

            if (response.success) {
                setBookCard((prevState) => {
                    return {
                        ...prevState,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                        totalPages: data.totalPages,
                        books: [...data.books].map(book => {
                            return {
                                title: book.title,
                                bookId: book.bookId,
                                userId: book.userId,
                                authors: book.authors,
                                thumbnail: book.thumbnail,
                                description: book.description
                            }
                        })
                    };
                });
            }
        } catch (error) {
            setBookCardError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    }

    /**
     * Fetches the books from the server for the given page number
     * @param pageNumber - The page number
     * @returns {Promise<void>} - The void promise
     */
    const setPageNumber = async (pageNumber) => {
        await onFetch(pageNumber, bookCard.pageSize);
    }

    /**
     * Fetches the books from the server for the given page size
     * @param pageSize - The page size
     * @returns {Promise<void>} - The void promise
     */
    const setPageSize = async (pageSize) => {
        await onFetch(bookCard.pageNumber, pageSize);
    }

    return (
        <BookCardContext.Provider value={{ bookCard, bookCardError, onFetch, setPageNumber, setPageSize }}>
            {children}
        </BookCardContext.Provider>
    );
}

export default BookCardContextProvider;