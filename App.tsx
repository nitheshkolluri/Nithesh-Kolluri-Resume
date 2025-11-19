
import React from 'react';
import { INITIAL_DATA } from './types';
import Portfolio from './components/Portfolio';

const App: React.FC = () => {
  return (
    <Portfolio data={INITIAL_DATA} />
  );
};

export default App;
