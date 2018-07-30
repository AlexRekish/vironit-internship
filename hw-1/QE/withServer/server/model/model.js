const fs = require('fs');
const readData = () => fs.readFile(`./model/answers.json`, `utf-8`, (err, data) => {
  if (err) throw new Error(err);
  console.log(`reading file...`);
  const emitter = require('../controllers/controller').emitter;
  emitter.emit('read', data);
  return data;
});

const checkAnswer = (data, firstCoeff, secondCoeff, thirdCoeff) => {
  const [answer] = data.filter((val) => val.a === firstCoeff && val.b === secondCoeff && val.c === thirdCoeff);
  if (answer) {
    console.log('found answer');
    return answer;
  } else return false;
};

const writeAnswer = (data, answer) => {
  const answers = data.slice();
  answers.push(answer);
  const json = JSON.stringify(answers);
  fs.writeFile(`./model/answers.json`, json, (err) => {
    if (err) throw new Error(err);
    console.log(`successful write`);
  })
};

module.exports = {
  readData,
  checkAnswer,
  writeAnswer
};