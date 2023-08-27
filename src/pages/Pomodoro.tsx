import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pomodoro() {
  const [timersObject, setTimersObject] = useState({
    sessions:25,
    pauses:5
  });
  const [actualTime, setActualTime] = useState(timersObject.sessions*60);
  const [actualActivity, setActualActivity] = useState('Travail');
  const [totalCycles, setTotalCycles] = useState(0);
  const [play, setPlay] = useState(false);
  const [timerInterval, setTimerInterval] = useState(0);

  const formatTime = (time:number) => {
    const minutes = Math.floor(time/60);
    const seconds = time%60;
    return (minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
  }

  const changeTimers = (e:React.MouseEvent) => {
    const tempObject = {...timersObject};
    const target = e.target as HTMLButtonElement;
    const parentEl = target.parentElement;
    const work = parentEl?.className.includes('work') ? true : false;
    let timer = work ? tempObject.sessions : tempObject.pauses;
    if (target.className === 'less') {
      timer = timer > 1 ? (timer-1) : 1; 
    } else {
      timer++;
    }
    tempObject[work ? 'sessions' : 'pauses'] = timer;
    setTimersObject(tempObject);
    if (!play && work) setActualTime(timer*60);
  }

  const resetFunc = () => {
    setPlay(false);
    setTotalCycles(0);
    setActualActivity('Travail');
    setActualTime(timersObject.sessions*60);
  }

  useEffect(() => {
    if (play) {
      setActualTime((actualActivity === 'Travail' ? timersObject.sessions : timersObject.pauses)*60);
      clearInterval(timerInterval);
      const tempInterval = setInterval(() => {
        setActualTime(state => {
          state = state > 0 ? state-1 : 0;
          state === 0 && setActualActivity(actualActivity => {
            actualActivity === 'Repos' && setTotalCycles(totalCycles => totalCycles+1);
            actualActivity = actualActivity === 'Travail' ? 'Repos': 'Travail';
            return actualActivity;
          });
          return state;
        });
      }, 1000);
      setTimerInterval(tempInterval);
    } else {
      clearInterval(timerInterval);
    }
  
    return () => {
      clearInterval(timerInterval);
    }
  }, [play,actualActivity])
  

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
            <div className="select-minutes work">
              <button className="less" onClick={changeTimers}></button>
              <p>{timersObject.sessions}</p>
              <button className="more" onClick={changeTimers}></button>
            </div>
          </div>
          <div className="timers-select">
            <h2>Pauses</h2>
            <div className="select-minutes">
              <button className="less" onClick={changeTimers}></button>
              <p>{timersObject.pauses}</p>
              <button className="more" onClick={changeTimers}></button>
            </div>
          </div>
        </div>
        <div className="main-timer-container">
          <h3>{actualActivity}</h3>
          <div className="main-timer">
            <p>{formatTime(actualTime)}</p>
          </div>
          <p>Cycle(s) passé(s) : {totalCycles}</p>
        </div>
        {play ? <button className="reset-btn" onClick={resetFunc}>
          Reset
        </button> : 
        <button className="play-btn" onClick={() => setPlay(true)}>Commencer</button>}
      </section>
    </main>
  )
}