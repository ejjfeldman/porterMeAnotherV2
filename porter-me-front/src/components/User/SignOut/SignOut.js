import React, {Component} from 'react';
import './SignOut.css';

import {auth} from '../../../firebase/firebase';
import {withRouter} from 'react-router-dom';

import * as routes from '../../../Routes/routes';

class signOutButton extends Component{

    doSignOut=()=>{
        auth.signOut();
        this.props.history.replace(routes.SIGN_IN)
    }
    render(){
        return(
<button type="button" className="signOutBtn" onClick={this.doSignOut}>SIGN OUT</button> 
            
        )
    }
}


// const signOutButton = () =>{

//     return(
    
// <button type="button" className="signOutBtn" onClick={auth.doSignOut}>Sign Out</button> 
//     )
// }


export default withRouter(signOutButton);
// export default signOutButton;
