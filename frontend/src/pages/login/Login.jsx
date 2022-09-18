import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, loginAsGuest, setFromData } from "../../features";
import { useDocumentTitle } from "../../utils";
import "./login.css";

export const Login = () => {
  useDocumentTitle("Login");
  const dispatch = useDispatch();
  const { formData, isUserLoggedIn } = useSelector((state) => state.auth);

  return (
    <main className="login-signup-main">
      <div className="login-container">
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(login());
          }}
          className="login-form"
        >
          <label>
            Email address
            <input
              className="email"
              type="email"
              id="login-email"
              placeholder="user@cobratube.com"
              value={formData.email}
              onChange={(e) =>
                dispatch(setFromData({ type: "email", value: e.target.value }))
              }
              required
            />
          </label>
          <label>
            Password
            <input
              className="password"
              type="password"
              id="login-password"
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                dispatch(
                  setFromData({ type: "password", value: e.target.value })
                )
              }
              required
            />
          </label>
          <div className="login-password-cta">
            <label>
              <input type="checkbox" id="login-remember-me" defaultChecked />
              Remember me
            </label>
            <div
              className="btn btn-link admin-login"
              onClick={() => dispatch(loginAsGuest())}
            >
              Login as Guest
            </div>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary m-auto"
          />
        </form>
        <Link to="/signup" className="new-account">
          Create a new account &gt;
        </Link>
      </div>
    </main>
  );
};
