import express from 'express';
import {getPlayers, getPlayer} from './players.service.mjs';


export const playersRouter = express.Router();

//Get all players
playersRouter.get('/', async (req, res) => {
    try{
        res.send(await getPlayers(req.query));
    }catch(e){
        res.status(400);
        res.send(e.message);
    }
})

//Get single player
playersRouter.get('/:id', async (req, res) => {
    res.send(await getPlayer(req.params.id));
})

