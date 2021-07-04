import mongoose from "mongoose";

// mongoose.connect
const database: string =
  process.env.NODE_ENV === "dev"
    ? "mongodb://localhost/todobackend"
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

export const dropAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === "ns not found") return;
      if (error.message.includes("a background operation is currently running"))
        return;

      console.log(error.message);
    }
  }
};
