import { Link } from "react-router-dom";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import "./login.css";

export const Login = () => {
  useDocumentTitle("Login");
  const { formData, setFormData, onSubmitLogin, loginAsGuest } = useAuth();

  return (
    <main className="login-signup-main">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={(e) => onSubmitLogin(e)} className="login-form">
          <label>
            Email address
            <input
              className="email"
              type="email"
              id="login-email"
              placeholder="user@cobratube.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
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
                setFormData((prev) => ({ ...prev, password: e.target.value }))
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
              onClick={() => loginAsGuest()}
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
