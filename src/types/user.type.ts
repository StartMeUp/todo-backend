import { Document } from "mongoose";

export default interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  hash: string;
  salt: string;
  token: string;
}
