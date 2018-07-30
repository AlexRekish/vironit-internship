const express = require('express');
const Joi = require('joi');
const controller = require('../controllers/controller');
const router = express.Router();
const EventEmitter = require('events');
const emitter = new EventEmitter();

const validateCoeffs = (coeffs) => {
  const schema = {
    a: Joi.number().required(),
    b: Joi.number().required(),
    c: Joi.number().required(),
  };
  return Joi.validate(coeffs, schema);
};


// router.options(`/`, (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.end();
// })

router.get(`/`, (req, res) => {
  const coeffs = {
    a: req.query.a,
    b: req.query.b,
    c: req.query.c,
  }
  const {error} = validateCoeffs(coeffs);
  if (error) return res.status(400).send(error.details[0].message);
  const {a, b, c} = coeffs;
  emitter.on('answerReady', (result) => {
    return res.send(result);
  });
  module.exports.emitter = emitter;
  controller.getAnswer(a, b, c);
});

module.exports = {
  router,
  emitter
};