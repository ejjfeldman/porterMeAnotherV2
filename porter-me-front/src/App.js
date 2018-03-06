import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import {Switch, Route} from 'react-router-dom';

// import BeerButton from './components/BeerButton/BeerButton';
// import Modal from './components/Modal/Modal';
import Header from './components/Header/Header';
import BeerForm from './components/BeerForm/BeerForm';
import BeerSearch from './BeerSearch/BeerSearch';


class App extends Component {
  // state={
  //   randomBeer: {},
  //   displayResults: false
  // }

//   getRandom=()=>{
//     axios.get('/randombeer')
//     .then(response=>{
//         let beerFetched = response.data;
//         console.log("random", beerFetched);
//         this.setState({randomBeer:beerFetched, displayResults: true})
//         console.log(this.state.randomBeer)
//     })
// }

// closeResults=()=>{
//   this.setState({displayResults: false, randomBeer: {}})
  
// }

  render() {
    // let beerDisplayResult = null;
    // if(this.state.randomBeer.name){
    //   let displayBeer = this.state.randomBeer
    //   beerDisplayResult = (
    //     <div>
    //       <h2>{displayBeer.name}</h2>
          
    //       <p>{displayBeer.description}</p>
    //       <p>{displayBeer.abv}</p>
    //     </div>
        
    //   )
    //   console.log(this.state.randomBeer)
    // }
    return (
      <div className="App">
      <Header/>
      {/* <Header/>

        <BeerButton
        getRandomBeer={this.getRandom}
        randomBeer={this.state.randomBeer}/>
          <BeerResultModal show={this.state.displayResults} modalClosed={this.closeResults} randomBeer={this.state.randomBeer}>
                   {beerDisplayResult}
          </BeerResultModal>
          <Link to='/refine-beer'>Refine</Link> */}
    
        <Switch>
          <Route path="/refine-beer" component={BeerForm}/>
           {/* <Route path="/orders" component={Orders}/> */}
          <Route path="/" exact component={BeerSearch}/> 
        </Switch>
      </div>
    );
  }
}

export default App;
