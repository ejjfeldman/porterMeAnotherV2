import React from "react";
import { NavLink, Link } from "react-router-dom";

import * as routes from '../../Routes/routes';
import SignOutButton from '../User/SignOut/SignOut';
import "./NavBar.css";

// const navBar = () => {
//   return (
//     <div className="navigationBar">
//       <div>
//         <NavLink to="/" className="navItem">
//           Home
//         </NavLink>
//       </div>
//       <div>
//         <NavLink to="/sign-in" className="navItem" >
//           Sign in
//         </NavLink>
//       </div>
//       <div className='navItem'>
//         <SignOutButton/>
//       </div>
//     </div>
//   );
// };

const navBar = ({authUser}) => (
<div className="navigationBar">
        {authUser
        ? <NavigationAuth/>
        :<NavigationNonAuth/>
        }
    </div>
)

    
    const NavigationAuth = () =>(
      <ul>
        {/* <li>
        <Link to={routes.LANDING} className="navItem">
          Landing
        </Link>
      </li> */}
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
        <SignOutButton/>
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
          {/* <li>
        <Link to={routes.LANDING} className="navItem">
         Landing
        </Link>
      </li> */}
  <li>
  <Link to={routes.SIGN_IN} className="navItem" >
    Sign In
  </Link>
</li>

  </ul>



export default navBar;
