import React from "react";
import { Link } from "react-router-dom";

import * as routes from '../../Routes/routes';
import SignOutButton from '../User/SignOut/SignOut';
import SideNavToggle from './SideNav/SideNavToggle';
import "./NavBar.css";


const navBar = (props) => (
  <div className="navigationBar">
      <SideNavToggle clicked={props.drawerToggleClicked}/>
          {props.authUser
          ? <NavigationAuth/>
          :<NavigationNonAuth/>
          }
      </div>
  )

    
    const NavigationAuth = () =>(
      <ul>
        <span className="desktopNav">
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
<li className="navItem">Beer Facts</li>
<li className="navItem">Beer Near You</li>
</span>
      <li>
        <SignOutButton/>
      </li>
    </ul>
    )

  const NavigationNonAuth = () =>
  <ul>
    <span className="desktopNav">
          <li>
        <Link to={routes.HOME} className="navItem">
          Home
        </Link>
      </li>
      <li className="navItem">Beer Facts</li>
<li className="navItem">Beer Near You</li>
  <li >
  <Link to={routes.SIGN_IN} className="navItem" >
    Sign In
  </Link>
</li>
</span>
  </ul>



export default navBar;
