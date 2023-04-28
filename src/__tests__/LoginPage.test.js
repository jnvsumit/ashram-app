import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../pages/LoginPage/LoginPage";

test("renders login form", () => {
  render(<LoginPage />);
  expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
});

test("submit button is disabled when form is empty", () => {
  render(<LoginPage />);
  const submitButton = screen.getByRole("button", { name: /Login/i });
  expect(submitButton).toBeDisabled();
});

test("submit button is enabled when form is filled", () => {
  render(<LoginPage />);
  const usernameInput = screen.getByLabelText(/Username:/i);
  const passwordInput = screen.getByLabelText(/Password:/i);
  const submitButton = screen.getByRole("button", { name: /Login/i });

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  expect(submitButton).toBeEnabled();
});
