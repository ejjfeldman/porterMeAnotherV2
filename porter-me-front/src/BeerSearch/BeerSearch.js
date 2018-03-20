import React, { Component } from "react";
import "./BeerSearch.css";
import axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import * as routes from '../Routes/routes';

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
    showMessage: false
    
  };

  getRandom = () => {
    this.setState({ loading: true });
    axios.get("/randombeer").then(response => {
      let beerFetched = response.data;
      console.log("random", beerFetched);
      beerFetched.method= "Random Search";
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
    let hrefLink=null;
    
    const user = this.props.authUser;
    const uid = user.uid;

    console.log(beer)
    if(beer.method=="Available at the LCBO"){
      hrefLink = "http://www.lcbo.com/lcbo/search?searchTerm=" +beer.name.replace(/ /g, "+")
      console.log(hrefLink)
      beer.href=hrefLink;
      console.log(beer)
      
      
  }
    // const beerName=beer.name;
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
    this.setState({
      showMessage: true
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
            loading: false,
            showMessage: false
              })
        })
      }else{
        console.log("beer",this.state.randomBeer)
        this.setState({
        checkingAvailability: false,
        loading: false,
        showMessage: false
        
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
      checkingAvailability: true,
    showMessage:false})
  };

  noAccountMessage=(beer)=>{
    this.setState({showMessage: true})
  }

  render() {
    let beerDisplayResult = null;
    let beerName = "Mystery Beer - unnamed";
    let beerAbv = "Undefined";
    let beerDescription = "Let us know what you think of this beer! Unfortunately a description is not available at this time.";
    let beerIbu = "Undefined";
    let toSaveMessage = "null";

    if(this.props.authUser){
      if(this.state.showMessage){
        toSaveMessage = (
          <div><h4>Can we recommend "<span className="suggestedBeer">{this.state.suggestionBeer}</span>"* instead?</h4>
           <p className="messageToSave">*{this.state.suggestionBeer} has been <b><Link to={routes.ACCOUNT}>saved</Link></b></p>
            </div>
          )
      }else{
        toSaveMessage = (
          <div><h4>Can we recommend "<span className="suggestedBeer" onClick={()=>this.saveBeer({name: this.state.suggestionBeer+"*", method: "Available at the LCBO"})}>{this.state.suggestionBeer}</span>"* instead?</h4>
           <p className="messageToSave">*click recommended beer to save to your account</p>
            </div>
          )
      }
      
    }else if(this.state.showMessage && !this.props.authUser){
      toSaveMessage =(
        <div>
          <h4>Can we recommend "<span className="suggestedBeer" onClick={()=>this.noAccountMessage({name: this.state.suggestionBeer})}>{this.state.suggestionBeer}</span>"* instead?</h4>        
        <p className="messageToSave">*to save recommended beer, <Link to={routes.SIGN_IN}>sign in</Link> or <Link to={routes.SIGN_UP}>create an account</Link></p>
        </div>
      )
    }else{
      toSaveMessage =(
        <h4>Can we recommend "<span className="suggestedBeer" onClick={()=>this.noAccountMessage({name: this.state.suggestionBeer})}>{this.state.suggestionBeer}</span>"* instead?</h4>                
      )
      
    }

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
          {toSaveMessage}
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
