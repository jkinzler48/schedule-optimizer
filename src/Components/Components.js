import Optimizer from "./Optimizer/Optimizer";
import Planner from "./Planner/Planner";
import Directions from "./Directions/Directions"
import Header from "./Header/Header";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
  } from "react-router-dom";
  import AuthModule from "./Auth/Auth.js";
import AuthRegister from "./Auth/AuthRegister.js";
import AuthLogin from "./Auth/AuthLogin.js"

export default function Components() {
    return (
        <Router>
			<Header />
            <Routes>
                <Route path="/" element={<Planner />} />
                <Route path="/optimizer" element={<Optimizer />} />
                <Route path="/directions" element={<Directions />} />	{/* Routing */}	
				<Route path="/auth" element={<AuthModule />} />
        		<Route path="/register" element={<AuthRegister />} />
                <Route path="/login" element={<AuthLogin />} />
        		<Route path="*" element={<Navigate to="/auth" replace />} />
                {/* In the future, we may add aditional pages, such as a settings/preferences page */}
            </Routes>
        </Router>
    );
}