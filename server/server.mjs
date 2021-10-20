import express from 'express';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();

import {playersRouter} from './src/players.routs.mjs';
import { connect } from './src/db/connect.mjs';

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors());

app.use('/api/players', express.static(path.join(__dirname, 'players'))); //adding path to use at client side to fetch pics


app.use('/api/players',playersRouter);


const port = process.env.PORT || 8080; //listening to heroku port Or 8080 default

app.listen(port, () => {
    connect();
});

console.log("Server up and running on localhost: " + port);