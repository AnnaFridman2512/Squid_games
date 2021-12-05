import "./Player.css";
import { useContext } from "react";
import { PlayersContext } from "../Players/PlayersContext.js";
import { Link } from "react-router-dom";
export default function Player({ _id, number, image }) {
  const { choosePlayer } = useContext(PlayersContext);

  return (
    <div className="player">
      <img
        src={`api/players/${image}`}
        className="player-image"
        alt="player-img"
      />
      <div className="choose-player">
        <p className="player-number">Player {number}</p>
        {
          <button onClick={() => choosePlayer(number)}>
            
            <Link className="link" to="game">
            <span >Choose</span>
            </Link>
          </button>
        }
      </div>
    </div>
  );
}
