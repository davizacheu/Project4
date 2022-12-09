function PokemonResults(props){
    if(!props.show){
        return null;
    }
    else{
        return <div>
        <button onClick={props.addPoke}>Add Pokemon To Your Team</button>
        <img class= "card" src={props.card}></img>
        </div>;
    }
}

export default PokemonResults;