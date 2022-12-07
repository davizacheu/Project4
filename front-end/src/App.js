import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Search from './Search';
import Slot from './Slot';
import Team from './Team';

function App() {
  
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [squad, setSquad] = useState([]);
  const [showSquad, setShowSquad] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  
  
  const createSearch = () => {
    setShowSearch(true);
    console.log(showSearch);
  }
  
  return (
    
    <div className="App">
    <h1>Welcome to Pokemon Teams</h1>
    <h1>List of the Current Teams</h1>
    
    <h1>Here is Your current pokemon team</h1>
    {showSquad &&
    <div className="squad">
      <div className="board-row">
            <button onClick={e => createSearch()}>
            <img src={this.state.img}></img>
            </button>
            
      </div>
      <div className="board-row">
            <Slot/>
            <Slot/>
            <Slot/>
      </div>
    </div>
    }
    {showSearch &&
    <Search show={true}/>
    }
    </div>
  );
}

export default App;
