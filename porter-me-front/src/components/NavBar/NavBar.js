import React from "react";
import { NavLink, Link } from "react-router-dom";

import * as routes from '../../Routes/routes';
import SignOutButton from '../User/SignOut/SignOut';
import "./NavBar.css";


const navBar = (props) => (
  <div className="navigationBar">
          {props.authUser
          ? <NavigationAuth/>
          :<NavigationNonAuth/>
          }
      </div>
  )

    
    const NavigationAuth = () =>(
      <ul>
      <li>
        <Link to={routes.HOME} className="navItem">
          Home
        </Link>
      </li>
      <li>
        <Link to={routes.ACCOUNT} className="navItem" >
          Account
        </Link>
      </li>

      <li>
      {/* <Link to={routes.SIGN_OUT} className="navItem"> */}
        
        <SignOutButton/>
        {/* </Link> */}
      </li>
    </ul>
    )

  const NavigationNonAuth = () =>
  <ul>
          <li>
        <Link to={routes.HOME} className="navItem">
          Home
        </Link>
      </li>
  <li>
  <Link to={routes.SIGN_IN} className="navItem" >
    Sign In
  </Link>
</li>

  </ul>



export default navBar;
