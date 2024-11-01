import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  return (
    // if user is authenticated, load the Component, otherwise reroute them to the auth module
    <div>
      {isAuthenticated() ? (
        <div>
          <Component />
        </div>
      ) : (
        <div>
          <Navigate to={"/auth"} replace />
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;