import Optimizer from "./Optimizer/Optimizer";
import Planner from "./Planner/Planner";
import Directions from "./Directions/Directions"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AuthRoute from "./AuthRoute/AuthRoute";
import Auth from "./Auth/Auth";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
  } from "react-router-dom";
import Register from "./Register/Register.js"
import Login from "./Login/Login.js"

export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute path="/" element={Planner} />} />
                <Route path="/auth" element={<AuthRoute path="/auth" element={Auth} />} />
                <Route path="/optimizer" element={<ProtectedRoute path="/optimizer" element={Optimizer} />} />
                <Route path="/directions" element={<Directions />} />	{/* Routing */}	
        		<Route path="/register" element={<AuthRoute path="register" element={Register} />} />
                <Route path="/login" element={<AuthRoute path="login" element={Login} />} />
        		<Route path="*" element={<Navigate to="/" replace />} />
                {/* In the future, we may add aditional pages, such as a settings/preferences page */}
            </Routes>
        </Router>
    );
}