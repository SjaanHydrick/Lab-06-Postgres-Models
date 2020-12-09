require('dotenv').config();
const express = require('express');
const StevenUniverse = require('./stevenuniverse.js');
const app = express();

app.use(express.json());

app.post('/stevenuniverse', (req, res, next) => {
  StevenUniverse
    .insert(req.body)
    .then(character => res.send(character))
    .catch(next);
});

app.get('/stevenuniverse', (req, res) => {
  StevenUniverse
    .find()
    .then(characters => res.send(characters));
});

app.get('/stevenuniverse/:id', (req, res, next) => {
  StevenUniverse
    .findById(req.params.id)
    .then(characters => res.send(characters))
    .catch(next);
});

app.put('/stevenuniverse/:id', (req, res, next) => {
  StevenUniverse
    .update(req.params.id, req.body)
    .then(character => res.send(character))
    .catch(next);
});

app.delete('/stevenuniverse/:id', (req, res) => {
  StevenUniverse
    .delete(req.params.id)
    .then(characters => res.send(characters));
});

app.listen(3000, () => {
  console.log('listening on 3000');
});

module.exports = app;

