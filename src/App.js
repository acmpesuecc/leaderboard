import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.jpeg';

import fuzzysearch from 'fuzzysearch';

import './App.css';

function refreshPage() {
  window.location.reload(false);
}

function App() {

  const [result, setResult] = useState({"No one yet!":"???"});
  const [dataret, setDataret] = useState(1);

  const [searchQuery, setSeachQuery] = useState("");

  const [fuzzy, setFuzzy] = useState();

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
  var sortedResults = result_array.sort((first, second) => {
    return second.score - first.score;
  })

  function Search(keyword) {
    var temp = sortedResults.filter(object => {
      return fuzzysearch(keyword.toLowerCase(), object.username.toLowerCase());
    })
    return temp;
  }

  function handleSearchBarChange(event){
    var text = event.target.value;
    setSeachQuery(text)
    console.log("searching ");
    console.log(searchQuery);
    setFuzzy(Search(searchQuery));
    console.log(fuzzy);
  }


  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
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

          {sortedResults && sortedResults.map((object, counter) => (
            <tr key={object.username}>
              <td> {counter + 1} </td>
              <td><a href = {url+`${object.username}`} target="_blank" rel='noreferrer'>{object.username}</a></td>
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
