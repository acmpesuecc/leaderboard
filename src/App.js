import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.jpeg';


import './App.css';

function refreshPage() {
  window.location.reload(false);
}

const calculateTimeLeft = () => {
  let year = new Date().getFullYear();
  let difference = +new Date(`10/26/${year}`) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24) -1,
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
  };
}
return timeLeft;
}

function App() {


const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
const [year] = useState(new Date().getFullYear());

useEffect(() => {
  const timer = setTimeout(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);
  return () => clearTimeout(timer);
});


const timerComponents = [];

Object.keys(timeLeft).forEach((interval) => {
  if (!timeLeft[interval]) {
    return;
  }

  timerComponents.push(
    <span>
      {timeLeft[interval]} {interval}{" "}
    </span>
  );
});




  return (
    <div className="App" style={{overflow:"hidden"}}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <h1>HacktoberFest {year} Countdown</h1>
    {timerComponents.length ? timerComponents : <span>Time's up!</span>}
 </div>
        <p>
        <h1>Leaderboard</h1>
        </p>

        <br/>

        <table className="table table-dark">
        <thead>
        <tr>
          <th>Rank</th><th>Github Username</th><th>Total Score</th>
        </tr>
        </thead>
        <tbody>
        <div
        style = {{
          backgroundImage:"url(https://lh4.googleusercontent.com/proxy/BIV0Lpkuh7LU3B6neW_6VG4IS-31qMw9BEBpxi95b3SHOsNVwYLtU6kD_Y0Pntof_BRiJ06acO2jKFTSbh5ZeHWPsYskDFigSHCmR2QaP9jMPxq-MMC-1zw0WVBWaV5zoVcP=w220-h165)",

          height:"50vh",
          width:"100vw",
          resizeMode:'cover'
        }}
        >
        </div>
        </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
