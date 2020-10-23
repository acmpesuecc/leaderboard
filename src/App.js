import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.jpeg';
import './App.css';

function App() {

  const [result, setResult] = useState({"No one yet!":"???"});
  const [dataret, setDataret] = useState(1);

  useEffect(async () => {
    if(dataret){
      const fresult = await axios({
        method: 'get',
        url: 'https://acm-bounty.herokuapp.com/scores'
      });

      setResult(fresult.data);
      console.log(result);
      setDataret(0);
    }
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Leaderboard
        </p>
        <table>
        <thead>
        <tr>
          <th>Rank</th><th>Github Username</th><th>Total Score</th>
        </tr>
        </thead>
        <tbody>
        {Object.keys(result).map((keyName, i) => (
            <tr>
                <td>{i+1}</td><td>{keyName}</td><td>{result[keyName]}</td>
            </tr>
        ))}
        </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
