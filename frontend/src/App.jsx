// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import api from './api';

function App() {
  const [status, setStatus] = useState('loading...');
  const [sourceCode, setSourceCode] = useState('');
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/health');
        setStatus(response.data.status);
      } catch (error) {
        const errorMessage = error?.message || 'Unknown error';
        setStatus(`error: ${errorMessage}`);
      }
    };
    checkHealth();
  }, []);

  const handleCompile = async () => {
    try {
      setError('');
      setTokens([]);
      const response = await api.post('/compile', { source_code: sourceCode });
      setTokens(response.data.tokens);
    } catch (err) {
      console.error(err);
      setError('Failed to compile. Check backend connection.');
    }
  };

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

      {/* Input Section */}
      <div className="input-section">
        <h4>Input Source Code</h4>
        <textarea
          className="code-input"
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          placeholder="Enter your code here..."
          rows={5}
        />
        <button className="compile-button" onClick={handleCompile}>
          Run Lexer
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Tokens Display */}
      {tokens.length > 0 && (
        <div className="tokens-section">
          <h4>Tokens</h4>
          <div className="tokens-grid">
            {tokens.map((token, index) => (
              <div key={index} className="token-card">
                <span className="token-type">{token.type}</span>
                <span className="token-value">{String(token.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline flow */}
      <div className="pipeline">
        {phases.map((phase, index) => (
          <div key={phase} className="phase-wrapper">
            <div className={`phase-box ${index === 1 && tokens.length > 0 ? 'active-phase' : ''}`}>
              {phase}
            </div>

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
      </div>
    </div>
  );
}

export default App;