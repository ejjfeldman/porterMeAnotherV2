import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {SignUpLink}  from '../CreateUser/CreateUserForm';
import {auth} from '../../../firebase/index';

import './SignIn.css';

import * as routes from '../../../Routes/routes';

const SignInPage = ({history}) =>
<div className="signInForm">
    {/* <h1>SignIn</h1> */}
    <SignInForm history={history}/>
    <SignUpLink/>
</div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component{
    constructor(props){
        super(props);

        this.state={...INITIAL_STATE};
    }
onSubmit = (event)=>{
    const{
        email, password,
    } = this.state;
    const{
        history,
    }= this.props;

    auth.doSignInWithEmailAndPassword(email, password)
    .then(()=>{
        this.setState(()=>({...INITIAL_STATE}));
        history.push(routes.HOME);
    })
    .catch(error=>{
        this.setState(byPropKey('error', error));
    });
    event.preventDefault();
}

render(){
    const{
        email, password, error,
    } = this.state;

    const isInvalid = password === '' || email === '';

return(
    <form  onSubmit={this.onSubmit}>
    <h2>Sign In</h2>
    <div className="formInput">
    <input
        className="inputElement"
        value={email}
        onChange={event=> this.setState(byPropKey('email', event.target.value))}
        type="text"
        placeholder="Email Address"
    />
    </div>
    <div className="formInput">
    <input
        className="inputElement"
        value={password}
        onChange={event=> this.setState(byPropKey('password', event.target.value))}
        type="password"
        placeholder="Password"
    />
    </div>
    <button className="formButton" disabled={isInvalid} type="submit">Sign In</button>
    
    </form>
)
}

}

export default withRouter(SignInPage);

export{SignInForm};