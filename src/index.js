const BlockChain = require('./blockchain');
const initHTTPServer = require('./server/http');

const blockchain = new BlockChain();

initHTTPServer(blockchain)
  .then(msg => console.log(msg))
  .catch(e => console.error(e));
