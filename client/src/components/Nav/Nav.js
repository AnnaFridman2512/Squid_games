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

    </nav>
  );
}
