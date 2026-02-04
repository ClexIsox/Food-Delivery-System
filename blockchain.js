const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.createHash("sha256")
      .update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash)
      .digest("hex");
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    block.previousHash = this.getLatestBlock().hash;
    block.hash = block.calculateHash();
    this.chain.push(block);
  }

  placeOrder(order) {
    const block = new Block(this.chain.length, Date.now(), order, this.getLatestBlock().hash);
    this.addBlock(block);
    return block.hash; // ✅ HASH GENERATED HERE
  }

  findOrder(hash) {
    const block = this.chain.find(b => b.hash === hash);
    return block ? block.data : null;
  }
}

module.exports = Blockchain;
