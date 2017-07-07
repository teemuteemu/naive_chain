const BlockChain = require('./blockchain');
const initHTTPServer = require('./server/http');
const wsServer = require('./server/websocket');

const blockchain = new BlockChain();

wsServer.init()
  .then(console.log)
  .catch(console.error);

initHTTPServer(blockchain, wsServer)
  .then(console.log)
  .catch(console.error);
