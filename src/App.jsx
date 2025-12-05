import React, { useState } from 'react';
import NeuralNetwork from './components/NeuralNetwork';
import Controls from './components/Controls';
import './index.css';

function App() {
  const [layers, setLayers] = useState([4, 6, 6, 4, 2]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Neural Network Visualizer</h1>
      </header>

      <main className="main-content">
        <NeuralNetwork layers={layers} />
        <Controls layers={layers} setLayers={setLayers} />
      </main>
    </div>
  );
}

export default App;
