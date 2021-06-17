import mongoose from "mongoose";

// mongoose.connect
const database: string =
  process.env.NODE_ENV === "dev"
    ? "mongodb://localhost/expressmongotypescript"
    : process.env.NODE_ENV === "test"
    ? "mongodb://localhost/test"
    : `${process.env.MONGO_URI}`;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

export const mongooseConnect = async () => {
  await mongoose.connect(database, mongooseOptions);
  return "connected";
};

export const mongooseClose = async () => {
  await mongoose.connection.close();
  return "disconnected";
};
