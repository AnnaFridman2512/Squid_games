import Mongo from 'mongodb';
import {Player} from './db/Player.model.mjs';

const {ObjectId} = Mongo;

export async function addPlayer(req, res){
    try{
         const player = new Player({
            name: req.body.name,
            score: req.body.score
        })

        await Player.findOne({name: player.name}, function(err, existingPlayer){
             if(existingPlayer === null){
                player.save();
                res.status(201).send(`${player.name} Created`);
            }else{
                existingPlayer = null;
                res.send(`${player.name} already exists`);

            }
        })
     } catch(error){
         res.status(400).send(error.message);
     }
}

export function getPlayers(){
    return Player.find();
}
    
export function getPlayer(id){
    return Player.findOne({_id: Object(id)});
}

export async function deletePlayer(id){
    return Player.findOneAndDelete({ _id: ObjectId(id) });
}