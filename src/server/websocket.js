import WebSocket from 'ws';
import config from '../config';

const peers = [];

function initConnection(ws) {
  console.log('Connection opened');
  peers.push(ws);

  const closeConnection = (_ws) => {
    console.log('Connection closed');
    peers.splice(peers.indexOf(_ws), 1);
  };

  const onMessage = (data) => {
    const message = JSON.parse(data);

    console.log(message);
    /*
    switch (message.type) {
    }
    */
  };

  ws.on('close', closeConnection);
  ws.on('error', closeConnection);
  ws.on('message', onMessage);
}

function init() {
  const wsOptions = {
    port: config.WS_PORT,
  };

  const server = new WebSocket.Server(wsOptions);

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.on('listening', () => resolve(`WebSocket server listening at :${config.WS_PORT}...`));
    server.on('connection', initConnection);
  });
}

function connect(peersToConnect) {
  peersToConnect.forEach((peer) => {
    const ws = new WebSocket(peer);
    ws.on('open', () => initConnection(ws));
  });
}

const wsServer = {
  init,
  connect,
  peers,
};

export default wsServer;
