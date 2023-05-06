import React, { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { LoginContainer } from "./LoginPage.styles";
import { LoadingContext } from "../../context/LoadingContextProvider";
import withLoading from "../../components/HOC/WithLoading";
import { Navigate } from "react-router-dom";
import Formp, {ComponentTypes, InputTypes} from "../../components/Form/Formp";

function LoginPage() {
  const { user, onLogin } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);

  const handleLogin = async (data) => {
    onLogin(data);
  };

  return (
      <>
        {
          !user.isLoggedIn ?
          <LoginContainer>
            <Formp
                onSubmit={handleLogin}
                formLabel="Sign in to your account"
                submitLabel="Sign in"
                elements={
                [
                  {
                    componentType: ComponentTypes.TEXT,
                    type: InputTypes.TEXT.TEXT,
                    name: "username",
                    label: "Username",
                    placeholder: "Enter your username",
                    required: true
                  },
                  {
                    componentType: ComponentTypes.TEXT,
                    type: InputTypes.TEXT.PASSWORD,
                    name: "password",
                    label: "Password",
                    placeholder: "Enter your password",
                    required: true
                  }
                ]
            }
            />
          </LoginContainer> : <Navigate to={"/profile"} />
        }
      </>
  );
}

export default withLoading(LoginPage);
