// Libraries
import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";
import uid2 from "uid2";

// response sent to the client
export const response = (
  success: boolean,
  message: string,
  data: object | null | undefined
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
