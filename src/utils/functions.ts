// Libraries
import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";
import uid2 from "uid2";
import { CustomError } from "../middlewares/error.middleware";

// response sent to the client
export const response = (
  success: boolean,
  message: string,
  data: { [key: string]: any } | null
) => {
  const res = { success, message, data };
  return res;
};

// get encryption keys for user
export const hashPassword = (password: string) => {
  const salt: string = uid2(16);
  const hash: string = SHA256(password + salt).toString(encBase64);
  const token: string = uid2(16);
  return { salt, hash, token };
};

// check user password
export const checkPassword = (user: any, password: string) => {
  if (SHA256(password + user.salt).toString(encBase64) !== user.hash)
    throw new CustomError("Unauthorized, wrong password", 401);
};
