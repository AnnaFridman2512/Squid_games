import express from 'express';
import cors from 'cors';
import { connect } from './db/connect.mjs';

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(cors());


const port = process.env.PORT || 8080; //listening to heroku port Or 8080 default

app.listen(port, () => {
    connect();
});

console.log("Server up and running on localhost: " + port);