import mongoose from "mongoose";

export const connect = () => {
  console.log();
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("mongoDB is connected"))
    .catch((err) => console.log(err));
};
