import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Body from './components/body'
import Header from './components/header'

class App extends Component {
  state = {
    isBodyVisible: true
  }

  onButtonClick = () => {
    this.setState({isBodyVisible: !this.state.isBodyVisible})
  }

  render() {
    return (
      <div className="App">
        <Header onButtonClick={this.onButtonClick}/>
        <Body isVisible={this.state.isBodyVisible} />
      </div>
    );
  }
}

export default App;
