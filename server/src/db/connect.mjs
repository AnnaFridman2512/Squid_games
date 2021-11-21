import mongoose from "mongoose";

export const connect = () => {
  console.log();
  mongoose
    .connect(process.env.DB_URL || "mongodb://localhost:27017/squid_game")
    .then(() => console.log("mongoDB is connected"))
    .catch((err) => console.log(err));
};
