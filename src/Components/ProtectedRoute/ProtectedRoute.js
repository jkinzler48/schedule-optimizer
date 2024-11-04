import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../Common/Services/AuthService";

//ProtectedRoute Component that  handles all routes that should not be accessed without login
const ProtectedRoute = ({ element: Component, ...rest }) => {
 
    // if user is authenticated, load the Component, otherwise reroute them to the auth module
    if (isAuthenticated()) {
        return <Component />;
    } else {
        return (
            <Navigate to={"/auth"} replace />
        );
    }
};

export default ProtectedRoute;