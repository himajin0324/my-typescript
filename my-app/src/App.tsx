/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
import { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  const inc = () => setCount((c) => c + 1);
  const dec = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <main className="page">
      <div className="card">
        <header className="header">
          <h1 className="title">Counter</h1>
          <span className="badge">TS + React</span>
        </header>

        <div className="display" aria-live="polite" aria-atomic="true">
          {count}
        </div>

        <div className="controls" role="group" aria-label="counter controls">
          <button className="btn ghost" onClick={dec} aria-label="decrement">
            −
          </button>
          <button className="btn primary" onClick={inc} aria-label="increment">
            ＋
          </button>
          <button className="btn subtle" onClick={reset} aria-label="reset">
            Reset
          </button>
        </div>

        <footer className="hint">
          <kbd>＋</kbd>/<kbd>−</kbd> で増減、<kbd>Reset</kbd>で0に戻す
        </footer>
      </div>
    </main>
  );
}