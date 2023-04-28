import React, {useContext, useEffect, useState} from "react";
import { apiCall } from "../../api/adapter";
import { UserContext } from "../../context/UserContextProvider";
import {
  LoginContainer,
  Title,
  FormLabel,
  TextInput,
  SubmitButton,
  BottomText,
  BottomLink,
} from "./LoginPage.styles";
import { LoadingContext } from "../../context/LoadingContextProvider";
import withLoading from "../../components/HOC/WithLoading";
import {Navigate} from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { user, onLogin } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = async (event) => {
      event.preventDefault();
      onLogin(form);
  };

  return (
      <>
        {
          !user.isLoggedIn ?
          <LoginContainer>
            <Title>Sign in to your account</Title>
            <form>
              <FormLabel htmlFor="username">Username:</FormLabel>
              <TextInput
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
              />
              <FormLabel htmlFor="password">Password:</FormLabel>
              <TextInput
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
              />
              <SubmitButton onClick={handleLogin}>Login</SubmitButton>
            </form>
          </LoginContainer> : <Navigate to={"/profile"} />
        }
      </>
  );
}

export default withLoading(LoginPage);
