import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

export default function Results(){
  const { state } = useLocation()
  const navigate = useNavigate()
  if(!state || !state.answers) return <section className="card"><h2>No results</h2><Link to='/'>Back</Link></section>
  const { answers, score, total } = state

  return (
    <section className="card">
      <h1>Results</h1>
      <p className="lead">You scored <strong>{score}</strong> / {total}</p>
      <div className="results">
        {answers.map((a,i)=>(
          <div key={i} className={`result ${a.isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>Q{i+1}. {a.question}</h3>
            <p>Your: <strong>{a.selected !== null ? a.options[a.selected] : '— (no answer)'}</strong></p>
            <p>Correct: <strong>{a.options[a.correct]}</strong></p>
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="secondary" onClick={()=>navigate('/')}>Restart</button>
        <Link to="/" className="primary">Home</Link>
      </div>
    </section>
  )
}
