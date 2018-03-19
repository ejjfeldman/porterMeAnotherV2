import React, { Component } from "react";
import "./BeerSearch.css";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import BeerButton from "../components/BeerButton/BeerButton";
import Modal from "../components/Modal/Modal";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import NoUserMessage from "../components/NoUserMessage/NoUserMessage";

class BeerSearch extends Component {
  state = {
    randomBeer: "",
    displayResults: false,
    loading: false,
    suggestionBeer:'',
    isAvailable: [],
    checkingAvailability: true,
  };

  getRandom = () => {
    this.setState({ loading: true });
    axios.get("/randombeer").then(response => {
      let beerFetched = response.data;
      console.log("random", beerFetched);
      this.setState({
        randomBeer: beerFetched,
        displayResults: true,
        loading: false
      });
      console.log(this.state.randomBeer);
      if(this.props.authUser){
        this.saveBeer(this.state.randomBeer)
      }
    });
  };

  saveBeer=(beer)=>{
    const user = this.props.authUser;
    const uid = user.uid;
    const beerName=beer.name;
    const beerSelected ={
      beerName: beer
    };
    axios
    .post("https://beer-data.firebaseio.com/"+uid+".json", beerSelected)
    .then(response => {
      console.log('response received')
    })
    .catch(error => {
      console.log("error", error)
    });
  }

  findLocation=(beer)=>{
    console.log(beer)
    this.setState({
      loading: true
    });
    axios.post("/findbeer", {locatebeer: beer})
    .then(response => {
      console.log(response.data);
      if(!response.data.pager){
    
        axios.get('/lcbo-beers')
        .then(response=>{
          console.log(response.data);
          let resultBeer = response.data;
          // this.saveResults(listData)
          this.setState({
            suggestionBeer: resultBeer,
            checkingAvailability: false,
            loading: false
              })
        })
      }else{
        console.log("beer",this.state.randomBeer)
        this.setState({
        checkingAvailability: false,
        loading: false,
            })
      }
    });
  }

  closeResults = () => {
    // this.setState({ displayResults: false, randomBeer: '' });
    this.setState({
  
      randomBeer: "",
      displayResults: false,
      loading: false,
      suggestionBeer:'',
      isAvailable: [],
      checkingAvailability: true,})
  };

  render() {
    let beerDisplayResult = null;
    let beerName = "Mystery Beer - unnamed";
    let beerAbv = "Undefined";
    let beerDescription = "Let us know what you think of this beer! Unfortunately a description is not available at this time.";
    let beerIbu = "Undefined";

    if (this.state.randomBeer.name) {
      if(this.state.checkingAvailability){
        let displayBeer = this.state.randomBeer;
        if (displayBeer.name) {
          beerName = displayBeer.name;
        }
        if (displayBeer.abv) {
          beerAbv = displayBeer.abv;
        } 
        if (displayBeer.description) {
          beerDescription = displayBeer.description;
        }
        if (displayBeer.ibu) {
          beerIbu = displayBeer.ibu;
        }
        beerDisplayResult = (
          <Modal
          show={this.state.displayResults}
          modalClosed={this.closeResults}
          randomBeer={this.state.randomBeer}
        > 
          <div>
            <button className="closeButton" onClick={this.closeResults}>X</button> 
            <h2>{beerName}</h2>
            <p><strong>Description: </strong>{beerDescription}</p>
            <p><strong>ABV: </strong>{beerAbv}</p>
            <p><strong>IBU: </strong>{beerIbu}</p>
            <button className="formButton" onClick={this.closeResults}>Start Over</button>
            <button className="formButton" onClick={()=>this.findLocation(beerName)}>Find it</button>
          </div>
          </Modal>
        );
        console.log(this.state.randomBeer);
      }else if(this.state.suggestionBeer){
        beerDisplayResult=(
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeResults}>X</button>          
          <h3>Unfortunately the beer you are looking for is not available in the LCBO</h3>
          <h4>Can we recommend "{this.state.suggestionBeer}" instead?</h4>
          </div>)
      }else{
        beerDisplayResult=(
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeResults}>X</button>          
          <h3>"{this.state.randomBeer.name}" is available in the LCBO</h3>
          {/* <h4>Can we recommend "{this.state.isAvailable}" as well?</h4> */}
          </div>)
      }
    }

    let screenDisplay = (
      <div>
    <NoUserMessage isLoggedIn={this.props.authUser} isLoading={this.state.loading}/>
    <BeerButton
        getRandomBeer={this.getRandom}
        randomBeer={this.state.randomBeer}
      />
      </div>
    
    );

    if (this.state.loading && this.state.checkingAvailability) {
      screenDisplay=null;
      beerDisplayResult = (
        <div>

          <h1>Waiting To Get Loaded</h1>
          <LoadingSpinner />
        </div>
      );
    }


    return (
      <div className="App">
      {/* <NoUserMessage isLoggedIn={this.props.authUser} isLoading={this.state.loading}/> */}
        {screenDisplay}

          {beerDisplayResult}

      </div>
    );
  }
}

export default withRouter(BeerSearch);
