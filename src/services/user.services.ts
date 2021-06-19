const signup = async (data: {
  name: string;
  surname: string;
  email: string;
  password: string;
}) => {
  return { data };
};

export default { signup };
