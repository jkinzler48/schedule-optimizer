import { Link } from "react-router-dom";

const HomeAuth = ({ authorized, onLogoutPress, status }) => {
  return (
    <>
      {status && (
        <div className="module">
          <h3>{status}</h3>
        </div>
      )}
      {authorized ?  (
        // If user is authorized/authenticated, then show option to logout
        <div className="module">
          <h3>Logout to change user / create new user</h3>
          <div className="authButtons">
            <button onClick={onLogoutPress}>Logout</button>
          </div>
        </div>
      ) : (
        // If user is not  authorized/authenticated, then show options to login/register
        <div className="module">
          <h3>Login/Register to access "Planner" and "Optimizer" pages</h3>
          <div className="authButtons">
            <Link to="/register">
              <button>Register</button>
            </Link>
            <br />
            <br />
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeAuth;
