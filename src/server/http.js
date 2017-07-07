const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');

function initHTTPServer(blockchain) {
  const server = express();
  server.use(bodyParser.json());

  server.get('/blocks', (req, res) => {
    res.send(JSON.stringify(blockchain));
  });

  server.post('/addBlock', (req, res) => {
    const data = req.body.data;
    const block = blockchain.generateNextBlock(data);

    blockchain.addBlock(block);
    res.send();
  });

  return new Promise((resolve, reject) => {
    server
      .on('error', reject)
      .listen(config.HTTP_PORT, () => resolve(`HTTP server listening at :${config.HTTP_PORT}...`));
  });
}

module.exports = initHTTPServer;
