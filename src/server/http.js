const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');

function initHTTPServer(blockchain) {
  const app = express();
  app.use(bodyParser.json());

  app.get('/blocks', (req, res) => {
    res.send(JSON.stringify(blockchain));
  });

  app.post('/addBlock', (req, res) => {
    const data = req.body.data;
    const block = blockchain.generateNextBlock(data);

    blockchain.addBlock(block);
    res.send();
  });

  return new Promise((resolve, reject) => {
    app
      .on('error', reject)
      .listen(config.HTTP_PORT, () => resolve(`Listening :${config.HTTP_PORT}...`));
  });
}

module.exports = initHTTPServer;
