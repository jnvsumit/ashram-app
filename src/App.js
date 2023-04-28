import React, { useContext, useEffect, useRef } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Book from "./pages/Book/Book";

import { AppContainer, AppContent } from "./App.styles";
import { PageContextProvider } from "./context/PageContextProvider";
import { UserContextProvider } from "./context/UserContextProvider";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import BookCardContextProvider from "./context/BookCardContextProvider";
import BookContextProvider from "./context/BookContextProvider";
import PageCardContextProvider from "./context/PageCardContextProvider";
import BookPage from "./pages/BookPage/BookPage";
import {LoadingContextProvider} from "./context/LoadingContextProvider";
import DonatePage from "./pages/DonatePage/DonatePage";

function App() {

  return (
    <Router>
      <LoadingContextProvider>
      <UserContextProvider>
        <BookCardContextProvider>
          <BookContextProvider>
            <PageCardContextProvider>
              <PageContextProvider>
                <AppContainer>
                  <Navbar />
                  <AppContent>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/books" element={<BookPage />} />
                      <Route path="/books/:id" element={<Book />} />
                      <Route path="/donate" element={<DonatePage />} />
                    </Routes>
                  </AppContent>
                  <Footer />
                </AppContainer>
                </PageContextProvider>
              </PageCardContextProvider>
            </BookContextProvider>
          </BookCardContextProvider>
        </UserContextProvider>
      </LoadingContextProvider>
    </Router>
  );
}

export default App;
