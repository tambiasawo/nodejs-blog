import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import version1API from "../src/routes/versions/v1/api";
const app = express();

//middlewares
app.use(cookieParser()); // to read saved cookies
app.use(express.json()); // enable json body in fetch requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public")); // set the dir of our public folder
app.use(cors({ origin: "http://localhost:5143/v1" })); //our frontend endpoint

app.use("/v1", version1API);
/* app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});
 */
export default app;
