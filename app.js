const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");

const app = express();
const PORT = 3000;
const chain = new Blockchain();


app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/order", (req, res) => {
  console.log("📥 Incoming:", req.body);

  const { studentName, foodItems, quantity } = req.body;

  if (!studentName || !foodItems || foodItems.length === 0) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const order = { studentName, foodItems, quantity, time: new Date().toISOString() };

  const hash = chain.placeOrder(order);
  console.log("🔐 Generated hash:", hash);

  res.json({ orderHash: hash });
});

app.get("/order/:hash", (req, res) => {
  const order = chain.findOrder(req.params.hash);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

app.listen(PORT, () => {
  console.log("🚀 Server running at http://localhost:" + PORT);
});
