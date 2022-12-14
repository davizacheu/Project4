const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/pokemon', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const pokemonSchema = new mongoose.Schema({
  name: String,
  img: String,
  level: String,
});

const squadSchema = new mongoose.Schema({
    owner: String,
    name: String,
    squad: String,
});

pokemonSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
  pokemonSchema.set('toJSON', {
  virtuals: true
});

squadSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
  squadSchema.set('toJSON', {
  virtuals: true
});

const Squad = mongoose.model('Squad', squadSchema);
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.get('/api/teams/:owner/:name', async(req, res) => {
  console.log("In fetch team");
  debugger;
  const passed_owner = req.params.owner;
  const passed_name = req.params.name;
  try {
    let team = await Squad.findOne({
        owner: passed_owner,
        name: passed_name
    });
    if(team !== null){
      res.send({team: team});
    }
    else{
      res.send({message: "Team not in the database" });
    }
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/teams/addteam/:owner/:name', async (req, res) => {
  console.log("In addTeam");
  const passed_owner = req.params.owner;
  const passed_name = req.params.name;

  const new_team = new Squad({
    owner: passed_owner,
    name: passed_name,
  });
  try {
    let found = await Squad.findOne({
      owner: passed_owner,
      name: passed_name
    });
    if(found !== null){
      res.send({message: "Team already in databse" });
    }
    else{
      console.log(found);
      await new_team.save();
      res.send({team:new_team});
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/teams/addpokemon', async (req, res) => {
  console.log("In addpokemon");
  
  console.log(req.body.name);
  console.log(req.body.img);
  console.log(req.body.description);
  console.log(req.body.level);
  let new_pokemon = new Pokemon({
    name: req.body.name,
    img:req.body.img,
    level: req.body.level
  });
    try {
    await new_pokemon.save();
    res.send({pokemon: new_pokemon});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.put('/api/teams/addToTeam', async (req, res) => {
  console.log("In add to team");
  console.log(req.body.owner);
  console.log(req.body.teamName);
  const passed_owner = req.body.owner;
  const passed_name = req.body.teamName;
  try {
    let team = await Squad.findOne({
        owner: req.body.owner,
        name: req.body.teamName
    });
    console.log(team);
    team.squad = req.body.img;
    console.log(team);
    await team.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/teams/delete/:owner/:name', async (req,res) => {
  console.log("In delete squad");
  console.log(req.params.owner);
  console.log(req.params.name);
  try{
    await Squad.deleteOne({
      owner:req.body.owner,
      name:req.body.name
    });
    res.sendStatus(200);
  }catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(3001, () => console.log('Server listening on port 3001!'));