import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../Common/Services/AuthService";


 //ProtectedRoute Component that  handles all routes that should not be accessed when already logged in
//Opposite of protected route -->  loads componenet if user is NOT authenticatd, otherwise reroutes them to
//the home page.
const AuthRoute = ({ element: Component, ...rest }) => {

    // if user is not authenticated, load the Component, otherwise reroute them to the planner module
    if (!isAuthenticated()) {
        return <Component />;
    } else {
        return (
            <Navigate to={"/"} replace />
        );
    }
};

export default AuthRoute;