import {useState, createContext, useEffect} from "react";
import { apiCall } from "../api/adapter";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    isLoggedIn: false
  });

  const onLogin = async (form) => {
    try {
      const response = await apiCall(`api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const { data } = response;

      if (response.success) {
        localStorage.setItem("uAccessToken", data.accessToken);
        localStorage.setItem("uRefreshToken", data.refreshToken);
        setUser((prevUser) => {
            return  {
            ...user,
                isLoggedIn: true,
            }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onLogout = () => {
    localStorage.removeItem("uAccessToken");
    localStorage.removeItem("uRefreshToken");

    setUser({
      name: '',
      email: '',
      username: '',
      phone: '',
      isLoggedIn: false
    });
  }

  const onUserFetch = async () => {
    try {
        const response = await apiCall("api/user", {
            method: "GET"
        });
        const { data } = response;

        if(response.success) {
            setUser({
            name: data.fullname,
            email: data.email,
            username: data.username,
            phone: data.phone,
            isLoggedIn: true
            });
        }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!user.isLoggedIn) {
        onUserFetch();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, onUserFetch, onLogin, onLogout }}>
      {children}
    </UserContext.Provider>
  );
};
