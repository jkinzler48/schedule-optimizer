import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../Common/Services/AuthService";

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