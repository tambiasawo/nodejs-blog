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

app.options(
  "/v1",
  cors({ origin: "https://nodejs-blog-1-i9ga.onrender.com", credentials: true })
);
app.use(
  "/v1",
  cors({
    origin: "https://nodejs-blog-1-i9ga.onrender.com",
    credentials: true,
  }),
  version1API
);

// 3) Serve the client’s production build
//    (run `cd client && npm run build` first)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/*any", (req, res) => {
  //route that doenst match our provided routes
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
// 4) All other requests should return index.html
app.get("/*any", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

export default app;
