import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.jpeg';

import fuzzysearch from 'fuzzysearch';

import './App.css';


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


  const [result, setResult] = useState({"No one yet!":"???"});

  const [searchQuery, setSeachQuery] = useState("");

  const [fuzzy, setFuzzy] = useState();

  const fetchData = async () =>{
      const fresult = await axios({
        method: 'get',
        url: 'https://acm-bounty.herokuapp.com/scores'
      });
      setResult(fresult.data);
      console.log(result);
  }

  useEffect( () => {
    fetchData();
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
        <div>
        <h1>HacktoberFest {year} Countdown</h1>
    {timerComponents.length ? timerComponents : <span>Time's up!</span>}
 </div>  <p>
        <h1>Leaderboard</h1>
        </p>
        <div className='controls'>
          <button onClick={() => fetchData()}>Click to reload!</button>
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
              <td class="table_profile"><img src={`${url}${object.username}.png`} alt={object.username}/><a href = {`${url}${object.username}`} target="_blank" rel='noreferrer'>{object.username}</a></td>
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
