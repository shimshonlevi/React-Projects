// App.tsx
import React from 'react';
import MemoryGrid from './components/MemoryGrid/MemoryGrid';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <MemoryGrid />
    </div>
  );
};

export default App;
