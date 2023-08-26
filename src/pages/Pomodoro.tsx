import { useState } from "react";
import { Link } from "react-router-dom";

export default function Pomodoro() {
  const [timersObject, setTimersObject] = useState({
    sessions:25,
    pauses:5
  });
  const [actualTime, setActualTime] = useState(timersObject.sessions);
  const [actualActivity, setActualActivity] = useState('Travail');
  const [totalCycles, setTotalCycles] = useState(0);

  return (
    <main className="pomodoro-page">
      <div className="back-home">
        <Link to='/'></Link>
      </div>
      <section className="main-container">
        <h1>Pomodoro App</h1>
        <div className="timers-container">
          <div className="timers-select">
            <h2>Travail</h2>
            <div className="select-minutes">
              <button className="less"></button>
              <p>{timersObject.sessions}</p>
              <button className="more"></button>
            </div>
          </div>
          <div className="timers-select">
            <h2>Pauses</h2>
            <div className="select-minutes">
              <button className="less"></button>
              <p>{timersObject.pauses}</p>
              <button className="more"></button>
            </div>
          </div>
        </div>
        <div className="main-timer-container">
          <h3>{actualActivity}</h3>
          <div className="main-timer">
            <p>{actualTime}</p>
          </div>
          <p>Passed cycle(s) : {totalCycles}</p>
        </div>
        <button className="reset-btn">
          Reset
        </button>
      </section>
    </main>
  )
}