const pool = require("../db/pool");

class InventoryService {
  async getAllItems() {
    const query = "SELECT id, name FROM inventory ORDER BY created_at DESC";
    const { rows } = await pool.query(query);
    return rows;
  }

  async createItem(name, quantity) {
    const query =
      "INSERT INTO inventory (name, quantity) VALUES ($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [name, quantity]);
    return rows[0];
  }

  async getItemById(id) {
    const query = "SELECT * FROM inventory WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = new InventoryService();
