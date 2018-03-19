import React, { Component } from "react";
import axios from "axios";
import Input from "../Input/Input";
import "./BeerForm.css";
import Aux from '../Aux';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import * as routes from '../../Routes/routes';
import {Link, withRouter} from 'react-router-dom';

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
            { value: "+121", displayValue: "More than 120 IBU" }
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
    suggestionBeer: '',
    tryingAgain: false,
    notAvailable: false,
    showMessage: false
  };

  orderHandler = event => {
    this.setState({loading: true})
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.formValues) {
      formData[formElementIdentifier] = this.state.formValues[
        formElementIdentifier
      ].value;
    }
    const dataGrouped = {
      beerData: formData
    };

    axios
      .post("https://beer-data.firebaseio.com/beerSelection.json", dataGrouped)
      .then(response => {
        console.log("success")
      })
      .catch(error => {
        console.log("error", error)
      });
    this.findSpecificBeer(dataGrouped.beerData);
  };

  findSpecificBeer(dataGrouped) {
    console.log(dataGrouped)
    this.setState({ 
      loading: true,
      oneBeer: '',
      groupedData: dataGrouped
     });    
    axios.post("/my-beer", { formResults: dataGrouped }).then(response => {
      console.log(response.data);
      let beerArray = response.data;
      if(beerArray===""){
        this.setState({
          notAvailable: true,
          loading: false,
          displayResults: false,
          oneBeer: ''
        })
        console.log("empty")
      }else{
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
        
        if(oneBeer === undefined){
          this.setState({
            loading: true,
            tryingAgain: true,
            displayResults: false,
            oneBeer: ''
          })
          this.findSpecificBeer(this.state.groupedData);
        }else{
          this.setState({
            oneBeer: oneBeer,
            displayResults: true,
            loading: false,
            tryingAgain: false
          })
          console.log(this.state.oneBeer, "!")
        }
      if(this.props.authUser){
        this.saveBeer(this.state.oneBeer)
      }
      }
    });
  }

  saveBeer=(beer)=>{
    console.log("beer", beer)
    const user = this.props.authUser;
    const uid = user.uid;
    console.log("user", uid)
    const beerName=beer.name;
    const beerSelected ={
      beerName: beer
    };
    console.log(beerSelected)
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
  };


  //need to reset to inital state
  clearForm = (event) => {
    document.getElementById("specificBeer").reset();
    event.preventDefault();

  }

  findLocation=(beer)=>{
    this.setState({loading: true});
    console.log(beer)
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
          showMessage: false,
              
                })
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
          showMessage: false,
        isAvailable: results,
        checkingAvailability: false,
        loading: false
        
          
            })
      }

    });
    
  }


// posting lcbo beers to firebase
saveResults=(listData)=>{
 console.log("saved", listData)
 axios
 .post("https://beer-data.firebaseio.com/beerList.json",listData)
 .then(response => {
   // this.setState({ loading: false });
   // this.props.history.push('/');
 })
 .catch(error => {
   // this.setState({ loading: false });
 });
}

findFromList=()=>{

}

closeResults = () => {
  this.setState({ displayForm: false, oneBeer: "", showMessage: false });
};

