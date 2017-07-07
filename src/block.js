class Block {
  constructor(index, prevHash, hash, timestamp, data) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = hash;
  }
}

module.exports = Block;
