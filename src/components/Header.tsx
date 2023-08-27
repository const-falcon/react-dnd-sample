import "./Header.css";
import logo from "../assets/logo.svg";

const Header = () => (
  <div id="header">
    <img src={logo} className="logo" alt="logo" />
  </div>
);

export default Header;
