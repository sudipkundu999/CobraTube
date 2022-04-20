import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notifyError, notifyInfo, notifySuccess, useAxios } from "../utils";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFromState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFromState);
  const [userName, setUserName] = useState("Login");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  //Login
  const {
    response: responseLogin,
    error: errorLogin,
    operation: operationLogin,
  } = useAxios();

  const onSubmitLogin = (e) => {
    e.preventDefault();
    operationLogin({
      method: "post",
      url: "/api/auth/login",
      headers: { accept: "*/*" },
      data: { email: formData.email, password: formData.password },
    });
  };

  const loginAsGuest = () => {
    operationLogin({
      method: "post",
      url: "/api/auth/login",
      headers: { accept: "*/*" },
      data: { email: "neog@cobratube.com", password: "neogcamp" },
    });
  };

  useEffect(() => {
    if (responseLogin !== undefined) {
      setUserName(responseLogin.foundUser.firstName);
      setIsUserLoggedIn(true);
      setUserData({
        firstName: responseLogin.foundUser.firstName,
        lastName: responseLogin.foundUser.lastName,
        email: responseLogin.foundUser.email,
        password: formData.password || "cobrastore",
      });
      setFormData(initialFromState);
      notifySuccess("Login Successful");
      localStorage.setItem("cobraToken", responseLogin.encodedToken);
      navigate(location.state?.from?.pathname || "/user");
    }
  }, [responseLogin]);
  useEffect(
    () => errorLogin !== "" && notifyError("Invalid Email or Password"),
    [errorLogin]
  );

  //Signup
  const {
    response: responseSignup,
    error: errorSignup,
    operation: operationSignup,
  } = useAxios();

  const onSubmitSignup = (e) => {
    e.preventDefault();
    operationSignup({
      method: "post",
      url: "/api/auth/signup",
      headers: { accept: "*/*" },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      },
    });
  };

  useEffect(() => {
    if (responseSignup !== undefined) {
      setUserName(
        formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1)
      );
      setIsUserLoggedIn(true);
      setUserData({
        firstName: responseSignup.createdUser.firstName,
        lastName: responseSignup.createdUser.lastName,
        email: responseSignup.createdUser.email,
        password: responseSignup.createdUser.password,
      });
      setFormData(initialFromState);
      notifySuccess("Signup Successful");
      notifyInfo(
        "CobraStore currently runs on mock backend so signup details won't persist on page reload"
      );
      localStorage.setItem("cobraToken", responseSignup.encodedToken);
      navigate("/videos");
    }
  }, [responseSignup]);

  useEffect(
    () => errorSignup !== "" && notifyError("Email Already Exists"),
    [errorSignup]
  );

  //First Page load verify
  const { response: responseVerifyUser, operation: operationVerifyUser } =
    useAxios();
  useEffect(() => {
    operationVerifyUser({
      method: "post",
      url: "/api/auth/verify",
      headers: {
        accept: "*/*",
      },
      data: { encodedToken: localStorage.getItem("cobraToken") },
    });
  }, []);
  useEffect(() => {
    if (responseVerifyUser !== undefined) {
      setUserName(responseVerifyUser.user.firstName);
      setIsUserLoggedIn(true);
      setUserData({
        firstName: responseVerifyUser.user.firstName,
        lastName: responseVerifyUser.user.lastName,
        email: responseVerifyUser.user.email,
        password: responseVerifyUser.user.password,
      });
      setTimeout(() => {
        notifySuccess(`Welcome back ${responseVerifyUser.user.firstName}`);
      }, 1000);
    }
  }, [responseVerifyUser]);

  const logoutHandler = () => {
    setUserName("Login");
    setIsUserLoggedIn(false);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    localStorage.removeItem("cobraToken");
    notifySuccess("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        onSubmitLogin,
        onSubmitSignup,
        userName,
        isUserLoggedIn,
        logoutHandler,
        userData,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
