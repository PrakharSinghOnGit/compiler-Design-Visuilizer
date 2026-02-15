import { useState, useEffect } from 'react'
import api from './api'

function App() {
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/health')
        setStatus(response.data.status)
      } catch (error) {
        setStatus('error: ' + error.message)
      }
    }
    checkHealth()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Compiler Visualizer</h1>
        <p className="text-xl">Backend Status: <span className={status === 'ok' ? 'text-green-400' : 'text-red-400'}>{status}</span></p>
      </div>
    </div>
  )
}

export default App
