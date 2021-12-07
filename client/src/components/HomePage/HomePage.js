import './HomePage.css';
import { Link } from "react-router-dom";
import Loader from '../Loader.js';

export default function HomePage(){

    return (
        <Link className="span-link" to="game">
            <div className="home-page">
                <div className="loader-wrapper">
                    <Loader />
                    <span>Play</span>
                </div>
            </div>
        </Link>
    )

}