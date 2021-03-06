/* eslint-disable no-underscore-dangle */

import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';

import config from '../config';

import template from '../client/template';
import App from '../client/components/App';

function initHTTPServer(blockchain, wsServer) {
  const server = express();
  server.use(bodyParser.json());

  server.get('/', (req, res) => {
    const app = renderToString(<App />);

    res.send(template({
      title: 'home',
      body: app,
    }));
  });

  server.get('/blocks', (req, res) => {
    res.send(JSON.stringify(blockchain));
  });

  server.post('/addBlock', (req, res) => {
    const data = req.body.data;
    const block = blockchain.generateNextBlock(data);

    blockchain.addBlock(block);
    res.send();
  });

  server.get('/peers', (req, res) => {
    const peers = wsServer.peers.map(s => `${s._socket.remoteAddress}:${s._socket.remotePort}`);
    const response = {
      peers,
    };

    res.send(response);
  });

  server.post('/addPeer', (req, res) => {
    const peers = req.body.peers;

    if (peers) {
      wsServer.connect(peers);
    }

    res.send();
  });

  return new Promise((resolve, reject) => {
    server
      .on('error', reject)
      .listen(config.HTTP_PORT, () => resolve(`HTTP server listening at :${config.HTTP_PORT}...`));
  });
}

export default initHTTPServer;
