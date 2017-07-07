const Chain = require('./chain');

const blockchain = new Chain();

blockchain.addBlock(blockchain.generateNextBlock('2nd block'));
blockchain.addBlock(blockchain.generateNextBlock('third block'));
blockchain.addBlock(blockchain.generateNextBlock('fourth block'));

console.log(blockchain.isValidChain());
console.log(blockchain.blocks);
