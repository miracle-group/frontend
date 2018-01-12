import React, {Component} from 'react'
import * as firebase from 'firebase'
import firebaseui from 'firebaseui'
import { graphql } from "react-apollo"
import gql from 'graphql-tag'


class Login extends Component {
  firebaseUI(){
    const uiConfig = {
      signInSuccessUrl: 'http://localhost:3000/preference',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container',uiConfig)
  }
  checkLogin () {
    firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        console.log('====================================')
        console.log(user)
        console.log('====================================')
        let objUser = {
          name: user.displayName,
          email: user.email,
          validation: user.uid
        }
        const { mutate } = this.props
        const wait = await mutate({ variables: objUser })
        .then(() => {
          console.log('====================================')
          console.log('MASUK')
          console.log('====================================')
        })
        .catch( err => {
          console.log('====================================')
          console.log('WHY ERROR', err)
          console.log('====================================')
        })
    
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
const checkLogin = gql`
  mutation 
    login (
      $name: String!,
      $email: String!,
      $validation: String!
    ){
    checkLogin (
      movieParam: { 
        name: $name,
        email: $email,
        validation: $validation
      }
    ){
      _id
      name
      email
      validation
    }
  }
`
export default graphql(checkLogin)(Login)
