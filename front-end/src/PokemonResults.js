function PokemonResults(props){
    if(!props.show){
        return null;
    }
    else{
        return <div>
        <img class= "card" src={props.card}></img>
        <button>Add Pokemon To Your Team</button>
        </div>;
    }
}

export default PokemonResults;