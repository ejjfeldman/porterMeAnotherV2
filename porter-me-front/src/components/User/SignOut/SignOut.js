import React, {Component} from 'react';
import './SignOut.css';

import {auth} from '../../../firebase/index';

const signOutButton = () =>{

    return(
    
<button type="button" className="signOutBtn" onClick={auth.doSignOut}>Sign Out</button> 
    )
}


export default signOutButton;
