import React, {Component} from 'react';
import './BeerResult.css';
class BeerResult extends Component{

    render(){
        let displayBeer = null;
        let beerStyle = 'undefined';
        let beerAbv="undefined";
        let beerIbu="undefined";
        let beerName = "Mystery Beer - unnamed";
        let beerDescription = "Let us know what you think of this beer! Unfortunately a description is not available at this time.";
    

        displayBeer = this.props.oneBeer;
        if (displayBeer.name) {
            beerName = displayBeer.name;
          }
        if(displayBeer.style){
          beerStyle=displayBeer.style.name
        }
        if (displayBeer.description) {
            beerDescription = displayBeer.description;
          }
        if(displayBeer.abv){
          beerAbv=displayBeer.abv
        }
        if(displayBeer.ibu){
          beerIbu=displayBeer.ibu
        }
        return(
            <div className="beerResult">
            {/* <button className="closeButton" onClick={this.props.closeForm}>X</button> */}
            <div className="beerRefineResult">
                <h3>We found you the perfect beer!</h3>
                <h2>{beerName}</h2>
                <p><strong>Style: </strong>{beerStyle}</p>
                <p><strong>ABV: </strong>{beerAbv}%</p>
                <p><strong>IBU: </strong>{beerIbu}</p>
                <p>{beerDescription}</p>
                <button className="formButton" onClick={this.props.closeForm}>Start Over</button>
                <button className="formButton" onClick={()=>this.props.findSpecificBeer(this.props.groupedData)}>Get Another</button>
                <button className="formButton" onClick={()=>this.props.findLocation(this.props.oneBeer.name)}>Locate it</button>
            
                {/* <p>To save your beer, create an account or sign in</p> */}
                </div>
            </div>
        )
    }
}

export default BeerResult;