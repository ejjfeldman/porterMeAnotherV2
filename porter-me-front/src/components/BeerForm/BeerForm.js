import React, { Component } from "react";
import axios from "axios";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import "./BeerForm.css";
// import Backdrop from '../Backdrop/Backdrop';
import Aux from '../Aux';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import * as routes from '../../Routes/routes';
import {withRouter} from 'react-router-dom';

class BeerForm extends Component {
  state = {
    displayForm: false,
    formValues: {
      Type: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "", displayValue: "Surprise me!" },
            { value: "ale", displayValue: "Ale" },
            { value: "lager", displayValue: "Lager" },
            { value: "pilsner", displayValue: "Pilsner" },
            { value: "stout", displayValue: "Stout" },
            { value: "ipa", displayValue: "Indian Pale Ale" },
            { value: "wheat", displayValue: "Wheat" },
            { value: "porter", displayValue: "Porter" },
            { value: "saison", displayValue: "Saison" },
            { value: "apa", displayValue: "American Pale Ale" },
            { value: "sour", displayValue: "Sour" }
          ]
        },
        value: ""
      },
      Abv: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "", displayValue: "Any ABV" },
            { value: "-4", displayValue: "Less than 4%" },
            { value: "4,6", displayValue: "Between 4% and 6%" },
            { value: "+6", displayValue: "More than 6%" }
          ]
        },
        value: ""
      },
      Ibu: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "", displayValue: "Any IBU" },
            { value: "-25", displayValue: "Less than 25 IBU" },
            { value: "25,70", displayValue: "Between 25 and 70 IBU" },
            { value: "71,120", displayValue: "Between 71 to 120 IBU" },
            { value: "121+", displayValue: "More than 120 IBU" }
          ]
        },
        value: ""
      }
    },
    loading: false,
    displayResults: false,
    oneBeer: "",
    groupedData: "",
    isAvailable: [],
    checkingAvailability: true,
    suggestionBeer: ''
  };

  orderHandler = event => {
    event.preventDefault();
      // this.setState({loading:true});
    const formData = {};
    for (let formElementIdentifier in this.state.formValues) {
      formData[formElementIdentifier] = this.state.formValues[
        formElementIdentifier
      ].value;
    }
    const dataGrouped = {
      beerData: formData
    };
    // this.setState({groupedData: dataGrouped})
    // console.log("dataGrouped", this.state.groupedData);
    axios
      .post("https://beer-data.firebaseio.com/beerSelection.json", dataGrouped)
      .then(response => {
        // this.setState({ loading: false });
        // this.props.history.push('/');
      })
      .catch(error => {
        // this.setState({ loading: false });
      });
    this.findSpecificBeer(dataGrouped.beerData);
  };

  findSpecificBeer(dataGrouped) {
    console.log(dataGrouped)
    this.setState({ 
      loading: true,
      groupedData: dataGrouped
     });    
    axios.post("/my-beer", { formResults: dataGrouped }).then(response => {
      console.log(response.data);
      let beerArray = response.data;
      let narrowedArray = beerArray.filter(beer => {
        if (!beer || !beer.style || !beer.style.category || !beer.style.name) {
          return false;
        } 
        return beer.style.name.toLowerCase().includes(dataGrouped.Type) || 
        beer.name.toLowerCase().includes(dataGrouped.Type) ||
        beer.style.category.name.toLowerCase().includes(dataGrouped.Type);
      });
      console.log(narrowedArray)
      console.log(dataGrouped.Type)
      let pageNumber = Math.floor(Math.random()*10);
    console.log("Rnadom", pageNumber)
      
    let oneBeer = narrowedArray[Math.floor(Math.random() * narrowedArray.length)];
      console.log(oneBeer);
    this.setState({
      oneBeer: oneBeer,
      displayResults: true,
      loading: false
    })
    console.log(this.state.oneBeer, "!")

    });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event, "event")
    console.log(inputIdentifier, "inputIdentifier")
    const updatedBeerForm = {
      ...this.state.formValues
    };
    const updatedFormElement = {
      ...updatedBeerForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedBeerForm[inputIdentifier] = updatedFormElement;
    this.setState({ formValues: updatedBeerForm });
    console.log(this.state.formValues);
  };

  //FIX THIS
  closeForm = () => {
    this.props.history.push(routes.HOME);
    // this.setState({displayResults: false, oneBeer: {}});
  };


  //need to reset to inital state
  clearForm = (event) => {
    document.getElementById("specificBeer").reset();
    event.preventDefault();

  }

  findLocation=(beer)=>{
    console.log(beer)
    axios.post("/findbeer", {locatebeer: beer})
    .then(response => {
      console.log(response.data);
      if(!response.data.pager){
        let resultBeer = response.data.charAt(0).toUpperCase()+response.data.slice(1)
        console.log(resultBeer)
         this.setState({
        suggestionBeer: resultBeer,
        checkingAvailability: false
          })
      }else{
        let resultBeer = response.data.result;
        let results = resultBeer.map(result=>{
          return result.name
        })
        console.log('found in lcbo')
        console.log(resultBeer[0])
        console.log(results)
        this.setState({
        isAvailable: results,
        checkingAvailability: false
          
            })
      }

    });
    
  }

