import app from "./app";
import { mongooseConnect } from "./utils/database";

(async () => {
  try {
    let dbConnect = await mongooseConnect();
    console.log(dbConnect);
    if (dbConnect) {
      app.listen(process.env.PORT, (): void => {
        console.log(
          `Environment => ${process.env.NODE_ENV}, on port ${process.env.PORT}`
        );
      });
    }
  } catch (error) {
    console.log(`Error: ${error.name} ${error.message}`);
  }
})();
