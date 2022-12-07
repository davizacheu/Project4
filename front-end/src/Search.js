import React, { Component } from 'react';
import {setState} from 'react';
// import  "./pokemon.css"; 
import Logo from"./images/Logo.png"
import EnterName from "./images/Enter-Pokemon-Name.png"
import  PokemonResults from './PokemonResults';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            logo: Logo,
            enter: EnterName,
            value: '',
            showresult: false,
            show:props.show,
            img: '',
        };

        this.getPokemon = this.getPokemon.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getPokemon(event) {
        event.preventDefault();
        let value = this.state.value;
        console.log(value);
        
        function capitalizeFirstLetter(str) {
            return (str.charAt(0).toUpperCase() + str.slice(1));
        }
        let lowvalue = value.toLowerCase();
        let finalvalue = capitalizeFirstLetter(lowvalue);
        if (value === ""){
           return; 
        }
        console.log(finalvalue);
        
        fetch('https://api.pokemontcg.io/v2/cards?q=name:'+finalvalue) 
        .then((res) => res.json())
        .then(function(json) {
            console.log(json);
            console.log(json.data.find(obj => {
            return obj.name === finalvalue
            }));

            let card = json.data.find(obj => {
            return obj.name === finalvalue
            }).images.large;
            console.log(card);
            this.setState( {img: card}) ;
            
        }.bind(this));

        if(this.state.showresult === false){
            this.state.showresult = true;
        }
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render() {
            if(!this.state.show){
                return null;
            }
            else{
                return(<div className="search">
                <div className="webtitle">
                    <form className='name-form' >
                        <img className= 'prompt' src = {this.state.enter}></img><br></br>
                        <input type="text" id="pokemonField" value={this.state.value} onChange={this.handleChange}></input><br></br>
                        <div id = "inputBreak"></div>
                        <input id="pokemonButton" type="submit" value="Search" onClick={this.getPokemon}></input>
                    </form>
                </div>
                <PokemonResults show={this.state.showresult} card={this.state.img}></PokemonResults>
            </div>
        );
            }
            
    }

}

export default Search; 
