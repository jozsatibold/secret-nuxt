const express = require('express')
const {getSecret, saveSecret} = require('./services/secret.service');

const app = express();

app.use(express.json())

app.get('/secrets', (_, res) => {
  res.json({data: 'Hi!'});
});

app.post('/secrets', async (req, res) => {
  try {
    const {text, expiration} = req.body;

    if (!text) {
      res.status(400).json({message: 'Invalid text'});
      return;
    }

    // Validation of expiration time (is number and is between 5 and 120)
    if (!/[0-9]+/.test(`${expiration}` || +expiration > 120 || +expiration < 5)) {
      res.status(400).json({message: 'Invalid expiration'});
      return;
    }
    const data = await saveSecret(text, +expiration);

    res.json(data);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.get('/secrets/:id', async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      res.status(400).json({message: 'Invalid identifier'});
      return;
    }
    const data = await getSecret(id);

    res.json(data);

  } catch (error) {
    res
      .status(error.message === 'Secret not found or expired' ? 404 : 500)
      .json({message: error.message});
  }
});

module.exports = app;
