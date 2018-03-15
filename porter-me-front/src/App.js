import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import {Switch, Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

// import BeerButton from './components/BeerButton/BeerButton';
// import Modal from './components/Modal/Modal';
import Header from './components/Header/Header';
import BeerForm from './components/BeerForm/BeerForm';
import BeerSearch from './BeerSearch/BeerSearch';
import NavBar from './components/NavBar/NavBar';
import CreateUserForm from './components/User/CreateUser/CreateUserForm';

import Landing from './components/Landing/Landing';
// import SignUp from './components/User/CreateUser/CreateUserForm';
import SignIn from './components/User/SignIn/SignIn';
import PasswordForget from './components/User/Password/PasswordForget';
import Account from './components/User/Account/Account';

import BeerButton from './components/BeerButton/BeerButton';

import * as routes from './Routes/routes';
import {firebase, auth} from './firebase/index';


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      authUser: null,
      uid: null,
      user:{
        email: null,
        name: null
      }
    };
  }

  //onAuthStateChanged gets a function as input which has access to the authenticated user object
  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser=>{
      
    //   authUser
    //   ? this.setState(()=>({ authUser, uid: authUser.uid}))
    //   : this.setState(()=>({authUser: null}));
    // });
    if(authUser){
      this.setState(()=>({ 
        authUser, 
        uid: authUser.uid, 
        user:{
          email: authUser.email,
          name: authUser.displayName
        }
        }))
    // this.getUserBeers(this.state.uid)
      
    }
    // const uid 
  })
}


render(){
  return(
    <Router>
      <div>
        <NavBar authUser={this.state.authUser}/>
        <Header/>

      <Route
        exact path={routes.SIGN_UP}
        component={() => <CreateUserForm />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignIn />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForget />}
      />

      {/* Switch back */}
      <Route
        exact path={routes.HOME}
        component={() => <BeerSearch authUser={this.state.authUser}/>}
      />
      {/* <Route
        exact path={routes.HOME}
        component={() => <BeerButton/>}
      />  */}
      <Route
        exact path={routes.ACCOUNT}
        component={() => <Account 
          authUser={this.state.authUser} 
          uid={this.state.uid}
          user={this.state.user}/>}
      />
      <Route
        exact path={routes.REFINE_BEER}
        component={() => <BeerForm />}
      />
      {/* Delete/switch back */}
      {/* <Route
        exact path={routes.RANDOM_BEER}
        component={() => <BeerSearch authUser={this.state.authUser} />}
      /> */}


      </div>
      
    </Router>
  )
}
}

export default App;
