// server/index.js

const express = require("express");
const cors = require("cors");
// Import DB Connection
//require("./config/db_connect.js");
let users = require("./api/models/users");
let cards = require("./api/models/cards");
let collections = require("./api/models/collections");
var bodyParser = require('body-parser');
const config = require("./config");
const mongoose = require("mongoose")


// Import API route
var routes = require('./api/routes'); //importing route

const {port, allowedDomains} = config;

const PORT = port || 3001;

var  uri = 'mongodb+srv://root:root@magic.99bcfwb.mongodb.net/magicgathering';

// Declare a variable named option and assign optional settings
const  options = {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
    };


// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options)
  .then(() => {
      console.log("Database connection established!");
      const app = express();

      app.use(cors({origin: allowedDomains}))
      app.use(bodyParser.text({type: 'json'}));

      
      app.use("/api", routes) // new

      app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      });
   // routes(app);


  },
  err  => {{
      console.log("Error connecting Database instance due to:", err);
  }});

/*

//Pedidos API
app.get("/api/users", (req, res) => {
    res.json(users);
  });

app.get('/user/:pass/:usr', (req, res) => {
  
    const pass = req.params.pass;
    const username = req.params.usr;

  
    const data = users.find(user => {
      return  user.userName === username && user.password === pass
     });

    if(data!= undefined){
      res.json(data);
      return;
    }
  
    res.status(404).send('User not found');
});
  


//Cards Requests
app.get("/api/cards", (req, res) => {
    res.json(cards);
});

//All unofficial collections cards belonging to a user
app.get('/cards/unnoficial/:id', (req, res)  => {
  const id = req.params.id;

  //its always only one element
  let collection = collections.filter((elem)=> {return elem.userId == id && elem.official == 0})

  if(collection){
    let unnoficialCards = cards.filter((elem)=>{return elem.collectionId == collection.id})

    if(unnoficialCards){
      res.json(unnoficialCards);
      return;
    }
  }

  res.status(404).send('User does not have cards without a collection');

});

//All cards belonging to a user
app.get('/cards/:id', (req, res)  => {
  const id = req.params.id;

  //it can be more than one element
  let userCollection = collections.filter((elem)=> {return elem.userId == id})

  //it can be an official or not and it will create empty results
  if(userCollection){
    let userCards = userCollection.map( (userCol)  => {
      if(cards){
       return cards.filter((elem)=>{
          return elem.collectionId == userCol.id
        })
      }
      
    })
     

    if(userCards){
      //clean empty results
      let desiredCards = userCards.filter((entry)=>entry.length>0)

      res.json(desiredCards);
      return;
    }
  }

  res.status(404).send('User does not have cards');

});


app.delete('/card/:id', (req, res) => {
  // reading id from the URL
  const id = req.params.id;

  // remove item from the cards array
  cards = cards.filter(i => {
      if (i.id != id) {
          return true;
      }

      return false;
  });

  res.send('card is deleted');
});

app.post('/card/:id', (req, res) => {
  // reading id from the URL
  const id = req.params.id;
  const newCard = req.body;

  let oldCard  = cards.find((card)=>{return card.id==id} )

  console.log(oldCard);

  console.log(JSON.parse(newCard))
  
  if(newCard && oldCard){
      oldCard.cardName= newCard.cardName;
      oldCard.value= newCard.value;
      oldCard.description= newCard.description; 
    res.json(cards);
    return ;

  }
  res.status(500).send('Error editing card');


});


//Collections Requests
app.get("/api/collections", (req, res) => {
    res.json(collections);
});

app.get('/collection/:id', (req, res)  => {
  const id = req.params.id;

  let collection = collections.find((elem)=> {return elem.id == id})

  if(collection){
    res.json(collection);
    return;
  }
});

//All official collections belonging to a user
app.get('/collections/user/:id', (req, res)  => {
  const id = req.params.id;

  let collection = collections.filter((elem)=> {return elem.userId == id && elem.official == 1})

  if(collection){
    res.json(collection);
    return;
  }

  res.status(404).send('User does not have collections');

});

//ID of the unOfficial collections belonging to a user
app.get('/unCollections/user/:id', (req, res)  => {
  const id = req.params.id;

  let collection = collections.filter((elem)=> {return elem.userId == id && elem.official == 0})

  if(collection){
    res.json(collection[0].id);
    return;
  }

  res.status(404).send('User does not have cards without collection');

});

//get all cards from a collection
app.get('/collection/cards/:id', (req, res) => {
  
  const id = req.params.id;

  const card = cards.filter((elem)=> {return elem.collectionId == id})

  if(card!= undefined){
    res.json(card);
    return;
  }
     

  res.status(404).send('This collection has no cards');
});


app.delete('/collection/:id/:unnoficialBackupId', (req, res) => {
  // reading id from the URL
  const id = req.params.id;
  const unnoficialBackupId = req.params.id;

  // remove item from the collections array
  collections = collections.filter(i => {
      if (i.id !== id) {  
          return true;
      }
      return false;
  });

  cards = cards.map( (card)=>{
      if(card && card.collectionId == id){
          card.collectionId == unnoficialBackupId;
      }
  })

  res.send('collection is deleted');
});

app.post('/collection/:id', (req, res) => {
  // reading id from the URL
  const id = req.params.id;
  const newcollection = req.body;

  // remove item from the collections array
  for (let i = 0; i < collections.length; i++) {
      let collection = collections[i]

      if (collection.id === id) {
          collections[i] = newcollection;
      }
  }

  res.send('collection is edited');
});

  
*/