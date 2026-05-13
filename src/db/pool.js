const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const configPath =
  process.env.CONFIG_PATH || path.join(__dirname, "../../config/config.json");

let config;
try {
  const rawData = fs.readFileSync(configPath, "utf8");
  config = JSON.parse(rawData);
} catch (error) {
  console.error(
    `Помилка читання конфігу за шляхом ${configPath}:`,
    error.message,
  );
  process.exit(1);
}

const pool = new Pool(config.database);

pool.on("connect", () => {
  console.log("Успішно підключено до PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Несподівана помилка в пулі PostgreSQL:", err);
});

module.exports = pool;
