import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.jpeg';

import fuzzysearch from 'fuzzysearch';

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
        <div className='controls'>
          <button className="refresh-button" onClick={refreshPage}>Click to reload!</button>
          <div className='searchbar'>
            <input type="text" className='search-text' onChange={handleSearchBarChange} placeholder="search by username" />
            <button className='clearSearch' onClick={() => setFuzzy(null)}> X </button>
          </div>
        </div>

        {fuzzy && (
            <table className="table table-dark fuzzy-results">
              <thead>
                <tr>
                  <th>Rank</th><th>Github Username</th><th>Total Score</th>
                </tr>
              </thead>
              <tbody>

                {fuzzy.map((object, counter) => (
                  <tr key={object.username}>
                    <td> {counter + 1} </td>
                    <td><a href = {url+`${object.username}`} target="_blank" rel='noreferrer'>{object.username}</a></td>
                    <td>{object.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}

        <br/>

        <table className="table table-dark">
        <thead>
        <tr>
          <th>Rank</th><th>Github Username</th><th>Total Score</th>
        </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
        <div
        style = {{
          backgroundImage:"url(https://lh4.googleusercontent.com/proxy/BIV0Lpkuh7LU3B6neW_6VG4IS-31qMw9BEBpxi95b3SHOsNVwYLtU6kD_Y0Pntof_BRiJ06acO2jKFTSbh5ZeHWPsYskDFigSHCmR2QaP9jMPxq-MMC-1zw0WVBWaV5zoVcP=w220-h165)",

          height:"50vh",
          width:"100vw",
          resizeMode:'cover'
        }}
        >
        </div>
=======

          {sortedResults && sortedResults.map((object, counter) => (
            <tr key={object.username}>
              <td> {counter + 1} </td>
              <td class="table_profile"><img src={`${url}${object.username}.png`} alt={object.username}/><a href = {url+`${object.username}`} target="_blank" rel='noreferrer'>{object.username}</a></td>
              <td>{object.score}</td>
            </tr>
          ))}
>>>>>>> d31db76c957cd0a0743823cc85afe88743d0c8a6
        </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
