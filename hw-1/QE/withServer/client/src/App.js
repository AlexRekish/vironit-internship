import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Variable from './Variable/Variable';

class App extends Component {
  state = {
    variables: [
      {
        name: `A`,
        value: 1
      },
      {
        name: `B`,
        value: 0
      },
      {
        name: `C`,
        value: 0
      }
    ],
    answers: ``
  }

  variableChangeHandler = (evt) => {
    const [...newState] = this.state.variables;
    newState.forEach((val, i) => {
      if (val.name === evt.target.name) {
        if (val.name === `A`) {
          newState[i].value = +evt.target.value || 1
        } else newState[i].value = +evt.target.value;
      }
    }) 
    this.setState({variables: newState});
  }  

  displayAnswers(arr) {
    let count = arr.length;
    let answer = arr.map((val, i) => `x${i + 1} : ${val}`)
    return `
      Количество решений: ${count}
      ${answer.join(`
      `)}
    `
  }

  calculateButtonHandler = (evt) => {
    evt.preventDefault();
    const [a, b, c] = this.state.variables;
    const coeffs = {
      a: a.value,
      b: b.value,
      c: c.value,
    };
    return fetch(`http://localhost:3502?a=${coeffs.a}&b=${coeffs.b}&c=${coeffs.c}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          return response.json();
        }
        throw new Error(`Server responded with error`);
      })
      .then((data) => {
        this.refreshResult(data)
      })
      // .catch((err) => console.log(err));
  }

  refreshResult(data) {
    let result = this.displayAnswers(data);
    this.setState({
      answers: result
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section>
          <h2>Решение квадратных уравнений</h2>
          <p className="App-description">Квадратное уравнение - это уравнение вида a * x^2 + b * x + c = 0, 
          где коэффициенты a, b и c - любые действительные числа, причем a !== 0. 
          <br/>Для получения корней просто введите коэффициенты a, b и с в поля ниже.</p>
          <fieldset className="App-inputs">
            {
              this.state.variables.map((val, i) => (
                <Variable 
                  changed={this.variableChangeHandler}
                  value={val.value}
                  name={val.name}
                  key={val.name}
                />
              ))
            }
          </fieldset>
          <button type="button" onClick={this.calculateButtonHandler}>Рассчитать корни</button>
          <pre className="App-answer">{this.state.answers}</pre>  
        </section>  
      </div>
    );
  }
}

export default App;
