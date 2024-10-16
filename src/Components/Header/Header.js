import { Link } from "react-router-dom";

const Footer = () => (
    <div className="module">
        <nav className = "headerBar">
            <Link className="navLink" to="/">Planner</Link>
            <Link className="navLink" to="/optimizer">Optimizer</Link>
            <Link className="navLink" to="/directions">Directions</Link>
        </nav>
    </div>
);

export default Footer;