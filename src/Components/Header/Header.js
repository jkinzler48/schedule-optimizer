import { Link } from "react-router-dom";

//Navigation Section that appears on every page
const Header = () => (
    <div className="module">
        <nav className = "headerBar">
        <Link className="navLink" to="/">Home</Link>	{/* Nav bar displayed on each page */}
            <Link className="navLink" to="/planner">Planner</Link>
            <Link className="navLink" to="/optimizer">Optimizer</Link>
            <Link className="navLink" to="/directions">Directions</Link>	{/* Nav bar displayed on each page */}

        </nav>
    </div>
);

export default Header;