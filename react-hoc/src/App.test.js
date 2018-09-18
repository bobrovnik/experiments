import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const method = (callback) => {
  const a = 1;

  callback(a, 2);
}

it('', () => {
  const c = jest.fn();
  method(c);

  expect(c).toBeCalledWithArgs(1, 2);
})