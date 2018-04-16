import React, { Component } from 'react';
import cap from '../../cap.png';

import {Link} from 'react-router-dom';
import * as routes from '../../Routes/routes';

import './BeerButton.css';

class BeerButton extends Component {
  render() {
      let beerDisplay = (
        <header className="BeerButton-header">
          <div className="RandomBeerButton">
            <img src={cap} className="BeerButton-logo" alt="BeerButton" onClick={this.props.getRandomBeer}/>
          </div>
          <h2 className="btnTitle" onClick={this.props.getRandomBeer}>Beer Me</h2>
            <Link to={routes.REFINE_BEER} style={{ textDecoration: 'none' }}>
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

export default BeerButton;
