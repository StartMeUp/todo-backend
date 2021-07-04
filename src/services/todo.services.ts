import Model from "../models";
import { CustomError } from "../middlewares/error.middleware";
import { ITodo } from "../models/todo.model";
import { IUser } from "../models/user.model";

const getAll = async (user: IUser) => {
  return { todos: await Model.Todo.find({ owner: user }).lean() };
};

const add = async (data: { todo: Partial<ITodo>; user: IUser }) => {
  //0. Destructure data
  const { todo, user } = data;

  //1. define todo's owner
  todo.owner = user;

  //2. create new todo
  const newTodo = new Model.Todo(todo);

  //3. save new todo
  await newTodo.save();

  return await getAll(user);
};

const update = async (data: { todo: Partial<ITodo>; user: IUser }) => {
  //1. destructure data
  const { todo, user } = data;
  const userId = user._id.toString();
  const { _id: todoId, owner, ...rest } = todo;

  //2. make sure user is owner
  if (userId !== owner) throw new CustomError("Error, user is not the owner");

  //3. update todo
  await Model.Todo.findByIdAndUpdate(todoId, rest);

  //4. return user's todo list
  return await getAll(user);
};

export default { getAll, add, update };
