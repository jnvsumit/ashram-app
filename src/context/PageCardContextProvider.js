import React, { createContext, useState } from 'react';
import { apiCall } from '../api/adapter';

/**
 * The initial state
 * @type {{pageNumber: number, pages: *[], totalPages: number, pageSize: number}}
 */
const INITIAL_STATE = {
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    pages: []
};

const INITIAL_ERROR_STATE = {
    errorCode: '',
    errorMessage: ''
};

export const PageCardContext = createContext(INITIAL_STATE);

const PageCardContextProvider = ({ children }) => {
    const [pageCard, setPageCard] = useState(INITIAL_STATE);
    const [pageCardError, setPageCardError] = useState(INITIAL_ERROR_STATE);

    /**
     * Fetches the pages from the server
     * @param pageNumber - The page number
     * @param pageSize - The page size
     * @returns {Promise<void>} - The void promise
     */
    const onFetch = async (bookId, pageNumber, pageSize) => {
        try {
            const response = await apiCall(`api/page/book-id/${bookId}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                method: "GET"
            });

            if (response.success) {
                const { data } = response;
                console.log("data - pageCard", data);
                setPageCard((prevState) => {
                    return {
                        ...prevState,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                        totalPages: data.totalPages,
                        bookId: data.bookId,
                        pages: [...data.pages].map(page => {
                            return {
                                title: page.title,
                                pageId: page.pageId,
                                userId: page.userId
                            };
                        })
                    };
                });
            } else {
                setPageCardError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.log("error", error);
            setPageCardError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    };

    const onAdd = async (bookId, formData) => {
        try {
            const response = await apiCall(`api/page/${bookId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            });

            if (response.success) {
                const { data } = response;
                setPageCard((prevState) => {
                    return {
                        ...prevState,
                        totalPages: prevState.totalPages + 1,
                        pages: [
                            ...pageCard.pages,
                            {
                                title: data.title,
                                pageId: data.pageId,
                                userId: data.userId
                            }
                        ]
                    };
                });
            } else {
                setPageCardError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.log("error", error);
            setPageCardError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    }

    const onUpdate = async (bookId, pageId, formData) => {
        try {
            const response = await apiCall(`api/page/${pageId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            });

            console.log(bookId, pageId, formData, response);

            if (response.success) {
                const { data } = response;
                setPageCard((prevState) => {
                    return {
                        ...prevState,
                        pages: [...pageCard.pages].map(page => {
                            if (page.pageId === pageId) {
                                return {
                                    title: page.title,
                                    pageId: page.pageId,
                                    userId: page.userId
                                };
                            }

                            return page;
                        })
                    };
                });
            } else {
                setPageCardError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.log("error", error);
            setPageCardError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    }

    const onDelete = async (bookId, pageId) => {
        try {
            const response = await apiCall(`api/page/${pageId}`, {
                method: "DELETE"
            });

            if (response.success) {
                const { data } = response;
                setPageCard((prevState) => {
                    return {
                        ...prevState,
                        totalPages: prevState.totalPages - 1,
                        pages: [...pageCard.pages].filter(page => page.pageId !== pageId)
                    };
                });
            } else {
                setPageCardError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage,
                    };
                });
            }
        } catch (error) {
            console.log("error", error);
            setPageCardError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage,
                };
            });
        }
    }

    const setPageNumber = async (bookId, pageNumber) => {
        console.log("setPageNumber", pageNumber)
        await onFetch(bookId, pageNumber, pageCard.pageSize);
    }

    const setPageSize = async (bookId, pageSize) => {
        await onFetch(bookId, pageCard.pageNumber, pageSize);
    }

    return (
        <PageCardContext.Provider value={{ pageCard, setPageCard, pageCardError, onFetch, onUpdate, onAdd, onDelete, setPageNumber, setPageSize }}>
            {children}
        </PageCardContext.Provider>
    );
}

export default PageCardContextProvider;