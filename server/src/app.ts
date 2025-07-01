/* import express from "express";
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
//app.use(express.static(path.resolve(__dirname, "../../client/dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

export default app;
 */
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import version1API from "./routes/versions/v1/api";

const app = express();

// 1) JSON & Cookie middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) Mount your API
app.use("/v1", version1API);

// 3) Serve the client’s production build
//    (run `cd client && npm run build` first)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(
  cors({
    origin: "https://nodejs-blog-1-i9ga.onrender.com/",
    credentials: true,
  })
);
app.use("/*any", (req, res) => {
  //route that doenst match our provided routes
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
// 4) All other requests should return index.html
app.get("/*any", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

export default app;
