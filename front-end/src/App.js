import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// import Search from './Search';
import PokemonResults from './PokemonResults'
import Team from './Team';
//IMAGES TO BE IMPORTED 
import Empty from"./images/empty_slot.png";
import WelcomeLogo from "./images/Welcome.png";
import Description from "./images/description.png";
import YourName from "./images/Your-name.png";
import TeamName from "./images/Your-Team-Name.png";
import Logo from"./images/Logo.png"
import EnterName from "./images/Enter-Pokemon-Name.png"


function App() {
  
  //VARIABLE TO HOLD TEAM INFO
  const [team, setTeam] = useState([]);
  const [teamMessage, setTeamMessage] = useState("");
  const [error, setError] = useState("");
  const [squad, setSquad] = useState([]);
  const [showSquad, setShowSquad] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchRes, setShowSearchRes] = useState(false);
  const [owner, setOwner] = useState("");
  const [teamName, setTeamName] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeImg, setPokeImg] = useState(Empty);
  const [pokeDescription, setPokeDescription] = useState('');
  const [pokeLevel, setPokeLevel] = useState('');
  const [showAddButton, setShowAddButton] = useState(false);
  
  
  const fetchTeam = async() => {
    try{
      const response = await axios.get("/api/teams/" + owner + "/" + teamName);
      let result_team = response.data.team;
      let result_message = response.data.message;
      debugger;
      if(result_message !== undefined){
        setTeamMessage(result_message);
        console.log(teamMessage);
      }
      else{
        if(result_team.squad !== undefined){
          setPokeImg(result_team.squad);
        }
        setTeamMessage("Your Team: " + result_team.owner + " " + result_team.name);
        setShowSquad(true);
      }
    }catch(error){
      setError("Error retrieving team")
    }
  }
  
  const addTeam = async() => {
    try{
    const response = await axios.post("/api/teams/addteam/"+ owner + "/" + teamName);
    let result_team = response.data.team;
    let result_message = response.data.message;
    if(result_message !== undefined){
        setTeamMessage(result_message);
        console.log(teamMessage);
      }
      else{
        setTeam(result_team);
        setTeamMessage("Your Team: " + result_team.owner + " " + result_team.name);
        setShowSquad(true);
      }
    }catch(error){
      setError("Error creating team")
    }
  }
  
  const createPokemon = async() => {
    debugger;
    try{
      const response = await axios.post("api/teams/addpokemon/", {name: pokeName, img: pokeImg, description:pokeDescription, level: pokeLevel});
    }catch(error){
      setError("Error adding pokemon")
    }
  }
    
  const addPokemontoTeam = async() => {
    debugger;
    try{
      const response = await axios.put("api/teams/addToTeam", {owner: owner, teamName: teamName, img: pokeImg});
    }catch(error){
      setError("Error adding pokemon")
    }
  }
  
  const getPokemon = () => {
        let value = pokeName;
        
        function capitalizeFirstLetter(str) {
            return (str.charAt(0).toUpperCase() + str.slice(1));
        }
        let lowvalue = value.toLowerCase();
        let finalvalue = capitalizeFirstLetter(lowvalue);
        if (value === ""){
           return; 
        }
        
        fetch('https://api.pokemontcg.io/v2/cards?q=name:'+finalvalue) 
        .then((res) => res.json())
        .then(function(json) {
            console.log(json);
            console.log(json.data.find(obj => {
            return obj.name === finalvalue
            }));
            
            let target = json.data.find(obj => {
            return obj.name === finalvalue
            });
            
            let card = target.images.large;
            let name = target.name;
            let description = target.description;
            let level = target.level;
            console.log(card);
            setPokeImg(card);
            setPokeDescription(target.description);
            setPokeName(target.name);
            setPokeLevel(target.level);
            setShowAddButton(true);
            console.log(pokeImg);
            console.log(pokeDescription);
            console.log(pokeName);
            console.log(pokeLevel);
            
        });
    }
    
    const searchPokemon = async() => {
      debugger;
          await getPokemon();
          console.log(pokeImg);
            console.log(pokeDescription);
            console.log(pokeName);
            console.log(pokeLevel);
        }
    
    const addPokemon = async() => {
      await createPokemon();
      await addPokemontoTeam();

    }
    
    const getTeam = async() => {
    console.log(owner);
    console.log(teamName);
    await fetchTeam();
    console.log(team);
    console.log(teamMessage);
  }
  
  
  const createTeam = async() => {
    await addTeam();
  }
  
  
  
  
  const createSearch = () => {
    setShowSearch(true);
    console.log(showSearch);
  }
  
  
  
  function Search(props){
    return (
      <div className="search">
      
                        <img className= 'prompt' src = {EnterName}></img>
                        <label>
                        <input type="text" value={pokeName} onChange={e => setPokeName(e.target.value)} />
                        </label>
                        <input id="pokemonButton" type="submit" onClick={e => searchPokemon()}></input>
                <PokemonResults show={showSearchRes} card={pokeImg} onClick={e=> addPokemon()}></PokemonResults>
            </div>
      )
  }
  
  function Slot(props){
    return (
      <button onClick={e => createSearch()}>
            <img src={pokeImg}></img> ;
            </button>)
        
    }
  
  function Team(props){
    return(
        <div className="squad">
      <div className="board-row">
      <Slot/>
      </div>
    </div>
      )
  }
  
  
  return (
    <div className="App">
    {error}
    <div>
      <img clasName="welcome_logo" src={WelcomeLogo}/>
      </div>
      <img clasName="description" src={Description}/>
      <div>
      <label>
        <img src={YourName}/>
        <input type="text" value={owner} onChange={e => setOwner(e.target.value)} />
      </label>
      <label>
        <img src={TeamName}/>
        <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} />
      </label>
      </div>
      <div>
      <button onClick={e => getTeam()}>GET TEAM</button>
      <button onClick={e => createTeam()}>CREATE TEAM</button>
      </div>
    <h1 className="squad_caption">{teamMessage}</h1>
    {showAddButton &&
    <button onClick={e => addPokemon()}>ADD POKEMON</button>
    }
    {showSquad &&
      <Team/>
    }
    {showSearch &&
    <div>
      <img className= 'prompt' src = {EnterName}></img>
      <div>
          <label>
          <input type="text" value={pokeName} onChange={e => setPokeName(e.target.value)} />
          </label>
          </div>
          <input id="pokemonButton" type="submit" onClick={e => getPokemon()}></input>
          </div>
    }
    </div>
  );
}

export default App;
