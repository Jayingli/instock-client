import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/InStock-Logo_2x.png";
import "./Header.scss";

function Header() {
    return (
        <header className="header">
            <div className="header__container">
                {/* The logo image of the application - links to Home Page */}
                <Link to="/" className="header__home">
                    <img className="header__logo" src={logo} alt="InStock Logo" />
                </Link>

                {/* Navigation Menu */}
                <ul className="header__nav">
                    <li>
                        <NavLink
                            exact
                            to="/warehouses"
                            className="header__nav-item"
                        >
                            Warehouses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            to="/inventories"
                            className="header__nav-item"
                        >
                            Inventory
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;