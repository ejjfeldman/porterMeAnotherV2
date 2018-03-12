import React from 'react';
import './SignOut.css';

import {auth} from '../../../firebase/index';

const signOutButton = () =>
<button type="button" className="signOutBtn" onClick={auth.doSignOut}>Sign Out</button>

export default signOutButton;