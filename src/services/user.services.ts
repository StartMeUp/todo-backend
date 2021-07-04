import Model from "../models";
import { CustomError } from "../middlewares/error.middleware";
import { hashPassword, checkPassword } from "../utils/functions";
import { sendEmail, emailTemplates } from "../emails/sendmail";
import todo from "../services/todo.services";
import { IUser } from "../models/user.model";

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

  const emailNotification = await sendEmail(
    { email: newUser.email, name: newUser.name },
    emailTemplates.signup
  );

  //4. send result to ctrl
  return { token: newUser.token, emailNotification };
};

const signin = async (data: { email: string; password: string }) => {
  //1. destructure data
  const { password, email } = data;

  //2. check email to get user
  const user = await Model.User.findOne({ email });
  if (!user) throw new CustomError("Unauthorized, email doesn't exist", 401);

  //3. check password
  checkPassword(user, password);

  //4. retrieve user's todos
  const todos = await todo.getAll(user);

  //5. return data
  return { token: user.token, todos };
};

const account = async (user: IUser) => {
  //1. get the user data
  const { hash, salt, ...rest } = user;
  return rest;
};

export default { signup, signin, account };
