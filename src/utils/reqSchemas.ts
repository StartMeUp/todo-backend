import { z } from "zod";

interface MetadataObj {
  [key: string]: any;
}

const reqSchemas: MetadataObj = {
  "/user/signup": z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
  "user/signin": z.object({
    email: z.string().email(),
    password: z.string(),
  }),
};

export default reqSchemas;
