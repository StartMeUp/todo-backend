import mongoose, { Schema, model, Document, ObjectId } from "mongoose";
import { IUser } from "./user.model";

export interface ITodo extends Document {
  title: string;
  description: string;
  done: boolean;
  owner: IUser["_id"];
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default model<ITodo>("Todo", todoSchema);
