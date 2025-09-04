import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import data from '../data/questions.json'
import Timer from '../components/Timer.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function Quiz(){
  const navigate = useNavigate()
  const { state } = useLocation()
  const settings = state || { amount: 5, difficulty: 'easy', timer: 30 }

  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [resetSignal, setResetSignal] = useState(0)

  useEffect(()=>{
    // filter by difficulty and pick amount
    const pool = data.filter(q=>q.difficulty === settings.difficulty)
    // if not enough questions, fallback to pool of all difficulties
    const source = pool.length >= settings.amount ? pool : data
    // simple shuffle
    const shuffled = [...source].sort(()=>Math.random()-0.5).slice(0, settings.amount)
    setQuestions(shuffled)
    setIndex(0); setSelected(null); setLocked(false); setAnswers([]); setScore(0)
    setResetSignal(s=>s+1)
  },[settings.amount, settings.difficulty])

  const total = questions.length
  const current = questions[index]

  useEffect(()=>{
    // reset per question
    setSelected(null); setLocked(false); setResetSignal(s=>s+1)
  },[index])

  function lockAnswer(sel){
    if(locked) return
    const isCorrect = sel === current.correctIndex
    const entry = { selected: sel, correct: current.correctIndex, isCorrect, question: current.question, options: current.options }
    setAnswers(prev=>{ const c=[...prev]; c[index]=entry; return c })
    if(isCorrect) setScore(s=>s+1)
    setLocked(true)
  }

  function handleNext(){
    if(!locked) return
    if(index+1 < total) setIndex(i=>i+1)
    else navigate('/results', { state: { answers, score, total } })
  }

  function handleExpire(){
    // auto-lock with null selection
    if(!locked) lockAnswer(null)
  }

  if(total===0) return <section className="card"><p>Loading questions…</p></section>

  const progressCurrent = Math.min(index + (locked?1:0), total)

  return (
    <section className="card">
      <div className="quiz-top">
        <ProgressBar current={progressCurrent} total={total} />
        <div className="muted">Question {index+1} of {total}</div>
      </div>

      <Timer seconds={settings.timer} running={!locked} onExpire={handleExpire} resetSignal={resetSignal} />

      <h2 className="question">Q{index+1}. {current.question}</h2>
      <ul className="options">
        {current.options.map((opt,i)=>{
          const sel = selected === i
          return (
            <li key={i} className={`option ${sel ? 'selected' : ''}`}>
              <label>
                <input type="radio" name="opt" checked={sel} onChange={()=>setSelected(i)} disabled={locked} />
                {opt}
              </label>
            </li>
          )
        })}
      </ul>

      <div className="actions">
        {!locked && <button className="primary" onClick={()=>lockAnswer(selected)} disabled={selected===null}>Lock Answer</button>}
        {locked && <button className="primary" onClick={handleNext}>Next</button>}
      </div>

      {locked && <div className="feedback">{answers[index]?.isCorrect ? 'Correct!' : 'Incorrect.'} Correct: <strong>{current.options[current.correctIndex]}</strong></div>}
    </section>
  )
}
