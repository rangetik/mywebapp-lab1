const pool = require("./pool");

async function migrate() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS inventory (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            quantity INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  try {
    console.log("Початок міграції");
    await pool.query(createTableQuery);
    console.log("Міграція успішна: таблиця готова до роботи.");
  } catch (err) {\
    console.error("Помилка під час міграції:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
