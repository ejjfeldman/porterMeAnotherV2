import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {auth} from '../../../firebase/index';
import './CreateUserForm.css';

import * as routes from '../../../Routes/routes';

const SignUpPage = ({history})=>
<div>
    {/* <h1>SignUp</h1> */}
    <CreateUserForm history={history}/>

</div>

//user information
const INITIAL_STATE={
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}



const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class CreateUserForm extends Component {
    constructor(){
        super();
        this.state={
            ...INITIAL_STATE
        };
    }

onSubmit = (event)=> {
const{
    username,
    email,
    passwordOne,
}=this.state;

const {
    history,
}=this.props;

auth.doCreateUserWithEmailAndPassword(email, passwordOne)
.then(authUser => {
    //Create a user in accessible firebase database
    // db.doCreateUser(authUser.uid, username, email)
    //     .then(()=>{
    //         this.setState(()=>({...INITIAL_STATE}));
    //         history.push(routes.HOME)
    //     })
    //     .catch(error=>{
    //         this.setState(byPropKey('error', error));
    //     });
    this.setState(()=> ({...INITIAL_STATE}));
    // var user = firebase.auth().currentUser;
    // console.log(user);
    history.push({
        pathname: routes.HOME});
})
.catch(error=>{
    this.setState(byPropKey('error', error));
});
event.preventDefault();
}
    render(){
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
// makes the submit button invalid if form is not filled properly
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === '' ||
            username === '';

        return(
           <form onSubmit={this.onSubmit} className="createUserForm">
           <h2>Create New User</h2>
            <div className="formInput">

            <input
             value={username}
             className="inputElement"
             onChange={event => this.setState(byPropKey('username', event.target.value))}
             type="text"
             placeholder="Full Name"
             />
             </div>
             <div className="formInput">

             <input
             value={email}
             className="inputElement"
             onChange={event => this.setState(byPropKey('email', event.target.value))}
             type="text"
             placeholder="Email"
             />
             </div>
             <div className="formInput">

             <input
             value={passwordOne}
             className="inputElement"
             onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
             type="password"
             placeholder="Password"
             />
             </div>
             <div className="formInput">
          
             <input
             value={passwordTwo}
             className="inputElement"
             onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
             type="password"
             placeholder="Confirm Password"
             />
             </div>
             <button disabled={isInvalid} className="formButton" type="submit">Sign Up</button>

             {/* provided by firebase */}
             {error && <p>{error.message}</p>}
           </form>
        );
    }
    
}

const SignUpLink = () =>
<p>Don't have an account?
    {' '}
<Link to={routes.SIGN_UP}>Sign Up</Link>
</p>

export default withRouter(SignUpPage);

export {
    CreateUserForm,
    SignUpLink
};