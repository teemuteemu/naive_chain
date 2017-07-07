/* eslint-disable class-methods-use-this */

import SHA256 from 'crypto-js/sha256';

import Block from './block';

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

  addBlock(block) {
    if (this.isValidBlock(this.getLatestBlock(), block)) {
      this.blocks.push(block);
    }
  }

  generateGenesisBlock() {
    const index = 0;
    const prevHash = null;
    const timestamp = 1499432596911;
    const data = 'genesis';
    const hash = '34a5197bd5b7ba892eabda39eba75d395ead68b2534d9105940aedf5b3a7ac90';

    return new Block(index, prevHash, hash, timestamp, data);
  }

  generateNextBlock(data) {
    const prevBlock = this.getLatestBlock();
    const index = prevBlock.index + 1;
    const timestamp = this.getTimestamp();
    const hash = this.calculateHash(index, prevBlock.hash, timestamp, data);

    return new Block(index, prevBlock.hash, hash, timestamp, data);
  }

  isValidBlock(prevBlock, block) {
    const indexOk = (block.index === prevBlock.index + 1);
    const prevHashOk = (block.prevHash === prevBlock.hash);
    const hashOk = (this.calculateHash(block.index, block.prevHash, block.timestamp, block.data)
      === block.hash);

    return indexOk && prevHashOk && hashOk;
  }

  isValidChain() {
    const checkBlock = (prevBlock, index) => {
      const block = this.blocks[index + 1];

      return block && this.isValidBlock(prevBlock, block);
    };

    return this.blocks
      .map(checkBlock)
      .filter(v => v !== undefined)
      .every(v => v);
  }
}

export default Chain;
