import app from "./app";
import { env } from "./config/env";

const port = Number(env.PORT);

app.listen(port, () => {
  console.log("🔥 BACKEND STARTED FROM THIS TERMINAL");
  console.log(`Server running on http://localhost:${port}`);
});