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
    // console.log(req.body)
    axios.get('http://api.brewerydb.com/v2/beer/random?key='+ key.breweryKey)
    .then(response=>{
        // console.log(response.data)
        const randomBeer = response.data.data
        res.send(randomBeer)
    })
})

//fetching specific beer
app.post('/my-beer', (req, res)=>{
    // console.log(req, "req")
    let formResults = req.body.formResults;
    // console.log("Type", formResults.Type)
    let pageNumber = Math.floor(Math.random()*10);
    // console.log("Rnadom", pageNumber)

    axios.get('http://api.brewerydb.com/v2/beers/?key='+key.breweryKey+'&abv='+formResults.Abv+ "&ibu=" +formResults.Ibu + "&p=" +pageNumber)
    .then(response=>{
        const specificBeer = response.data.data;
        console.log(response.data)
        res.send(specificBeer)
    })

})

//fetching random beer
app.post('/findbeer', (req, res)=>{
    let beerToLocate = req.body.locatebeer;
    console.log(beerToLocate)
    axios.get('http://lcboapi.com/products?q='+beerToLocate+'&access_key=' + key.lcboKey)
    .then(response=>{
        console.log(response.data)
        if(response.data.pager.total_record_count == 0){
            let beerSuggestion = response.data.suggestion
            res.send(beerSuggestion)
        }else{
            res.send(response.data)

        }
    })
    console.log("finding location")
})

//getting lcbo beers from the lcbo api

app.get('/lcbo-beers', (req, res)=>{
    let pageNumber = Math.floor(Math.random()*10);
    console.log("pageNUmb", pageNumber)
    axios.get('http://lcboapi.com/products?q=beer&per_page=100&page='+pageNumber+'&access_key=' + key.lcboKey)
    .then(response=>{
        let beers = response.data.result;
        beerList = beers.map(beer=>{
            return beer.name
        })
        let randomNumber = Math.floor(Math.random()*100);
        console.log("random", randomNumber)
        availableRandomBeer = beerList[randomNumber]
        console.log(availableRandomBeer)
        res.send(availableRandomBeer )
    })
})

const port = 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));