noAccountMessage=(beer)=>{
  this.setState({showMessage: true})
}

  render() {
    const formElementsArray = [];
    let displayBeer = null;
    let beerStyle = 'undefined';
    let beerAbv="undefined";
    let beerIbu="undefined";
    let form = null;
    let abvText=null;
    let ibuText=null;
    let toSaveMessage = null;
    
    if(this.props.authUser){
      if(this.state.showMessage){
        toSaveMessage = (
          <div><h4>Can we recommend "<span className="suggestedBeer">{this.state.suggestionBeer}</span>"* instead?</h4>
           <p className="messageToSave">*{this.state.suggestionBeer} has been <b>saved</b></p>
            </div>
          )
      }else{
        toSaveMessage = (
          <div><h4>Can we recommend "<span className="suggestedBeer" onClick={()=>this.saveBeer({name: this.state.suggestionBeer+"*"})}>{this.state.suggestionBeer}</span>"* instead?</h4>
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

    for (let key in this.state.formValues) {
      formElementsArray.push({
        id: key,
        config: this.state.formValues[key]
      });
    }


    if(this.state.oneBeer && !this.state.loading){
      if(this.state.checkingAvailability){
        displayBeer = this.state.oneBeer;
        if(displayBeer.style.name){
          beerStyle=displayBeer.style.name
        }
        if(displayBeer.abv){
          beerAbv=displayBeer.abv
        }
        if(displayBeer.ibu){
          beerIbu=displayBeer.ibu
        }
        form= (
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeForm}>X</button>
          
            <div className="beerRefineResult">
                <h3>We found you the perfect beer!</h3>
                <h2>{this.state.oneBeer.name}</h2>
                <p><strong>Style: </strong>{beerStyle}</p>
                
                <p><strong>ABV: </strong>{beerAbv}%</p>
                <p><strong>IBU: </strong>{beerIbu}</p>

                <p>{this.state.oneBeer.description}</p>
                
                <button className="formButton" onClick={this.closeForm}>Start Over</button>
                <button className="formButton" onClick={()=>this.findSpecificBeer(this.state.groupedData)}>Get Another</button>
                <button className="formButton" onClick={()=>this.findLocation(this.state.oneBeer.name)}>Locate it</button>
                {/* <button onClick={()=>this.findList()}>Find Beers</button> */}
                {/* <button onClick={()=>this.findFromList()}>Get List Beer</button> */}
                </div>
            </div>
            // </Modal>
            )
      }else if(this.state.suggestionBeer){
        form=(
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeForm}>X</button>          
          <h3>Unfortunately the beer you are looking for is not available in the LCBO</h3>
         
          {toSaveMessage}
          </div>)
      }else{

        form=(
          <div className="refineForm">
            <button className="closeButton" onClick={this.closeForm}>X</button>          
          <h3>"{this.state.oneBeer.name}" is available in the LCBO</h3>
          {/* <h4>Can we recommend "{this.state.isAvailable}" as well?</h4> */}
          </div>)
      }
        
    }else if(!this.state.loading && !this.state.oneBeer && !this.state.notAvailable){
      form = (
        <div className="refineForm">
          <form onSubmit={this.orderHandler} id="specificBeer">
          <button className="closeButton" onClick={this.closeForm} style={{marginTop: "-40px"}} >X</button>
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
    }else if(!this.state.loading && !this.state.oneBeer && this.state.notAvailable){
      let abvValue = this.state.formValues.Abv.value;
      let ibuValue = this.state.formValues.Ibu.value;

      if(abvValue[0]=='+'){
        abvText=abvValue.replace('+', 'greater than ')
      }else if(abvValue[0]=='-'){
        abvText=abvValue.replace('-', 'less than ')
      }else if (abvValue.search(',')!=-1){
        let abvPreText=abvValue.replace(',', ' and ')
        abvText="between " +abvPreText
      }

      if(ibuValue[0]=='+'){
        ibuText=ibuValue.replace('+', 'greater than ')
      }else if(ibuValue[0]=='-'){
        ibuText=ibuValue.replace('-', 'less than ')
      }else if (ibuValue.search(',')!=-1){
        let ibuPreText=ibuValue.replace(',', ' and ')
        ibuText="between " +ibuPreText
      }

      form=(
        <div className="refineForm">
        <button className="closeButton" onClick={this.closeForm}>X</button>
      
        <div className="beerRefineResult">
            <h3>We're sorry but we are unable to find any {this.state.formValues.Type.value} beer with an IBU {ibuText} and ABV {abvText}.</h3>
            <h4>Please try again!</h4>

            
            <button className="formButton" onClick={this.closeForm}>New Search</button>
          
          
            </div>
        </div>
      )
    }
    
    
    else{
      form=(
        <div>
          <h1 className="spinnerHeader">Waiting To Get Loaded</h1>
          <LoadingSpinner />
        </div>
      )
        
    }

    return (
        <Aux>

       {form}
        
      </Aux>
    );
  }
}

export default withRouter(BeerForm);
