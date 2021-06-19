import app from "./app";
import { mongooseConnect } from "./utils/database";

mongooseConnect();

try {
  app.listen(process.env.PORT, (): void => {
    console.log(
      `Environment => ${process.env.NODE_ENV}, on port ${process.env.PORT}`
    );
  });
} catch (error) {
  console.log(`DB Error: ${error.name} ${error.message}`);
}
