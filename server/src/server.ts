import "dotenv/config";
import { mongoConnect } from "./utils/mongo";
import http from "http";

import app from "./app";

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log("listening on port ", PORT);
  });
};

startServer();
