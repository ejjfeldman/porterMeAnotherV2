import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import SignUpForm from './SignUpForm';
import {auth} from '../../../firebase';

const SignUpPage = ({history})=>
<div>
    <h1>SignUp</h1>
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
    
    // history.push('/');
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
    this.setState(()=> ({...INITIAL_STATE}));
    this.props.history.push("/");
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
           <form onSubmit={this.onSubmit}>
            <input
             value={username}
             onChange={event => this.setState(byPropKey('username', event.target.value))}
             type="text"
             placeholder="Full Name"
             />
             <input
             value={email}
             onChange={event => this.setState(byPropKey('email', event.target.value))}
             type="text"
             placeholder="Email"
             />
             <input
             value={passwordOne}
             onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
             type="password"
             placeholder="Password"
             />
             <input
             value={passwordTwo}
             onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
             type="password"
             placeholder="Confirm Password"
             />
             <button disabled={isInvalid} type="submit">Sign Up</button>

             {/* provided by firebase */}
             {error && <p>{error.message}</p>}
           </form>
        );
    }
    
}

const SignUpLink = () =>
<p>Don't have an account?
<Link to={'/sign-up'}>Sign Up</Link>
</p>

export default withRouter(SignUpPage);

export {
    CreateUserForm,
    SignUpLink
};