import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDocumentTitle } from "../../utils";
import "./user.css";

export const User = () => {
  useDocumentTitle("User Profile");
  const { userData } = useSelector((state) => state.auth);

  return (
    <main className="user-main">
      <div className="heading">User Profile</div>
      <div className="profile-details-wrapper">
        <h2 className="profile-heading">Profile Details</h2>
        <div className="avatar avatar-l">
          {userData.firstName.charAt(0) + userData.lastName.charAt(0)}
        </div>
        <div className="profile-details">
          <ul className="list-heading">
            <li>First Name :</li>
            <li>Last Name :</li>
            <li>Email :</li>
          </ul>
          <ul className="list-content">
            <li>{userData.firstName}</li>
            <li>{userData.lastName}</li>
            <li>{userData.email}</li>
          </ul>
        </div>
      </div>
    </main>
  );
};
