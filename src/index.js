const BlockChain = require('./blockchain');
const initHTTPServer = require('./server/http');
const initWSServer = require('./server/websocket');

const blockchain = new BlockChain();

initWSServer()
  .then(console.log)
  .catch(console.error);

initHTTPServer(blockchain)
  .then(console.log)
  .catch(console.error);
