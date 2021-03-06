import React from 'react';
import {Link} from 'react-router-dom';
import './NoUserMessage.css';
import * as routes from '../../Routes/routes';


const noUserMessage = (props) =>{
    const isLoggedIn = props.isLoggedIn;
    const isLoading = props.isLoading;
    
    if(isLoading){
        return null
    } else if (!isLoggedIn){
        console.log(isLoading);
        return  (
        <div >
        <h3 className="noUserMessage">To save your results, <Link to={routes.SIGN_IN}>please sign in</Link> or create an account</h3>
        </div>)
    } else {
        return ""
    }


}
   



export default noUserMessage;