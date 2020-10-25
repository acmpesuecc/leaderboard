import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.jpeg';
import './App.css';

function refreshPage() {
  window.location.reload(false);
}

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
  }, []);

  const url = `https://github.com/`;

  // serialize result into object array, so that we can sort by key
  var result_array = [];

  // push each new user record as an object to the array
  Object.keys(result).map((keyName, i) => {
    result_array = [...result_array, {username: keyName, score: result[keyName]}];
    return null
  })

  // sort the result in descending order of score
  const sortedResults = result_array.sort((first, second) => {
    return second.score - first.score;
  })


  return (
    <div className="App">
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
          {sortedResults && sortedResults.map((object, counter) => (
            <tr key={object.username}>
              <td> {counter + 1} </td>
              <td class="table_profile"><img src={`${url}${object.username}.png`} alt={object.username}/><a href = {url+`${object.username}`} target="_blank" rel='noreferrer'>{object.username}</a></td>
              <td>{object.score}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
