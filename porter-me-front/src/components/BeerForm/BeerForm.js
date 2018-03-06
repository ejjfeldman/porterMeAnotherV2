import React, { Component } from "react";
import axios from "axios";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import "./BeerForm.css";
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../Aux';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

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
    oneBeer: "",
    groupedData: ""
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
        this.setState({ loading: false });
        // this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
    this.findSpecificBeer(dataGrouped.beerData);
  };

  findSpecificBeer(dataGrouped) {
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
    this.setState({oneBeer: oneBeer})
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

  closeForm = () => {
    this.props.history.push("/");
  };


  //need to reset to inital state
  clearForm = (event) => {
    document.getElementById("specificBeer").reset();
    event.preventDefault();
   
    // const updatedBeerForm = {
    //   ...this.state.formValues
    // };
    // const updatedFormElements = {
    //   ...updatedBeerForm[Type],
    //   ...updatedBeerForm[Abv],
    //   ...updatedBeerForm[Ibu]
    // };
    // const updatedFormAbv = {
    //   ...updatedBeerForm[Abv]
    // };
    // const updatedFormIbu = {
    //   ...updatedBeerForm[Ibu]
    // };
    // updatedFormElements.value = "";


    
    // console.log(event, "event")
    // console.log(inputIdentifier, "inputIdentifier")
    // const updatedBeerForm = {
    //   ...this.state.formValues
    // };
    // const updatedFormElement = {
    //   ...updatedBeerForm[inputIdentifier]
    // };
    // updatedFormElement.value = event.target.value;
    // updatedBeerForm[inputIdentifier] = updatedFormElement;
    // this.setState({ formValues: updatedBeerForm });
    // console.log(this.state.formValues);
  }

  render() {
    const formElementsArray = [];
    let beerStyle = '';
    let form = null;
    for (let key in this.state.formValues) {
      formElementsArray.push({
        id: key,
        config: this.state.formValues[key]
      });
    }
    // if(this.state.oneBeer.style.name){
    //   beerStyle=this.state.oneBeer.style.name
    // }else if (this.state.oneBeer.category.name){
    //   beerStyle=this.state.oneBeer.category.name
    // } else {
    //   beerStyle="undefined"
    // }
    if(this.state.oneBeer){
        form= (
            <div className="beerRefineResult">
                <h3>We found you the perfect beer!</h3>
                <h2>{this.state.oneBeer.name}</h2>
                <p><strong>ABV: </strong>{this.state.oneBeer.abv}%</p>
                <p><strong>IBU: </strong>{this.state.oneBeer.ibu}</p>
                <p>{this.state.oneBeer.description}</p>
                
                <button className="formButton" onClick={this.closeForm}>Start Over</button>
                <button className="formButton">Same Story, Different Beer</button>
                
            </div>
            )
    }else{
        form = (
            
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
          );
        
    }

    return (
        <Aux>
        {/* <Backdrop show clicked={this.closeForm}/> */}
      <div className="refineForm">
       
        {/* <Modal show modalClosed={this.closeForm}> */}
        {form}
        {/* </Modal> */}
      </div>
      </Aux>
    );
  }
}

export default BeerForm;
