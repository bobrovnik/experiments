import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  makeOnButtonClick = (id) => {
    return () => this.onButtonClick(id);
  }

  onButtonClick = (id) => {
    this.setState({
      activeButtonId: id,
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.onButtonClick(1)}></button>
        <button onClick={() => this.onButtonClick(2)}></button>
        <button onClick={this.makeOnButtonClick(3)}></button>
      </div>
    );
  }
}

export default App;
