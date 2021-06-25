import { z } from "zod";
import reqSchemas from "../utils/reqSchemas";

const signup = async (data: z.infer<typeof reqSchemas["/user/signup"]>) => {
  return data;
};

export default { signup };
