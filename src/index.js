const express = require('express');
const bodyParser = require('body-parser');

const Chain = require('./blockchain/chain');
const config = require('./config');

const blockchain = new Chain();

const app = express();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
app.post('/add', (req, res) => {
  const data = req.body.data;
  const block = blockchain.generateNextBlock(data);

  blockchain.addBlock(block);
  res.send();
});

app.listen(config.HTTP_PORT, () => console.log(`Listening :${config.HTTP_PORT}...`));
