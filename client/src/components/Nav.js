import './Nav.css';
import {Link} from "react-router-dom";

export default function Nav() {
    
    return (
      <nav>
        <div className="logo">
          <Link to='/'>
            <div className="homepage-link"></div>
            </Link>
        </div>
        <div className="links">
          <Link to="choosePlayer">
            Choose player
          </Link>
          <Link to="Canvas">
            Play
          </Link>
        </div>
      </nav>
    );
  }