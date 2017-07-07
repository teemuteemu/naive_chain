/* eslint-disable class-methods-use-this */

const SHA256 = require('crypto-js/sha256');

const Block = require('./block');

class Chain {
  constructor() {
    this.blocks = [
      this.generateGenesisBlock(),
    ];
  }

  calculateHash(index, prevHash, timestamp, data) {
    const content = `${index}${prevHash}${timestamp}${data}`;

    return SHA256(content).toString();
  }

  getTimestamp() {
    return Date.now();
  }

  getLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  addData(data) {
    const newBlock = this.generateNextBlock(data);

    this.blocks.push(newBlock);
  }

  generateGenesisBlock() {
    const index = 0;
    const prevHash = null;
    const timestamp = this.getTimestamp();
    const data = 'genesis';
    const hash = this.calculateHash(index, prevHash, timestamp, data);

    return new Block(index, prevHash, hash, timestamp, data);
  }

  generateNextBlock(data) {
    const prevBlock = this.getLatestBlock();
    const index = prevBlock.index + 1;
    const timestamp = this.getTimestamp();
    const hash = this.calculateHash(index, prevBlock.hash, timestamp, data);

    return new Block(index, prevBlock.hash, hash, timestamp, data);
  }

  validateBlock(block, prevBlock) {
    const indexOk = (block.index === prevBlock.index + 1);
    const prevHashOk = (block.prevHash === prevBlock.hash);
    const hashOk = (this.calculateHash(block.index, block.prevHash, block.timestamp, block.data)
      === block.hash);

    return indexOk && prevHashOk && hashOk;
  }
}

module.exports = Chain;
