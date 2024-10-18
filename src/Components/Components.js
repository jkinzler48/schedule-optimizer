import Optimizer from "./Optimizer/Optimizer";
import Planner from "./Planner/Planner";
import Directions from "./Directions/Directions"
import Header from "./Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
    return (
        <Router>
			<Header />
            <Routes>
                <Route path="/" element={<Planner />} />
                <Route path="/optimizer" element={<Optimizer />} />
                <Route path="/directions" element={<Directions />} />
                {/* In the future, we may add aditional pages, such as a settings/preferences page */}
            </Routes>
        </Router>
    );
}