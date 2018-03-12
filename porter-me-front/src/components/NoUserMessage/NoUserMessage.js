import React from 'react';
// import './LoadingSpinner.css';

const noUserMessage = (props) =>{
    const isLoggedIn = props.isLoggedIn;
    const isLoading = props.isLoading;
    
    if(isLoading){
        return null
    } else if (!isLoggedIn){
        console.log(isLoading);
        return  <div className="noUserMessage">
        <h3>To save your results, please sign in or create an account</h3>
        </div>
    } else {
        return ""
    }


}
   



export default noUserMessage;