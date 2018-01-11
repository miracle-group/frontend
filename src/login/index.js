import React, {Component} from 'react'
import * as firebase from 'firebase'
import firebaseui from 'firebaseui'

class Login extends Component {
  firebaseUI(){
    const uiConfig = {
      signInSuccessUrl: 'http://localhost:3000',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container',uiConfig)
  }
  checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
      }
    })
  }
  componentDidMount(){
    this.firebaseUI()
    this.checkLogin()
  }
  render(){
    return(
      <div className="login-container">
        <div className="login-header"></div>
        <div id="firebaseui-auth-container"></div>
      </div>
    )
  }
}

export default Login
