import './HomePage.css';
import { Link } from "react-router-dom";
import Loader from '../../Loader';

export default function HomePage(){

    return (
        <div className="home-page">
        <Link className="span-link" to="game">
          <span>Play</span>
        </Link>
        <Loader />
        </div>
    )

}