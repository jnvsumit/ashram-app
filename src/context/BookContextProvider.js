import React, { createContext, useState, useEffect, useCallback } from 'react';
import { apiCall } from '../api/adapter';

const INITIAL_STATE = {
    title: '',
    bookId: '',
    userId: '',
    authors: [],
    thumbnail: '',
    description: ''
};

const INITIAL_ERROR_STATE = {
    errorCode: '',
    errorMessage: ''
};

export const BookContext = createContext(INITIAL_STATE);

const BookContextProvider = ({ children }) => {
    const [book, setBook] = useState(INITIAL_STATE);
    const [bookError, setBookError] = useState(INITIAL_ERROR_STATE);

    /**
     * Save the book to the server
     * @param formData - The form data
     * @returns {Promise<string|*>} - The book id
     */
    const onSave = async (formData) => {
        try {
            const response = await apiCall(`api/book`, {
                method: "POST",
                body: formData
            });

            if (response.success) {
                const { data } = response;
                console.log("data - book", data)
                setBook((prevState) => {
                    return {
                        ...prevState,
                        title: data.title,
                        bookId: data.bookId,
                        userId: data.userId,
                        authors: data.authors,
                        thumbnail: data.thumbnail,
                        description: data.description,
                    };
                });

                return data.bookId;
            } else {
                setBookError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.error("Error saving book:", error);
            setBookError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    };

    /**
     * Delete the book
     * @param bookId - The book id
     * @returns {Promise<void>} - Nothing
     */
    const onDelete = async (bookId) => {
        try {
            const response = await apiCall(`api/book/${bookId}`, {
                method: "DELETE",
            });

            if (response.success) {
                setBook(INITIAL_STATE);
            } else {
                setBookError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.error("Error deleting book:", error);
            setBookError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    };

    /**
     * Fetch the book
     * @param bookId - The book id
     * @returns {Promise<void>} - Nothing
     */
    const onFetch = async (bookId) => {
        try {
            const response = await apiCall(`api/book/${bookId}`, {
                method: "GET"
            });

            if (response.success) {
                const { data } = response;
                console.log("data", data);
                setBook((prevState) => {
                    return {
                        ...prevState,
                        title: data.title,
                        bookId: data.bookId,
                        userId: data.userId,
                        authors: data.authors,
                        thumbnail: data.thumbnail,
                        description: data.description,
                    };
                });
            } else {
                setBookError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.error("Error fetching book:", error);
            setBookError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    };

    const onUpdate = async (bookId, formData) => {
        try {
            const response = await apiCall(`api/book/${bookId}`, {
                method: "PATCH",
                body: formData,
            });

            if (response.success) {
                const { data } = response;
                setBook((prevState) => {
                    return {
                        ...prevState,
                        title: data.title,
                        bookId: data.bookId,
                        userId: data.userId,
                        authors: data.authors,
                        thumbnail: data.thumbnail,
                        description: data.description,
                    };
                });
            } else {
                setBookError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.error("Error updating book:", error);
            setBookError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    };

    return (
        <BookContext.Provider value={{ book, bookError, onSave, onDelete, onFetch, onUpdate, setBook }}>
            {children}
        </BookContext.Provider>
    );
};

export default BookContextProvider;