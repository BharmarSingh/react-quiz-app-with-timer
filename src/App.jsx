import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Start from './pages/Start.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="app-header" role="banner">
        <Link to="/" className="brand">QuizMaster</Link>
        <nav aria-label="Main nav">
          <Link to="/" className="nav-link">Start</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/results" className="nav-link">Results</Link>
        </nav>
      </header>

      <main className="container" role="main">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </main>
    </div>
  )
}
