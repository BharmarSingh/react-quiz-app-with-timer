import React, { useEffect, useRef, useState } from 'react'

export default function Timer({ seconds, running=true, onExpire, resetSignal }) {
  const [time, setTime] = useState(seconds)
  const prevSeconds = useRef(seconds)

  // when seconds prop changes or resetSignal toggles, reset time
  useEffect(()=>{
    setTime(seconds)
    prevSeconds.current = seconds
  },[seconds, resetSignal])

  useEffect(()=>{
    if(!running) return
    if(time<=0){
      onExpire && onExpire()
      return
    }
    const id = setTimeout(()=>setTime(t=>t-1), 1000)
    return ()=>clearTimeout(id)
  },[time, running, onExpire])

  const pct = Math.round((time / seconds) * 100)
  return (
    <div className="timer" aria-live="polite">
      <div className="timer-bar" style={{ width: `${pct}%` }} />
      <div className="timer-text">Time left: {time}s</div>
    </div>
  )
}
