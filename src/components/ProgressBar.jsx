import React from 'react'

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current/total)*100)
  return (
    <div className="progress" aria-label={`Progress ${pct}%`}>
      <div className="progress-inner" style={{ width: `${pct}%` }} />
      <div className="progress-text">{current} / {total}</div>
    </div>
  )
}
