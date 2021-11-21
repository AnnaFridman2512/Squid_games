import mongoose from "mongoose";

const dbURL = process.env.DB_URL_Y || process.env.DB_URL || "mongodb://localhost:27017/squid_game";


export const connect = () => {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongoDB is connected'))
.catch((err) => console.log(err));
};
