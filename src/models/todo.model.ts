import mongoose, { Schema, model, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ITodo extends Document {
  title: string;
  description: string;
  done: boolean;
  owner: IUser["_id"];
}

const todoSchema = new Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  done: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default model<ITodo>("Todo", todoSchema);
