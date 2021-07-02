import { Document } from "mongoose";
import IUser from "./user.type";

export default interface ITodo extends Document {
  title: string;
  description: string;
  done: boolean;
  owner: IUser["_id"];
}
