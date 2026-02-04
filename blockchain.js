const crypto = require('crypto');


class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data; // order details
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingOrders = [];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    placeOrder(order) {
        const newBlock = new Block(this.chain.length, Date.now(), order, this.getLatestBlock().hash);
        this.addBlock(newBlock);
        return newBlock.hash; // return order hash
    }

    findOrder(hash) {
        return this.chain.find(block => block.hash === hash)?.data || null;
    }
}

module.exports = Blockchain;
