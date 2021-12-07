import './HomePage.css';
import { Link } from "react-router-dom";
import Loader from '../Loader.js';

export default function HomePage(){

    return (
        <div className="home-page">
         <div className="loader-wrapper">
            <Link className="span-link" to="game">
                <Loader />
                <span>Play</span>
            </Link>
        </div>

        </div>
    )

}