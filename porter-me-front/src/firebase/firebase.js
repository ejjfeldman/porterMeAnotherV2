import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCRlW5VFnsJ5_Qf601mM1A1wEO9T7Ri3Po",
    authDomain: "beer-data.firebaseapp.com",
    databaseURL: "https://beer-data.firebaseio.com",
    projectId: "beer-data",
    storageBucket: "beer-data.appspot.com",
    messagingSenderId: "454303909896"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(config);
  }
 
const db = firebase.database();
const auth = firebase.auth();

export{
    db,
    auth,
};