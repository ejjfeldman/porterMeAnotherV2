import React from "react";
import "./SideNav.css";
import SideNavToggle from './SideNavToggle';
import {NavLink, Link} from 'react-router-dom';
import SignOutButton from '../../User/SignOut/SignOut';
import * as routes from "../../../Routes/routes";
import Backdrop from '../../Backdrop/Backdrop';

const sideNav = props => {
  return (
    <div >
      {props.authUser ? 
      <NavigationAuth open={props.open} closed={props.closed} /> : <NavigationNonAuth  open={props.open} closed={props.closed}/>}
    </div>
  );
}

  const NavigationAuth = (props) => {
    let attachedClasses = "SideDrawer Close";
    if (props.open) {
      attachedClasses = "SideDrawer Open";
    }

      return(
        <div>
        <Backdrop show={props.open} clicked={props.closed}/>
        {/* <Backdrop show={this.props.show} clicked={this.props.modalClosed}/> */}
          
        <div className={attachedClasses}>
          <ul>
            <li onClick={props.closed}>
              <NavLink to={routes.HOME} 
              className="sideNavItem"
              exact={true}>
                Home
              </NavLink>
            </li>
            <li onClick={props.closed}>
              <NavLink to={routes.ACCOUNT} 
              className="sideNavItem" 
              activeClassName="active" exact={true}>
                Account
              </NavLink>
            </li>
            <li onClick={props.closed} className="sideNavItem">Beer Facts</li>
            <li onClick={props.closed} className="sideNavItem">Beer Near You</li>
          </ul>
        </div>
        </div>
      )
  }
     

  const NavigationNonAuth = (props) => {
    let attachedClasses = "SideDrawer Close";
    if (props.open) {
      attachedClasses = "SideDrawer Open";
    }
      return(
      <div className={attachedClasses}>
      <ul>
        <li onClick={props.closed}>
          <Link to={routes.HOME}>
            Home
          </Link>
        </li>
        <li onClick={props.closed}>Beer Facts</li>
        <li onClick={props.closed}>Beer Near You</li>
        <li onClick={props.closed}>
          <Link to={routes.SIGN_IN} >
            Sign In
          </Link>
        </li>
      </ul>
      </div>)

  }
    

export default sideNav;
