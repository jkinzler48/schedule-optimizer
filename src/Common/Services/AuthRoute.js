import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./AuthService";

//Opposite of protected route -->  loads componenet if user is NOT authenticatd, otherwise reroutes them to
//the home page.
const AuthRoute = ({ element: Component, ...rest }) => {
  return (
    <div>
      {!isAuthenticated() ? (
        <div>
          <Component />
        </div>
      ) : (
        <div>
          <Navigate to={"/"} replace />
        </div>
      )}
    </div>
  );
};

export default AuthRoute;