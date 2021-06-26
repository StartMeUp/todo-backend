import Model from "../models";
import { CustomError } from "../middlewares/error.middleware";
import { hashPassword } from "../utils/functions";

const signup = async (data: {
  email: string;
  password: string;
  name: string;
  surname: string;
}) => {
  //1. Destructure data
  const { email, password, name, surname } = data;

  //2. check if user already exists
  const userExists = await Model.User.exists({ email });
  if (userExists) throw new CustomError("User already exists", 409);

  //3. Create user
  const newUser = new Model.User({
    name,
    surname,
    email,
    ...hashPassword(password),
  });
  await newUser.save();

  //4. send result to ctrl
  return { token: newUser.token };
};

export default { signup };
