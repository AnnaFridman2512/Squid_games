import Mongo from 'mongodb';
import {Player} from './db/Player.model.mjs';

const {ObjectId} = Mongo;

export function getPlayers(){
    return Player.find();
}
    
export function getPlayer(id){
    return Player.findOne({_id: ObjectId(id)});
}

