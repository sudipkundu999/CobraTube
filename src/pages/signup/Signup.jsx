import { Link } from "react-router-dom";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../utils";
import "./signup.css";

export const Signup = () => {
  useDocumentTitle("Signup");
  const { formData, setFormData, onSubmitSignup } = useAuth();

  return (
    <main className="login-signup-main">
      <div className="login-container signup-container">
        <h2>Signup</h2>
        <form onSubmit={(e) => onSubmitSignup(e)} className="login-form">
          <label>
            First name
            <input
              className="signup-text-input"
              placeholder="Sudip"
              type="text"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              required
            />
          </label>
          <label>
            Last name
            <input
              className="signup-text-input"
              placeholder="Kundu"
              type="text"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              required
            />
          </label>
          <label>
            Email address
            <input
              className="email"
              type="email"
              placeholder="sk@cobratube.com"
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
              <input
                type="checkbox"
                id="login-remember-me"
                required
                defaultChecked
              />
              I accept all terms & conditions
            </label>
          </div>
          <input
            type="submit"
            value="Create new account"
            className="btn btn-primary m-auto"
          />
        </form>
        <Link to="/login" className="new-account">
          Already have an account {">"}
        </Link>
      </div>
    </main>
  );
};
