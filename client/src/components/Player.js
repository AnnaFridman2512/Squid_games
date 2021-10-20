import './Player.css';


export default function Player({
    _id,
    number,
    image
}){

    return (
        <div className="player">
            <img src={`api/${image}`} className="player-image" alt="player-img"/>
            {<button><span>Choose</span></button>}
        </div>
    );
}