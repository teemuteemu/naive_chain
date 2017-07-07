class Block {
  constructor(index, prevHash, hash, timestamp, data) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.prevHash = prevHash;
  }
}

export default Block;
