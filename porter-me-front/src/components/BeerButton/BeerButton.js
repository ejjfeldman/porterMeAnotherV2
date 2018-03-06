import React, { Component } from 'react';
// import axios from 'axios';
import cap from '../../cap.png';

import {Link} from 'react-router-dom';
import './BeerButton.css';

class Customers extends Component {

  render() {
      let beerDisplay = (
        <header className="BeerButton-header">
        <img src={cap} className="BeerButton-logo" alt="BeerButton" onClick={this.props.getRandomBeer}/>
        <Link to="/refine-beer">
        <button className="button">Refine</button>
        </Link>
      </header>
      )
      if(this.props.randomBeer.name){
          beerDisplay = null
      }
    return (
      <div className="BeerButton">
        
<div>{beerDisplay}</div>

      </div>
    );
  }
}

export default Customers;
