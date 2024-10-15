import Optimizer from "./Optimizer/Optimizer";
import Planner from "./Planner/Planner";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Planner />} />
                <Route path="/optimizer" element={<Optimizer />} />
            </Routes>
            <Footer />
        </Router>
    );
}