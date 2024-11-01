import Optimizer from "./Optimizer/Optimizer";
import Planner from "./Planner/Planner";
import Directions from "./Directions/Directions"
import Header from "./Header/Header";
import Home from "./Home/Home"
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
			<Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/optimizer" element={<Optimizer />} />
                <Route path="/directions" element={<Directions />} />	{/* Routing */}	
        		<Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
        		<Route path="*" element={<Navigate to="/auth" replace />} />
                {/* In the future, we may add aditional pages, such as a settings/preferences page */}
            </Routes>
        </Router>
    );
}