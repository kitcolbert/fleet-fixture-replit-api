import express, { type Express, type ErrorRequestHandler } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { bookstorePage } from "./pages/bookstore";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

app.get(["/", "/api", "/api/", "/api/bookshelf"], (_req, res) => {
  res.set("Cache-Control", "no-store").type("html").send(bookstorePage);
});
app.use("/api", router);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ error: "Request body must be valid JSON." });
    return;
  }
  if (err?.type === "entity.too.large") {
    res.status(413).json({ error: "Request body is too large." });
    return;
  }

  req.log.error({ err }, "Request failed");
  res.status(500).json({ error: "Unable to complete the request. Please try again." });
};

app.use(handleError);

export default app;
