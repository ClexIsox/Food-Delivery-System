const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const app = express();
const PORT = 3000;
const foodChain = new Blockchain();

app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML/JS

// Place an order
app.post('/order', (req, res) => {
    const { studentName, foodItems, quantity } = req.body;
    if (!studentName || !foodItems) return res.status(400).send("Invalid order data");

    const order = { studentName, foodItems, quantity };
    const orderHash = foodChain.placeOrder(order);
    res.json({ orderHash });
});

// Delivery man checks order
app.get('/order/:hash', (req, res) => {
    const hash = req.params.hash;
    const order = foodChain.findOrder(hash);
    if (!order) return res.status(404).send("Order not found");
    res.json(order);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
