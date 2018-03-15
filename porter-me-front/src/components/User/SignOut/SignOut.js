import React, {Component} from 'react';
import './SignOut.css';

import {firebase, auth} from '../../../firebase/index';
// import firebase from 'firebase';
import {Link, withRouter} from 'react-router-dom';

import * as routes from '../../../Routes/routes';

// class signOutButton extends Component{

//     onClicked=()=>{
//         auth.signOut().then(function(){
//             console.log('signed out')
//         }).catch(function(error){
//             console.log(error)
//         })
//         // console.log("sdfsd")
//         // auth.doSignOut()
//         // this.forceUpdate()
//         // this.setState(this.state)
//         // this.props.history.push(routes.SIGN_IN)
//     }
//     render(){
//         return(
// <button type="button" className="signOutBtn" onClick={auth.doSignOut}>Sign Out</button> 
            
//         )
//     }
// // <button type="button" className="signOutBtn" onClick={auth.doSignOut}>Sign Out</button> 

// }

const signOutButton = () =>{

    return(
    
<button type="button" className="signOutBtn" onClick={auth.doSignOut}>Sign Out</button> 
    )
}


export default signOutButton;