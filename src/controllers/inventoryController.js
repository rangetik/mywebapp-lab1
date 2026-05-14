const inventoryService = require("../services/inventoryService");

class InventoryController {
  async sendResponse(req, res, data, htmlTemplate) {
    const accept = req.get("Accept");

    if (accept && accept.includes("application/json")) {
      return res.json(data);
    } else {
      res.setHeader("Content-Type", "text/html");
      return res.send(htmlTemplate(data));
    }
  }

  async getAllItems(req, res) {
    const items = await inventoryService.getAllItems();
    return this.sendResponse(
      req,
      res,
      items,
      (data) => `
            <h1>Inventory List</h1>
            <table border="1">
                <tr><th>ID</th><th>Name</th></tr>
                ${data.map((i) => `<tr><td>${i.id}</td><td>${i.name}</td></tr>`).join("")}
            </table>
        `,
    );
  }

  async getItemById(req, res) {
    const item = await inventoryService.getItemById(req.params.id);
    if (!item) return res.status(404).send("Not Found");

    return this.sendResponse(
      req,
      res,
      item,
      (i) => `
            <h1>Item Details</h1>
            <p><strong>ID:</strong> ${i.id}</p>
            <p><strong>Name:</strong> ${i.name}</p>
            <p><strong>Quantity:</strong> ${i.quantity}</p>
            <p><strong>Created At:</strong> ${i.created_at}</p>
        `,
    );
  }

  async createItem(req, res) {
    const { name, quantity } = req.body;
    if (!name || !quantity) return res.status(400).send("Missing fields");

    await inventoryService.createItem(name, parseInt(quantity));
    res.status(201).send("Item created");
  }
}

module.exports = new InventoryController();
