const Chain = require('./chain');

const blockchain = new Chain();
blockchain.addBlock('2nd stuff');
blockchain.addBlock('third block stuff');

console.log(blockchain.blocks);
