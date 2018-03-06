const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
let key = require('./key');

// const request = require('request');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())


//fetching random beer
app.get('/randombeer', (req, res)=>{
    axios.get('http://api.brewerydb.com/v2/beer/random?key='+ key.breweryKey)
    .then(response=>{
        // console.log(response.data)
        const randomBeer = response.data.data
        res.send(randomBeer)
    })
    console.log("get random")
})
//fetching specific beer
app.post('/my-beer', (req, res)=>{
    let formResults = req.body.formResults;
    console.log("Type", formResults.Type)
    let pageNumber = Math.floor(Math.random()*10);
    console.log("Rnadom", pageNumber)

    axios.get('http://api.brewerydb.com/v2/beers/?key='+key.breweryKey+'&abv='+formResults.Abv+ "&ibu=" +formResults.Ibu + "&p=" +pageNumber)
    .then(response=>{
        const specificBeer = response.data.data;
        console.log(response.data)
        res.send(specificBeer)
    })

})


const port = 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));

