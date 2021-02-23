import React from 'react';
import ReactDOM from 'react-dom';
import TileButton from '../components/TileButton';

it('TileButton renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TileButton />, div);
});

