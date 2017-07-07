import BlockChain from './blockchain';
import initHTTPServer from './server/http';
import wsServer from './server/websocket';

const blockchain = new BlockChain();

wsServer.init()
  .then(console.log)
  .catch(console.error);

initHTTPServer(blockchain, wsServer)
  .then(console.log)
  .catch(console.error);
