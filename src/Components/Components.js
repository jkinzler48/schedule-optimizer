import Optimizer from "./Optimizer/Optimizer";
import Planner from "./Planner/Planner";
import Directions from "./Directions/Directions"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Auth from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import FileUpload from "./FileUpload/FileUpload";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
  } from "react-router-dom";


export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute path="/" element={Planner} />} />
                <Route path="/upload" element={<ProtectedRoute path="/upload" element={FileUpload} />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/optimizer" element={<ProtectedRoute path="/optimizer" element={Optimizer} />} />
                <Route path="/directions" element={<Directions />} />	{/* Routing */}	
        		<Route path="/auth/register" element={< AuthRegister />} />
                <Route path="/auth/login" element={< AuthLogin />} />
        		<Route path="*" element={<Navigate to="/" replace />} />
                {/* In the future, we may add aditional pages, such as a settings/preferences page */}
            </Routes>
        </Router>
    );
}