//getting lcbo beers from the lcbo api
// findList=()=>{
//   axios.get('/lcbo-beers')
//   .then(response=>{
//     console.log(response);
//     let listData = response.data;
//     this.saveResults(listData)
//   })
  
// }

//posting lcbo beers to firebase
// saveResults=(listData)=>{
//  console.log("saved", listData)
//  axios
//  .post("https://beer-data.firebaseio.com/beerList.json",listData)
//  .then(response => {
//    // this.setState({ loading: false });
//    // this.props.history.push('/');
//  })
//  .catch(error => {
//    // this.setState({ loading: false });
//  });
// }

findFromList=()=>{

}

  render() {
    const formElementsArray = [];
    // let beerStyle = '';
    let form = null;
    for (let key in this.state.formValues) {
      formElementsArray.push({
        id: key,
        config: this.state.formValues[key]
      });
    }

    if(this.state.oneBeer){
      if(this.state.checkingAvailability){
        form= (
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeForm}>X</button>
          
            <div className="beerRefineResult">
                <h3>We found you the perfect beer!</h3>
                <h2>{this.state.oneBeer.name}</h2>
                <p><strong>ABV: </strong>{this.state.oneBeer.abv}%</p>
                <p><strong>IBU: </strong>{this.state.oneBeer.ibu}</p>
                <p>{this.state.oneBeer.description}</p>
                
                <button className="formButton" onClick={this.closeForm}>Start Over</button>
                <button className="formButton" onClick={()=>this.findSpecificBeer(this.state.groupedData)}>Get Another</button>
                <button className="formButton" onClick={()=>this.findLocation(this.state.oneBeer.name)}>Locate it</button>
                {/* <button onClick={()=>this.findList()}>Find Beers</button> */}
                <button onClick={()=>this.findFromList()}>Get List Beer</button>
                </div>
            </div>
            )
      }else if(this.state.suggestionBeer){
        form=(
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeForm}>X</button>          
          <h3>Unfortunately the beer you are looking for is not available in the LCBO</h3>
          <h4>Can we recommend "{this.state.suggestionBeer}" instead?</h4>
          </div>)
      }else{
        form=(
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeForm}>X</button>          
          <h3>"{this.state.oneBeer}" is available in the LCBO</h3>
          <h4>Can we recommend "{this.state.isAvailable}" as well?</h4>
          </div>)
        
        
        
      }
        
    }else if(this.state.loading){
      form=(
        <div>
          <h1 className="spinnerHeader">Waiting To Get Loaded</h1>
          <LoadingSpinner />
        </div>
      )
    }else{
        form = (
          <div className="refineForm">
            <form onSubmit={this.orderHandler} id="specificBeer">
            <button className="closeButton" onClick={this.closeForm}>X</button>
            <div className="formHeader">
            <h4>Find Your Perfect Beer</h4>
            <h5>Narrow your search</h5>
            </div>
              {formElementsArray.map(formElement => (
                <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  changed={event => this.inputChangedHandler(event, formElement.id)}
                />
              ))}
              <button className="formButton" onClick={this.closeForm}>Back</button>
              <button type="submit" className="formButton">Search</button>
              
            </form>
            </div>
          );
        
    }

    return (
        <Aux>
      


       {/* <Modal show={this.state.displayResults} 
       modalClosed={this.closeForm}
       oneBeer={this.state.oneBeer}> */}
       {form}
        
        {/* </Modal> */}


      </Aux>
    );
  }
}

export default withRouter(BeerForm);
