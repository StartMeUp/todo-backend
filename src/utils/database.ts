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
  try {
    await mongoose.connect(database, mongooseOptions);
    return "connected";
  } catch (error) {
    console.log(`mongoose.connect error: ${error.name} ${error.message}`);
  }
};

export const mongooseClose = async () => {
  await mongoose.connection.close();
  return "disconnected";
};
