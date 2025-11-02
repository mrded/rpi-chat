import express from "express";
import expressPouch from "express-pouchdb";
import PouchDB from "pouchdb";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Set up PouchDB server with absolute path
const pouchPath = path.join(__dirname, "data") + path.sep;
const configPath = path.join(__dirname, "data", "config.json");
app.use(
  "/db",
  expressPouch(PouchDB.defaults({ prefix: pouchPath }), { configPath })
);

// Serve static files from build directory
app.use(express.static(path.join(__dirname, "build", "client")));
app.use(express.static(path.join(__dirname, "public")));

// SPA fallback - serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "client", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
  console.log(`PouchDB server available at http://localhost:${port}/db`);
});
