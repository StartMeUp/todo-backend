import IUser from "../types/user.type";
import { Schema, model } from "mongoose";

const capitalize = (str: string) =>
  str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

const userSchema = new Schema({
  name: { type: String, trim: true, required: true },
  surname: { type: String, trim: true, required: true, uppercase: true },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  token: { type: String, required: true },
});

userSchema.pre("save", function (this: IUser, next) {
  this.name = capitalize(this.name);
  next();
});

export default model<IUser>("User", userSchema);
