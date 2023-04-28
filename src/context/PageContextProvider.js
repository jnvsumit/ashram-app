import React, { createContext, useState } from "react";
import {apiCall} from "../api/adapter";

const INITIAL_STATE = {
    pageId: "",
    bookId: "",
    userId: "",
    title: "",
    content: ""
};

const INITIAL_ERROR_STATE = {
    errorCode: "",
    errorMessage: ""
};

export const PageContext = createContext(INITIAL_STATE);

export const PageContextProvider = ({ children }) => {
    const [page, setPage] = useState(INITIAL_STATE);
    const [pageError, setPageError] = useState(INITIAL_ERROR_STATE);

    const onSave = async (bookId, formData) => {
        try {
            console.log("formData", formData);
            const response = await apiCall(`api/page/${bookId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formData
            });

            if (response.success) {
                const { data } = response;
                setPage((prevState) => {
                    return {
                        ...prevState,
                        pageId: data.pageId,
                        bookId: data.bookId,
                        userId: data.userId,
                        title: data.title,
                        content: data.content
                    };
                });
                return data.pageId;
            } else {
                setPageError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage
                    };
                });
            }
        } catch (error) {
            setPageError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage
                };
            });
        }
    }

    const onFetch = async (bookId, pageId) => {
        try {
            const response = await apiCall(`api/page/page-id/${pageId}`, {
                method: "GET"
            });

            if (response.success) {
                const { data } = response;
                setPage((prevState) => {
                    return {
                        ...prevState,
                        pageId: data.pageId,
                        bookId: data.bookId,
                        title: data.title,
                        content: data.content
                    };
                });
            } else {
                setPageError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage
                    };
                });
            }
        } catch (error) {
            setPageError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage
                };
            });
        }
    }

    const onUpdate = async (pageId, body) => {
        try {
            const response = await apiCall(`api/page/${pageId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            });

            if (response.success) {
                const { data } = response;
                setPage((prevState) => {
                    return {
                        ...prevState,
                        pageId: data.pageId,
                        bookId: data.bookId,
                        title: data.title,
                        content: data.content
                    };
                });
            } else {
                setPageError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage
                    };
                });
            }
        } catch (error) {
            setPageError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage
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
                setPage(INITIAL_STATE);
            } else {
                setPageError((prevState) => {
                    return {
                        ...prevState,
                        errorCode: response.errorCode,
                        errorMessage: response.errorMessage
                    };
                });
            }
        } catch (error) {
            setPageError((prevState) => {
                return {
                    ...prevState,
                    errorCode: error.errorCode,
                    errorMessage: error.errorMessage
                };
            });
        }
    }

    return (
        <PageContext.Provider value={{ page, pageError, onSave, onFetch, onUpdate, onDelete, setPage }}>
            {children}
        </PageContext.Provider>
    );
};
