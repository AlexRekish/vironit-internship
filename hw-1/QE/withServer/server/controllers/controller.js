const model = require('../model/model');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const calculateQuadraticEquation = (a, b, c) => {
  const answers = [];
  let discriminant = Math.pow(b, 2) - 4 * a * c;
  if (discriminant < 0) {
    answers.push(...getComplexAnswers(a, b, discriminant));
  } else {
    discriminant === 0 ?
      answers.push(getOneAnswer(a, b)) :
      answers.push(...getTwoAnswers(a, b, discriminant));
  }
  return answers;
};

function getComplexAnswers(a, b, D) {
  let sqrtD = `${Math.sqrt(Math.abs(D)).toFixed(2)} * i`;
  let firstAnswer = `(${-b} + ${sqrtD}) / ${2 * a}`;
  let secondAnswer = `(${-b} - ${sqrtD}) / ${2 * a}`;
  return [firstAnswer, secondAnswer];
};

function getOneAnswer(a, b) {
  return (-b / (2 * a)).toFixed(2);
};

function getTwoAnswers(a, b, D) {
  return [
    ((-b + Math.sqrt(D)) / (2 * a)).toFixed(2),
    ((-b - Math.sqrt(D)) / (2 * a)).toFixed(2)
  ]
};

const getAnswer = (a, b, c) => {
  const emitter = require('../routes/home').emitter;
  const answer = new Promise((resolve, reject) => {
    emitter.on('read', (data) => {
      resolve(JSON.parse(data));
    });
    module.exports.emitter = emitter;
    model.readData();
  });

  answer
    .then((data) => {
      let answer = model.checkAnswer(data, a, b, c);
      if (answer) {
        emitter.emit('answerReady', answer.result);
        return answer.result;
      };
      result = calculateQuadraticEquation(a, b, c);
      answer = {
        a,
        b,
        c, 
        result 
      };
      model.writeAnswer(data, answer);
      emitter.emit('answerReady', result);
      return result;
    })
    .catch((err) => {
      console.warn(err);
    });
};

module.exports = {
  qe: calculateQuadraticEquation,
  getAnswer,
  emitter
}