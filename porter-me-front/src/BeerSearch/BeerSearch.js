import React, { Component } from "react";
import "./BeerSearch.css";
import axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import * as routes from '../Routes/routes';

import BeerButton from "../components/BeerButton/BeerButton";
import Modal from "../components/Modal/Modal";
import BeerResult from '../components/BeerResult/BeerResult';
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import NoUserMessage from "../components/NoUserMessage/NoUserMessage";
import {databaseURL} from '../firebase/firebase';

class BeerSearch extends Component {
  state = {
    randomBeer: "",
    displayResults: false,
    loading: false,
    suggestionBeer:'',
    checkingAvailability: true,
    showMessage: false
  };

  //Get random beer with no parameters
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
      if(this.props.authUser){
        this.saveBeer(this.state.randomBeer)
      }
    });
  };

  //if user is logged in, save beer to account
  saveBeer=(beer)=>{
    let hrefLink=null;
    const user = this.props.authUser;
    const uid = user.uid;
    console.log(beer)
    if(beer.method=="Available at the LCBO"){
      hrefLink = "http://www.lcbo.com/lcbo/search?searchTerm=" +beer.name.replace(/ /g, "+")
      beer.href=hrefLink;
  }
    const beerSelected ={
      beerName: beer
    };
    axios
    .post(databaseURL+uid+".json", beerSelected)
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

  //find if beer is available in the LCBO
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
          this.setState({
            suggestionBeer: resultBeer,
            checkingAvailability: false,
            loading: false,
            showMessage: false
              })
        })
      }else{
        console.log("beer",this.state.randomBeer)
        // let foundInLcbo = this.state.randomBeer;
        // foundInLcbo.method = ["Random Search", "Available in the LCBO"];
        this.setState({
        checkingAvailability: false,
        loading: false,
        showMessage: false,
        // randomBeer: foundInLcbo
        
            })
      }
    });
  }

  closeResults = () => {
    this.setState({
      randomBeer: "",
      displayResults: false,
      loading: false,
      suggestionBeer:'',
      checkingAvailability: true,
    showMessage:false})
  };

  noAccountMessage=(beer)=>{
    this.setState({showMessage: true})
  }

  render() {
    let beerDisplayResult = null;
    let toSaveMessage = "null";

//Saving suggested beer to account and showing message
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
        <p className="messageToSaveNoUser">*to save recommended beer, <Link to={routes.SIGN_IN}>sign in</Link> or <Link to={routes.SIGN_UP}>create an account</Link></p>
        </div>
      )
    }else{
      toSaveMessage =(
        <h4>Can we recommend "<span className="suggestedBeer" onClick={()=>this.noAccountMessage({name: this.state.suggestionBeer})}>{this.state.suggestionBeer}</span>"* instead?</h4>                
      )
      
    }
//display results of found beer or its availability in the LCBO
    if (this.state.randomBeer.name) {
      if(this.state.checkingAvailability){
        beerDisplayResult = (
          <Modal
          show={this.state.displayResults}
          modalClosed={this.closeResults}
          randomBeer={this.state.randomBeer}
        > 
        <BeerResult
        oneBeer={this.state.randomBeer}
        closeForm={this.closeResults}
        findSpecificBeer={this.getRandom}
        findLocation={this.findLocation}
        />
         </Modal>

        );
      }else if(this.state.suggestionBeer){
        beerDisplayResult=(
          <Modal
          show={this.state.displayResults}
          modalClosed={this.closeResults}
          randomBeer={this.state.randomBeer}> 
          <div>
            {/* <button className="closeButton" onClick={this.closeResults}>X</button>           */}
          <h3>Unfortunately the beer you are looking for is not available in the LCBO</h3>
          {toSaveMessage}
          </div>
          </Modal>)
      }else{
        beerDisplayResult=(
          <Modal
          show={this.state.displayResults}
          modalClosed={this.closeResults}
          randomBeer={this.state.randomBeer}
        > 
          <div>
            {/* <button className="closeButton" onClick={this.closeResults}>X</button>           */}
          <h3>"{this.state.randomBeer.name}" is available in the LCBO</h3>
          </div>
          </Modal>
          )
      }
    }

//Display Beer button
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
        {screenDisplay}

        {beerDisplayResult}
      </div>
    );
  }
}

export default withRouter(BeerSearch);
