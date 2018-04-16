import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './components/Header/Header';
import BeerForm from './components/BeerForm/BeerForm';
import BeerSearch from './BeerSearch/BeerSearch';
import NavBar from './components/NavBar/NavBar';
import SideNav from './components/NavBar/SideNav/SideNav';
import CreateUserForm from './components/User/CreateUser/CreateUserForm';
import BeerFacts from './components/BeerFacts';
import BeerNearYou from './components/BeerNearYou';


import SignIn from './components/User/SignIn/SignIn';
import PasswordForget from './components/User/Password/PasswordForget';
import Account from './components/User/Account/Account';

import * as routes from './Routes/routes';
import {firebase} from './firebase/index';
import BeerResult from './components/BeerResult/BeerResult';


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      authUser: null,
      uid: null,
      email: null,
      user:{
        email: null,
        name: null
      },
      showSideDrawer: false
    };
  }
  sideDrawerClosedHandler=()=>{
    this.setState({showSideDrawer:false});
    console.log("clicked")
}

sideDrawerToggleHandler=()=>{
    this.setState((prevState)=>{
        return{showSideDrawer: !prevState.showSideDrawer};
    });
    console.log("clicked", this.state.showSideDrawer)
    
}

  //onAuthStateChanged gets a function as input which has access to the authenticated user object
  componentDidMount(){
    firebase.auth.onAuthStateChanged(authUser=>{
      
      authUser
      ? this.setState(()=>({ authUser, uid: authUser.uid, email: authUser.email}))
      : this.setState(()=>({authUser: null}));
      console.log(this.state.email)
    
    });
}


render(){
  return(
    <Router>
      <div>
        <NavBar authUser={this.state.authUser}
         drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideNav authUser={this.state.authUser}
        open={this.state.showSideDrawer}
        closed={this.sideDrawerClosedHandler}/>
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

      <Route
        exact path={routes.HOME}
        component={() => <BeerSearch authUser={this.state.authUser}
        />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <Account 
          authUser={this.state.authUser} 
          uid={this.state.uid}
          user={this.state.user}
          email={this.state.email}/>}
      />
      <Switch>
      <Route
        exact path={routes.REFINE_BEER}
        component={() => <BeerForm authUser={this.state.authUser} 
        uid={this.state.uid}/>}
      />

      <Route
      exact path={routes.RESULT}
      component={()=> <BeerResult/>}
          />
      </Switch>
      <Route
      exact path={routes.FACTS}
      component={()=> <BeerFacts/>}
      />
      <Route
      exact path={routes.LOCATING}
      component={()=> <BeerNearYou/>}
      />

      </div>
      
    </Router>
  )
}
}

export default App;
