import './Nav.css';
import { Link } from "react-router-dom";

export default function Nav() {


  return (
    <nav>
      <div className="logo">
        <Link to='/'>
          <div className="homepage-link"></div>
        </Link>
      </div>
      <div className="links">
        <Link to="players">
          <span>Choose player</span>
        </Link>
        <Link to="redLightGreenLight">
          <span>Play</span>
        </Link>
      </div>
    </nav>
  );
}

