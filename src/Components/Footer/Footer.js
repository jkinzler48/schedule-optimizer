import { Link } from "react-router-dom";

const Footer = () => (
    <footer>
        <nav>
            <ul>
                <li>
                    <Link to="/">Planner</Link>
                </li>
                <li>
                    <Link to="/optimizer">Optimizer</Link>
                </li>
            </ul>
        </nav>
    </footer>
);

export default Footer;