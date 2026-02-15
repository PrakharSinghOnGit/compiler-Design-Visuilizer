// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Replace with your actual API call
        // const response = await api.get('/health');
        // setStatus(response.data.status);

        // For development / demo purposes:
        setTimeout(() => {
          setStatus('ok');
        }, 800);
      } catch (error) {
        const errorMessage = error?.message || 'Unknown error';
        setStatus(`error: ${errorMessage}`);
      }
    };
    checkHealth();
  }, []);

  const phases = [
    "Source Code",
    "Lexical Analyzer",
    "Syntax Analyzer",
    "Semantic Analyzer",
    "Intermediate Code Generator",
    "Code Optimizer",
    "Code Generator",
    "Target Machine Code",
  ];

  return (
    <div className="app-container">
      {/* Top-right status */}
      <div className="status-badge">
        Backend:{' '}
        <span className={status === 'ok' ? 'status-ok' : 'status-error'}>
          {status}
        </span>
      </div>

      {/* Main title - centered */}
      <h3 className="main-title">Compiler Visualizer</h3>

      {/* Pipeline flow */}
      <div className="pipeline">
        {phases.map((phase, index) => (
          <div key={phase} className="phase-wrapper">
            <div className="phase-box">{phase}</div>

            {index < phases.length - 1 && (
              <div className="arrow-container">
                <div className="arrow-line" />
                <div className="arrow-head" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer area */}
      <div className="footer-area">
        <p className="subtitle">Interactive compiler pipeline visualization</p>
        <button className="start-button">Start Visualization →</button>
      </div>
    </div>
  );
}

export default App;