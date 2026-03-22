const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Pokedex
const pokedex = [
  { id: 1, name: "Bulbizarre", type: "plante", level: 5 },
  { id: 4, name: "Salamèche", type: "feu", level: 5 },
  { id: 7, name: "Carapuce", type: "eau", level: 5 },
  { id: 25, name: "Pikachu", type: "electrik", level: 12 },
  { id: 39, name: "Rondoudou", type: "fee", level: 8 },
  { id: 52, name: "Miaouss", type: "normal", level: 9 },
  { id: 133, name: "Evoli", type: "normal", level: 10 }
];

//lister et limite

app.get('/api/pokemon',(req,res)=>{
  var limit = req.query.limit
  if (limit){
      if (limit > 0) {
          res.send(pokedex.slice(0, limit));
      } else {
          res.send('ERREUR 400')
      }
  } else {
      res.send(pokedex)
  }
})

//Pokemon par ID
app.get('/api/pokemon/:id',(req,res)=>{
  var ID = req.params.id
 
  if(ID > 0){
    var Identifiant = pokedex.find(p => p.id == ID)
    if(Identifiant == undefined){
      res.send("ERREUR 404")
    }
    else{
         res.send(Identifiant)
    }
  }
  else{
    res.send('ERREUR 400')
  }
})

//Pokemon par Type
app.get('/api/type/:type' ,(req,res)=>{
  var TYPE = req.params.type.toLowerCase()
 
  var saltype = pokedex.filter(p => p.type == TYPE)
  if (saltype.length == 0){
    res.send("ERREUR 404")
  }
  else{
      res.send(saltype)
  }
})

//Pokemon par lettre
app.get('/api/search' ,(req,res)=>{
  var lettres = req.query.name.toLowerCase()
  if(lettres){
    var poke = pokedex.filter(p => p.name.toLowerCase().includes(lettres))
    if (poke.length==0){
      res.send("ERREUR 404")
    }
    else{
      res.send(poke)
    }
  }
  else{
    res.send("ERREUR 400")
  }
})