import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  window.io = () => {
    return {
      on: () => {}
    }
  }
  ReactDOM.render(<App />, div);
});
