import app from "./app";
import { env } from "./config/env";
import {connectDB} from './config/db';

const port = Number(env.PORT);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
    console.log("🔥 BACKEND STARTED FROM THIS TERMINAL");
    console.log(`Server running on http://localhost:${port}`);
    });
  }
  catch(error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
}

startServer();
