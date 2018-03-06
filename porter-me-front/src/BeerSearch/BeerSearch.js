import React, { Component } from "react";
import "./BeerSearch.css";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";

import BeerButton from "../components/BeerButton/BeerButton";
import Modal from "../components/Modal/Modal";
import Header from "../components/Header/Header";
import BeerForm from "../components/BeerForm/BeerForm";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

class BeerSearch extends Component {
  state = {
    randomBeer: "",
    displayResults: false,
    loading: false
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
    });
  };

  closeResults = () => {
    this.setState({ displayResults: false, randomBeer: {} });
  };

  render() {
    let beerDisplayResult = null;
    let displayBeer = null;
    let beerName = null;
    let beerAbv = null;
    let beerDescription = null;
    let beerIbu = null;

    if (this.state.randomBeer.name) {
      let displayBeer = this.state.randomBeer;
      if (displayBeer.name) {
        beerName = displayBeer.name;
      } else {
        beerName = "Mystery Beer";
      } 
      if (displayBeer.abv) {
        beerAbv = displayBeer.abv;
      } else {
        beerAbv = "Undefined";
      }
      if (displayBeer.description) {
        beerDescription = displayBeer.description;
      } else {
        beerDescription = "Let us know what you think of this beer! Unfortunately a description is not available at this time.";
      }
      if (displayBeer.ibu) {
        beerIbu = displayBeer.ibu;
      } else {
        beerIbu = "Undefined";
      }
      beerDisplayResult = (
        <div>
          <button className="closeButton" onClick={this.closeResults}>X</button> 
          <h2>{beerName}</h2>
          <p>
            <strong>Description: </strong>
            {beerDescription}
          </p>
          <p>
            <strong>ABV: </strong>
            {beerAbv}
          </p>
          <p>
            <strong>IBU: </strong>
            {beerIbu}
          </p>
        </div>
      );
      console.log(this.state.randomBeer);
    }

    let screenDisplay = (
      <BeerButton
        getRandomBeer={this.getRandom}
        randomBeer={this.state.randomBeer}
      />
    );
    // let refineButton = (
      // <Link to="/refine-beer">
      //   <button className="button">Refine</button>
      // </Link>
    // );
    if (this.state.loading) {
      screenDisplay = (
        <div>

          <h1>Getting Loaded</h1>
          <LoadingSpinner />
        </div>
      );
      // refineButton = null;
    }
    return (
      <div className="App">
        {screenDisplay}
        <Modal
          show={this.state.displayResults}
          modalClosed={this.closeResults}
          randomBeer={this.state.randomBeer}
        >
          {beerDisplayResult}
        </Modal>
      </div>
    );
  }
}

export default BeerSearch;
