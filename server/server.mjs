import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const __dirname = path.resolve();

import { playersRouter } from "./src/players.routs.mjs";
import { connect } from "./src/db/connect.mjs";

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cors());

app.use("/api/players", express.static(path.join(__dirname, "players"))); //adding path to use at client side to fetch pics
app.use(express.static('../client/build'));
app.use("/api/players", playersRouter);

const port = process.env.PORT || 8080; //listening to heroku port Or 8080 default

app.listen(port, () => {
  connect();
});

console.log("Server up and running on localhost: " + port);
