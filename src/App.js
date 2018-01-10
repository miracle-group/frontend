import React, {Component} from 'react';
import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

class App extends Component {
  setupFirebase(){
    const config = {
      apiKey: "AIzaSyCrLu7tBIy6bqtYq4OWEpmHAfPFaWW0Z3c",
      authDomain: "final-project-miracle.firebaseapp.com",
      databaseURL: "https://final-project-miracle.firebaseio.com",
      projectId: "final-project-miracle",
      storageBucket: "final-project-miracle.appspot.com",
      messagingSenderId: "517907313039"
    };
    const uiConfig = {
      signInSuccessUrl: 'http://localhost:3000',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    };
    firebase.initializeApp(config);
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container',uiConfig);
  }
  checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
      }else{
      }
    });
  }
  componentWillMount(){
    this.setupFirebase();
    this.checkLogin();
  }
  render(){
    return(
      <div id="firebaseui-auth-container"></div>
    )
  }
}

export default App
