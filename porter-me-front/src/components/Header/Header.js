import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';


const header = () => {
    return(
<div className="mainHeader">     
  {/* <div id="pour"></div> */}
  <div id="beaker">
    <div className="beer-foam">
      <div className="foam-1"></div>
      <div className="foam-2"></div>
      <div className="foam-3"></div>
      <div className="foam-4"></div>
      <div className="foam-5"></div>
      <div className="foam-6"></div>
      <div className="foam-7"></div>
      <div className="foam-8"></div>
      <div className="foam-9"></div>
      <div className="foam-10"></div>
      <div className="foam-11"></div>
      <div className="foam-12"></div>
      <div className="foam-13"></div>
      <div className="foam-14"></div>
      <div className="foam-15"></div>
      <div className="foam-16"></div>
      <div className="foam-17"></div>
      <div className="foam-18"></div>
      <div className="foam-19"></div>
      <div className="foam-20"></div>
      <div className="foam-21"></div>
      <div className="foam-22"></div>
      <div className="foam-23"></div>
      <div className="foam-24"></div>
      <div className="foam-25"></div>
      <div className="foam-26"></div>
      <div className="foam-27"></div>
      <div className="foam-28"></div>
      <div className="foam-29"></div>
      <div className="foam-30"></div>
      <div className="foam-31"></div>
      <div className="foam-32"></div>
      <div className="foam-33"></div>
      <div className="foam-34"></div>
    </div>
    
    <div id="liquid">
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>
      <div className="bubble bubble6"></div>
      <div className="bubble bubble7"></div>
      <div className="bubble bubble8"></div>
      <div className="bubble bubble9"></div>
      <div className="bubble bubble10"></div>
      <div className="bubble bubble11"></div>
      <div className="bubble bubble12"></div>
      <div className="bubble bubble13"></div>
      <div className="bubble bubble14"></div>
      <div className="bubble bubble15"></div>
      <div className="bubble bubble16"></div>
      <div className="bubble bubble17"></div>
      <div className="bubble bubble18"></div>
      <div className="bubble bubble19"></div>
      <div className="bubble bubble20"></div>
      <div className="bubble bubble21"></div>
      <div className="bubble bubble22"></div>
    </div>
    <Link to="/"><div className="App-header jumbotron" id="header">
          <h1 className="appTitle">PORTER ME ANOTHER</h1>
          <p className="appTagline">Don't Wine, Have a Beer</p>
        </div>
    </Link>
    </div>
    </div>
    );
}

export default header;