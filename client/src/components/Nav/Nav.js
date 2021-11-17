import "./Nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <div className="logo-container">
        <div className="logo">
          <Link to="/">
            <div className="homepage-link"></div>
          </Link>
        </div>
      </div>
      <div className="links">
        <Link to="players">
          <span>Choose player</span>
        </Link>
        <Link to="redLightGreenLight">
          <span>Play</span>
        </Link>
        <Link to="Test">
          <span>Test</span>
        </Link>
        <Link to="doll">
          <span>Doll</span>
        </Link>
      </div>
    </nav>
  );
}
