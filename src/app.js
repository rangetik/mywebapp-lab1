const express = require("express");
const fs = require("fs");
const path = require("path");
const pool = require("./db/pool");
const inventoryController = require("./controllers/inventoryController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health/alive", (req, res) => res.status(200).send("OK"));

app.get("/health/ready", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send(`Database connection error: ${err.message}`);
  }
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
        <h1>Welcome to MyWebApp (Simple Inventory)</h1>
        <p>Business Logic Endpoints:</p>
        <ul>
            <li><a href="/items">GET /items</a> - List all items</li>
            <li>GET /items/:id - View item details</li>
        </ul>
    `);
});

app.get("/items", (req, res) => inventoryController.getAllItems(req, res));
app.post("/items", (req, res) => inventoryController.createItem(req, res));
app.get("/items/:id", (req, res) => inventoryController.getItemById(req, res));

const configPath =
  process.env.CONFIG_PATH || path.join(__dirname, "../config/config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const PORT = config.server.port || 5200;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
