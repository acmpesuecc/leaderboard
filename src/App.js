import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.jpeg';
import './App.css';

function refreshPage() {
  window.location.reload(false);
}

function App() {
  return (
    <div className="App" style={{overflow:"hidden"}}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <h1>Leaderboard</h1>
        </p>
        <div>
        <button onClick={refreshPage}>Click to reload!</button>
        </div>
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
