import { createRequestHandler } from "@react-router/express";
import express from "express";
import { createServer } from "vite";
import expressPouch from "express-pouchdb";
import PouchDB from "pouchdb";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Set up PouchDB server with absolute path
const pouchPath = path.join(__dirname, "data") + path.sep;
const configPath = path.join(__dirname, "data", "config.json");
app.use(
  "/db",
  expressPouch(PouchDB.defaults({ prefix: pouchPath }), { configPath })
);

// Set up Vite dev server for React Router
const viteDevServer = await createServer({
  server: { middlewareMode: true },
});

app.use(viteDevServer.middlewares);

const build = () => viteDevServer.ssrLoadModule("virtual:react-router/server-build");

app.all("*", createRequestHandler({ build }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
  console.log(`PouchDB server available at http://localhost:${port}/db`);
});
