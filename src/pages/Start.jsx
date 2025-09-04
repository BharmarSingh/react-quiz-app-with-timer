import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Start() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState(5)
  const [difficulty, setDifficulty] = useState('easy')
  const [timer, setTimer] = useState(30)

  function start() {
    navigate('/quiz', { state: { amount, difficulty, timer } })
  }

  return (
    <section className="card">
      <h1>QuizMaster</h1>
      <p className="muted">Choose difficulty, number of questions (5-10) and timer per question.</p>

      <div className="grid-2">
        <div>
          <label className="label">Difficulty</label>
          <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="label">Number of Questions</label>
          <input type="number" min="5" max="10" value={amount} onChange={e=>setAmount(Math.max(5, Math.min(10, Number(e.target.value)||5)))} />
        </div>

        <div>
          <label className="label">Timer (seconds)</label>
          <input type="number" min="5" max="120" value={timer} onChange={e=>setTimer(Math.max(5, Math.min(120, Number(e.target.value)||30)))} />
        </div>
      </div>

      <div className="actions">
        <button className="primary" onClick={start}>Start Quiz</button>
      </div>
    </section>
  )
}
