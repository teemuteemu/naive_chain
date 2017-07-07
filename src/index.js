const Chain = require('./chain');

const blockchain = new Chain();
blockchain.addData('2nd stuff');
blockchain.addData('third block stuff');

console.log(blockchain.blocks);
