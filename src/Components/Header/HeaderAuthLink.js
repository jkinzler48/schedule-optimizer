import { Link } from "react-router-dom";

const AuthLinks = ({ authorized, onLogoutPress }) => {
  return (
    <> 
      {authorized ? (
        <button onClick={onLogoutPress} className="navLink">Logout</button> 
      ) : (
        // If user is not  authorized/authenticated, then show options to login/register
        <Link className="navLink" to="/auth">Login/Register</Link> // Display Login/Register link if not authenticated
      )}
    </>
  );
};

export default AuthLinks;