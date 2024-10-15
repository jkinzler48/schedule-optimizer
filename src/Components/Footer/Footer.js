import { Link } from "react-router-dom";

const Footer = () => (
    <footer>
        <nav className = "headerBar">
                <Link className="navLink" to="/">Planner</Link>
                <Link className="navLink" to="/optimizer">Optimizer</Link>
        </nav>
    </footer>
);

export default Footer;